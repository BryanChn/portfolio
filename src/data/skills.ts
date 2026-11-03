import type { IconType } from 'react-icons'
import {
  SiClaude,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPhp,
  SiPrestashop,
  SiReact,
  SiScrumalliance,
  SiSymfony,
  SiTypescript,
  SiWordpress,
} from 'react-icons/si'

export type Skill = {
  name: string
  detail: string
  icon: IconType
  color: string
}

export type SkillGroup = {
  title: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Au quotidien',
    skills: [
      { name: 'PHP', detail: 'Back-end et modules sur mesure', icon: SiPhp, color: '#777BB4' },
      {
        name: 'PrestaShop 1.7 / 8',
        detail: 'Modules, hooks, back-office',
        icon: SiPrestashop,
        color: '#DF0067',
      },
      { name: 'Symfony', detail: 'Framework PHP', icon: SiSymfony, color: '#FFFFFF' },
      { name: 'MySQL', detail: 'Modélisation et requêtes', icon: SiMysql, color: '#4479A1' },
      { name: 'Git', detail: 'Branches, commits, PR', icon: SiGit, color: '#F05032' },
    ],
  },
  {
    title: 'Je maîtrise',
    skills: [
      { name: 'JavaScript', detail: 'ES6+, front et back', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', detail: 'Typage strict', icon: SiTypescript, color: '#3178C6' },
      { name: 'React', detail: 'SPA et PWA hors-ligne', icon: SiReact, color: '#61DAFB' },
      { name: 'React Native', detail: 'Applications mobiles', icon: SiReact, color: '#61DAFB' },
      { name: 'WordPress', detail: 'CMS, sites vitrines', icon: SiWordpress, color: '#21759B' },
      { name: 'HTML / CSS', detail: 'Intégration responsive', icon: SiHtml5, color: '#E34F26' },
    ],
  },
  {
    title: 'Méthodes',
    skills: [
      {
        name: 'Scrum',
        detail: 'Certifié Scrum Master',
        icon: SiScrumalliance,
        color: '#009FDA',
      },
      {
        name: 'Développement assisté par IA',
        detail: 'Claude',
        icon: SiClaude,
        color: '#D97757',
      },
    ],
  },
]
