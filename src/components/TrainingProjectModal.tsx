import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { trainingSection, type TrainingProject } from '../data/projects'
import AlbumCover from './AlbumCover'

type Props = {
  project: TrainingProject | null
  onClose: () => void
}

function TrainingProjectModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="training-project-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(42rem,calc(100%-2rem))] flex-col overflow-hidden rounded-xl bg-surface p-0 text-white shadow-2xl backdrop:bg-black/70 open:flex"
    >
      {project && (
        <article className="min-h-0 overflow-y-auto overscroll-contain">
          <header
            className={`flex flex-col gap-5 bg-linear-to-b p-6 pt-12 sm:flex-row sm:items-end ${project.cover}`}
          >
            <AlbumCover
              project={project}
              className="w-32 shrink-0 shadow-2xl sm:w-40"
              titleClassName="text-xl"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium">{trainingSection.label}</p>
              <h3
                id="training-project-title"
                className="text-4xl font-black break-words sm:text-6xl"
              >
                {project.title}
              </h3>
              <p className="mt-3 flex items-center gap-2 text-sm text-white/90">
                <img
                  src={trainingSection.logo.src}
                  alt=""
                  width={200}
                  height={200}
                  className="size-6 rounded-sm bg-white"
                />
                <span className="font-bold">{trainingSection.school}</span>
                <span aria-hidden="true">·</span>
                {trainingSection.year}
                <span aria-hidden="true">·</span>
                {project.subtitle}
              </p>
            </div>
          </header>

          <div className="flex flex-col gap-5 p-6">
            <p className="text-lg leading-relaxed">{project.description}</p>
            <p className="text-muted">{trainingSection.context}</p>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li key={item} className="rounded-full bg-highlight px-3 py-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-3 right-3 rounded-full bg-black/40 p-2 hover:bg-black/70"
      >
        <X size={20} aria-hidden="true" />
      </button>
    </dialog>
  )
}

export default TrainingProjectModal
