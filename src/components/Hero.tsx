import { Download, Mail } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'
import photo from '../assets/photo-bryan-chaine.webp'
import { profile } from '../data/profile'

const socialLinks = [
  { href: profile.github, label: 'GitHub (nouvel onglet)', Icon: SiGithub },
  { href: profile.linkedin, label: 'LinkedIn (nouvel onglet)', Icon: FaLinkedin },
]

function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center gap-6 bg-linear-to-b from-accent/70 to-surface px-4 pt-10 pb-8 text-center sm:px-6 md:flex-row md:items-end md:pt-20 md:text-left"
    >
      <div className="size-36 shrink-0 overflow-hidden rounded-full bg-linear-to-br from-accent-light to-accent shadow-2xl shadow-black/50 motion-safe:animate-fade-up sm:size-44 lg:size-52">
        <img
          src={photo}
          alt="Portrait de Bryan Chaine"
          fetchPriority="high"
          width={416}
          height={416}
          className="size-full object-cover object-top"
        />
      </div>

      <div className="min-w-0 [animation-delay:120ms] motion-safe:animate-fade-up">
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-8xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-lg font-bold text-white sm:text-xl">{profile.title}</p>
        <p className="mt-1 text-base text-white/80 sm:text-lg">{profile.subtitle}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-black transition-transform hover:scale-105 hover:bg-accent-light"
          >
            <Mail size={18} aria-hidden="true" />
            Me contacter
          </a>
          <a
            href={profile.cv}
            download
            className="group flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-bold transition hover:scale-105 hover:border-white"
          >
            <Download
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-y-0.5"
            />
            Télécharger mon CV
          </a>
          <div className="flex gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="grid size-12 place-items-center rounded-full border border-white/30 transition hover:scale-105 hover:border-white"
              >
                <Icon size={22} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
