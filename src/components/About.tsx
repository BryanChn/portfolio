import { ArrowUpRight, Download, GraduationCap, MapPin } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'
import { education, experiences, highlight, interests, intro } from '../data/about'
import CopyEmail from './CopyEmail'

function About() {
  return (
    <section id="about" className="px-4 py-8 sm:px-6 md:py-10">
      <h2 className="mb-6 text-2xl font-bold">À propos</h2>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <article className="flex flex-col rounded-lg bg-elevated p-6">
          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <p className="flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" />
              Mulhouse · Mobilité Colmar / Strasbourg
            </p>
            <CopyEmail />
          </div>
          <p className="mb-5 border-l-4 border-accent pl-4 text-xl font-bold sm:text-2xl">
            {highlight}
          </p>
          <div className="mb-8 flex flex-col gap-4 text-base leading-relaxed sm:text-lg">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            <a
              href="https://github.com/BryanChn"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center justify-center gap-2 rounded-full border border-white bg-white px-4 py-3 font-bold whitespace-nowrap text-black transition-transform hover:scale-105 sm:gap-3 sm:px-6"
            >
              <SiGithub size={22} aria-hidden="true" />
              GitHub
              <ArrowUpRight
                size={20}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/bryan-chaine"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-3 font-bold whitespace-nowrap transition hover:scale-105 hover:border-white sm:gap-3 sm:px-6"
            >
              <FaLinkedin size={22} aria-hidden="true" />
              LinkedIn
              <ArrowUpRight
                size={20}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="/Chaine_Bryan_CV.pdf"
              download
              aria-label="Télécharger mon CV (PDF)"
              title="Télécharger mon CV (PDF)"
              className="group flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-3 font-bold whitespace-nowrap transition hover:scale-105 hover:border-white sm:gap-3 sm:px-6"
            >
              <Download size={20} className="transition-transform group-hover:translate-y-0.5" />
              Mon CV
            </a>
          </div>
        </article>

        <div className="flex flex-col gap-4">
          <article className="rounded-lg bg-elevated p-6">
            <h3 className="mb-3 flex items-center gap-2 font-bold">
              <GraduationCap size={20} className="text-accent-light" />
              Formation
            </h3>
            <p className="font-medium">{education.degree}</p>
            <p className="text-sm text-muted">
              {education.school} · {education.period}
            </p>
          </article>

          <article className="rounded-lg bg-elevated p-6">
            <h3 className="mb-3 font-bold">Centres d'intérêt</h3>
            <ul className="flex flex-wrap gap-2">
              {interests.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full bg-highlight px-3 py-1 text-sm"
                >
                  <Icon size={14} className="text-accent-light" />
                  {label}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      <h3 className="mt-10 mb-4 text-xl font-bold">Parcours</h3>
      <ol className="border-l-2 border-highlight">
        {experiences.map((exp) => (
          <li key={exp.company} className="relative mb-8 pl-6 last:mb-0">
            <span className="absolute top-1.5 -left-1.75 size-3 rounded-full bg-accent" />
            <p className="font-bold">
              {exp.role} <span className="text-accent-light">· {exp.company}</span>
            </p>
            <p className="mb-2 text-sm text-muted">{exp.period}</p>
            {exp.description && <p className="max-w-2xl text-muted">{exp.description}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default About
