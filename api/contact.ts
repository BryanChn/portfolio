import { Resolver } from 'node:dns/promises'
import { Resend } from 'resend'
import { HONEYPOT_FIELD, MAX_BODY_SIZE, validate, type FormValues } from '../src/lib/contact.js'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 3
const submissions = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (submissions.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS)

  if (submissions.size > 1000) {
    for (const [key, times] of submissions) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) submissions.delete(key)
    }
  }

  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, recent)
    return true
  }

  submissions.set(ip, [...recent, now])
  return false
}

function clientIp(request: Request): string {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  )
}

const resolver = new Resolver({ timeout: 2000, tries: 1 })

async function hasMailServer(email: string): Promise<boolean> {
  const domain = email.slice(email.lastIndexOf('@') + 1).toLowerCase()
  try {
    const records = await resolver.resolveMx(domain)
    return records.some((record) => record.exchange !== '' && record.exchange !== '.')
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    return code !== 'ENOTFOUND' && code !== 'ENODATA'
  }
}

async function isHuman(token: string, ip: string, secret: string): Promise<boolean> {
  if (!token) return false

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  })
  if (!response.ok) return false

  const result = (await response.json()) as { success?: boolean }
  return result.success === true
}

export async function POST(request: Request): Promise<Response> {
  const raw = await request.text()
  if (raw.length > MAX_BODY_SIZE) {
    return Response.json({ error: 'Requête trop volumineuse.' }, { status: 413 })
  }

  let body: Record<string, unknown>
  try {
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) throw new Error()
    body = parsed as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  if (String(body[HONEYPOT_FIELD] ?? '') !== '') {
    return Response.json({ ok: true })
  }

  const ip = clientIp(request)
  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Trop de messages envoyés. Réessayez dans quelques minutes.' },
      { status: 429, headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) } },
    )
  }

  const values: FormValues = {
    name: String(body.name ?? ''),
    email: String(body.email ?? ''),
    message: String(body.message ?? ''),
  }

  const errors = validate(values)
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 })
  }

  if (!(await hasMailServer(values.email.trim()))) {
    return Response.json(
      { errors: { email: "Ce domaine ne reçoit pas d'emails. Vérifiez votre adresse." } },
      { status: 400 },
    )
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (turnstileSecret) {
    const human = await isHuman(String(body.turnstileToken ?? ''), ip, turnstileSecret)
    if (!human) {
      return Response.json(
        { error: 'La vérification anti-spam a échoué. Réessayez.' },
        { status: 403 },
      )
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) {
    console.error('RESEND_API_KEY ou CONTACT_TO_EMAIL manquant')
    return Response.json({ error: 'Configuration serveur manquante.' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to,
    replyTo: values.email.trim(),
    subject: `Portfolio : nouveau message de ${values.name.trim()}`,
    text: `Nom : ${values.name.trim()}\nEmail : ${values.email.trim()}\n\n${values.message.trim()}`,
  })

  if (error) {
    console.error('Resend:', error)
    return Response.json({ error: "L'envoi a échoué." }, { status: 502 })
  }

  return Response.json({ ok: true })
}
