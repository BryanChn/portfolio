import { trainingSection, type TrainingProject } from '../data/projects'

type Props = {
  project: TrainingProject
  className?: string
  titleClassName?: string
}

function AlbumCover({ project, className = '', titleClassName = 'text-2xl' }: Props) {
  return (
    <div
      className={`relative flex aspect-square flex-col justify-between overflow-hidden rounded-md bg-linear-to-br p-3 shadow-lg ${project.cover} ${className}`}
    >
      <img
        src={trainingSection.logo.src}
        alt=""
        width={200}
        height={200}
        loading="lazy"
        className="size-9 rounded-md bg-white shadow-md"
      />
      <span className={`leading-none font-black tracking-tight break-words ${titleClassName}`}>
        {project.title}
      </span>
      <span className="pointer-events-none absolute -right-8 -bottom-8 size-28 rounded-full border-[14px] border-black/15" />
    </div>
  )
}

export default AlbumCover
