import { ArrowUpRight, Check, Lock, Play } from 'lucide-react'
import { useState } from 'react'
import { SiGithub } from 'react-icons/si'
import {
  agencyModules,
  agencySection,
  featuredProject,
  trainingProjects,
  trainingSection,
  type TrainingProject,
} from '../data/projects'
import AlbumCover from './AlbumCover'
import TrainingProjectModal from './TrainingProjectModal'

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-highlight px-3 py-1 text-sm">
          {item}
        </li>
      ))}
    </ul>
  )
}

function FeaturedProjectCard() {
  const project = featuredProject

  return (
    <article className="overflow-hidden rounded-lg bg-elevated">
      <header className={`bg-linear-to-br p-6 ${project.cover}`}>
        <p className="w-fit rounded-full bg-black/30 px-3 py-1 text-sm font-bold">
          {project.status}
        </p>
        <h3 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{project.title}</h3>
        <p className="mt-2 max-w-2xl text-lg font-medium text-white/90">{project.pitch}</p>
      </header>

      <div className="grid gap-6 p-6 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-5">
          <TechList items={project.stack} />
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2 text-muted">
                <Check size={18} aria-hidden="true" className="shrink-0 text-accent-light" />
                {highlight}
              </li>
            ))}
          </ul>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit items-center gap-2 rounded-full border border-white bg-white px-5 py-2.5 font-bold text-black transition-transform hover:scale-105"
          >
            <SiGithub size={20} aria-hidden="true" />
            Voir le code
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <img
            src={project.logo.src}
            alt={project.logo.alt}
            loading="lazy"
            width={900}
            height={570}
            className="w-full rounded-xl"
          />
          <ul className="grid grid-cols-2 gap-3">
            {project.screenshots.map((shot) => (
              <li
                key={shot.src}
                className="overflow-hidden rounded-xl border border-white/10 bg-highlight"
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  width={540}
                  height={993}
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function AgencyModules() {
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">{agencySection.title}</h3>
      <ul className="grid gap-4 lg:grid-cols-2">
        {agencyModules.map((module) => (
          <li key={module.title} className="flex flex-col gap-4 rounded-lg bg-elevated p-6">
            <h4 className="text-lg font-bold">{module.title}</h4>
            <dl className="flex flex-col gap-4">
              <div>
                <dt className="mb-1 text-sm font-bold text-accent-light">Besoin du client</dt>
                <dd className="text-muted">{module.need}</dd>
              </div>
              <div>
                <dt className="mb-1 text-sm font-bold text-accent-light">Ce que j’ai réalisé</dt>
                <dd>
                  <ul className="flex list-disc flex-col gap-1 pl-5 text-muted marker:text-accent">
                    {module.done.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="mb-2 text-sm font-bold text-accent-light">Stack</dt>
                <dd>
                  <TechList items={module.stack} />
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-center gap-2 text-sm text-muted">
        <Lock size={14} aria-hidden="true" />
        {agencySection.notice}
      </p>
    </div>
  )
}

function TrainingProjects() {
  const [selected, setSelected] = useState<TrainingProject | null>(null)

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <img
          src={trainingSection.logo.src}
          alt={trainingSection.logo.alt}
          width={200}
          height={200}
          loading="lazy"
          className="size-16 shrink-0 rounded-lg bg-white shadow-lg"
        />
        <div className="min-w-0">
          <p className="text-sm text-muted">{trainingSection.label}</p>
          <h3 className="text-xl font-bold">{trainingSection.school}</h3>
          <p className="text-sm text-muted">{trainingSection.tagline}</p>
        </div>
      </div>

      <ul className="-mx-3 flex flex-wrap">
        {trainingProjects.map((project) => (
          <li key={project.title}>
            <button
              type="button"
              onClick={() => setSelected(project)}
              aria-haspopup="dialog"
              className="group w-44 rounded-lg p-3 text-left transition-colors hover:bg-highlight focus-visible:bg-highlight sm:w-52"
            >
              <div className="relative mb-3">
                <AlbumCover project={project} />
                <span className="absolute right-2 bottom-2 grid size-11 translate-y-2 place-items-center rounded-full bg-accent text-black opacity-0 shadow-xl transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <Play size={20} fill="currentColor" aria-hidden="true" />
                </span>
              </div>
              <span className="block truncate font-bold">{project.title}</span>
              <span className="block truncate text-sm text-muted">
                {trainingSection.year} · {project.subtitle}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <TrainingProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

function Projects() {
  return (
    <section id="projects" className="px-4 py-8 sm:px-6 md:py-10">
      <h2 className="mb-6 text-2xl font-bold">Projets</h2>
      <div className="flex flex-col gap-10">
        <FeaturedProjectCard />
        <AgencyModules />
        <TrainingProjects />
      </div>
    </section>
  )
}

export default Projects
