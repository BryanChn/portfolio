import { skillGroups } from '../data/skills'

function Skills() {
  return (
    <section id="skills" className="px-4 py-8 sm:px-6 md:py-10">
      <h2 className="mb-6 text-2xl font-bold">Compétences</h2>

      <div className="flex flex-col gap-8">
        {skillGroups.map(({ title, skills }) => (
          <div key={title}>
            <h3 className="mb-3 text-lg font-bold">{title}</h3>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {skills.map(({ name, detail, icon: Icon, color }) => (
                <li
                  key={name}
                  className="group flex flex-col gap-3 rounded-lg bg-elevated p-4 transition-colors hover:bg-highlight"
                >
                  <Icon
                    size={40}
                    color={color}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="min-w-0">
                    <p className="font-bold break-words">{name}</p>
                    <p className="text-sm text-muted">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
