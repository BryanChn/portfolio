import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  Loader2,
  Mail,
  Send,
  TriangleAlert,
} from 'lucide-react'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'
import { profile } from '../data/profile'
import {
  EMAIL_MAX_LENGTH,
  HONEYPOT_FIELD,
  NAME_MAX_LENGTH,
  validate,
  type FormErrors,
  type FormValues,
} from '../lib/contact'

type Status = 'idle' | 'loading' | 'success' | 'error'

const emptyForm: FormValues = { name: '', email: '', message: '' }
const DEFAULT_ERROR = "L'envoi a échoué, veuillez réessayer dans un instant."
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined

function Contact() {
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState(DEFAULT_ERROR)
  const [token, setToken] = useState('')
  const turnstileRef = useRef<TurnstileInstance>(undefined)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const waitingForCaptcha = Boolean(TURNSTILE_SITE_KEY) && token === ''

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = validate(values)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          [HONEYPOT_FIELD]: honeypotRef.current?.value ?? '',
          turnstileToken: token,
        }),
      })

      if (!response.ok) {
        const data: { errors?: FormErrors; error?: string } = await response
          .json()
          .catch(() => ({}))
        if (data.errors) {
          setErrors(data.errors)
          setStatus('idle')
          return
        }
        setServerError(data.error ?? DEFAULT_ERROR)
        setStatus('error')
        return
      }

      setStatus('success')
      setValues(emptyForm)
    } catch {
      setServerError(DEFAULT_ERROR)
      setStatus('error')
    } finally {
      setToken('')
      turnstileRef.current?.reset()
    }
  }

  const inputClass =
    'w-full rounded-md bg-highlight px-4 py-3 text-white placeholder:text-muted outline-none ring-accent transition focus:ring-2'

  return (
    <section id="contact" className="px-4 py-8 sm:px-6 md:py-10">
      <h2 className="mb-2 text-2xl font-bold">Contact</h2>
      <p className="mb-6 text-muted">Un poste, un projet, une question ? Écrivez-moi.</p>

      <div className="mb-8 flex max-w-xl flex-col gap-4">
        <p className="flex w-fit items-center gap-2 rounded-full bg-highlight px-4 py-1.5 text-sm font-bold">
          <span className="size-2 rounded-full bg-green-400" aria-hidden="true" />
          {profile.status}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="flex w-fit items-center gap-2 text-lg font-bold break-all hover:text-accent-light"
        >
          <Mail size={20} aria-hidden="true" className="shrink-0" />
          {profile.email}
        </a>
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-center gap-2 rounded-full border border-white bg-white px-4 py-3 font-bold whitespace-nowrap text-black transition-transform hover:scale-105 sm:gap-3 sm:px-6"
          >
            <SiGithub size={22} aria-hidden="true" />
            GitHub
            <ArrowUpRight
              size={20}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-3 font-bold whitespace-nowrap transition hover:scale-105 hover:border-white sm:gap-3 sm:px-6"
          >
            <FaLinkedin size={22} aria-hidden="true" />
            LinkedIn
            <ArrowUpRight
              size={20}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href={profile.cv}
            download
            aria-label="Télécharger mon CV (PDF)"
            className="group flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-3 font-bold whitespace-nowrap transition hover:scale-105 hover:border-white sm:gap-3 sm:px-6"
          >
            <Download
              size={20}
              aria-hidden="true"
              className="transition-transform group-hover:translate-y-0.5"
            />
            Mon CV
          </a>
        </div>
      </div>

      {status === 'success' ? (
        <div className="flex max-w-xl items-center gap-3 rounded-lg bg-elevated p-6">
          <CheckCircle2 className="shrink-0 text-accent-light" size={28} />
          <div>
            <p className="font-bold">Message envoyé !</p>
            <p className="text-sm text-muted">Je vous réponds au plus vite.</p>
          </div>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="ml-auto text-sm text-muted underline hover:text-white"
          >
            Nouveau message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex max-w-xl flex-col gap-4">
          <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
            <label htmlFor={HONEYPOT_FIELD}>Ne pas remplir ce champ</label>
            <input
              ref={honeypotRef}
              id={HONEYPOT_FIELD}
              name={HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Nom
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              maxLength={NAME_MAX_LENGTH}
              value={values.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className={inputClass}
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={EMAIL_MAX_LENGTH}
              value={values.email}
              onChange={handleChange}
              placeholder="vous@exemple.com"
              className={inputClass}
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={handleChange}
              placeholder="Votre message…"
              className={`${inputClass} resize-y`}
            />
            {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
          </div>

          {status === 'error' && (
            <p className="flex items-center gap-2 text-sm text-red-400">
              <TriangleAlert size={16} /> {serverError}
            </p>
          )}

          {TURNSTILE_SITE_KEY && (
            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={setToken}
              onExpire={() => setToken('')}
              onError={() => setToken('')}
              options={{ theme: 'dark', language: 'fr', appearance: 'interaction-only' }}
            />
          )}

          <button
            type="submit"
            disabled={status === 'loading' || waitingForCaptcha}
            className="flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-black transition hover:scale-105 hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === 'loading' ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {status === 'loading' ? 'Envoi…' : waitingForCaptcha ? 'Vérification…' : 'Envoyer'}
          </button>
        </form>
      )}
    </section>
  )
}

export default Contact
