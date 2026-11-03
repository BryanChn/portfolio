import { Check, Copy, Mail } from 'lucide-react'
import { useEffect, useState, useSyncExternalStore } from 'react'

const EMAIL_PARTS = ['bryanchaine', 'gmail.com']
const noopSubscribe = () => () => {}

function CopyEmail() {
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )
  const email = isClient ? EMAIL_PARTS.join('@') : ''
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <span className="flex h-5 items-center">
      {email && (
        <button
          type="button"
          onClick={handleCopy}
          title="Copier l'adresse email"
          className="group -my-1.5 flex items-center gap-2 py-1.5 transition-colors hover:text-white"
        >
          <Mail size={16} aria-hidden="true" />
          {email}
          {copied ? (
            <Check size={14} aria-hidden="true" className="text-accent-light" />
          ) : (
            <Copy
              size={14}
              aria-hidden="true"
              className="opacity-60 transition-opacity group-hover:opacity-100"
            />
          )}
          <span aria-live="polite" className={copied ? 'text-accent-light' : 'sr-only'}>
            {copied ? 'Copié !' : ''}
          </span>
        </button>
      )}
    </span>
  )
}

export default CopyEmail
