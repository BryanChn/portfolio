import { Dumbbell, Music, Newspaper, type LucideIcon } from 'lucide-react'
import { agency } from './profile'

export type Experience = {
  role: string
  company: string
  period: string
  description?: string
}

export type Interest = {
  label: string
  icon: LucideIcon
}

export const highlight =
  '4 modules PrestaShop livrés en production pour des clients grands comptes.'

export const intro = [
  'Avant d’écrire du code, j’ai été chef d’équipe à la centrale nucléaire de Fessenheim, où la rigueur et les procédures ne se discutent pas.',
  `J’ai ensuite passé ${agency.duration} en agence e-commerce à développer des modules PrestaShop sur mesure, en production, pour des clients grands comptes comme ${agency.clients.join(' et ')}. Je développe aussi en React / TypeScript : mon projet actuel est une application mobile avec Supabase.`,
  'Je cherche un poste de développeur sur site ou en hybride, à Mulhouse, Colmar ou Strasbourg.',
]

export const education = {
  degree: 'Licence Pro Développeur Web et Application',
  school: 'UHA 4.0, Mulhouse',
  period: '2021 – 2023',
}

export const interests: Interest[] = [
  { label: 'Composition musicale', icon: Music },
  { label: 'Veille technologique', icon: Newspaper },
  { label: 'Musculation', icon: Dumbbell },
]

export const experiences: Experience[] = [
  {
    role: 'Développeur',
    company: 'Projet personnel « On mange quoi ? »',
    period: 'oct. 2026 – aujourd’hui',
  },
  {
    role: 'Développeur Full Stack',
    company: `${agency.name}, Mulhouse`,
    period: 'oct. 2024 – juil. 2025',
    description: `Modules PrestaShop 1.7 et 8.2 sur mesure, en production, pour des clients grands comptes (${agency.clients.join(', ')}).`,
  },
  {
    role: 'Développeur stagiaire',
    company: 'L. Ratteli, développeur indépendant',
    period: 'janv. – juin 2023',
    description:
      'Bibliothèque open-source de gestion du cycle de vie d’articles, de la mise en ligne à la revente (Java, AngularJS).',
  },
  {
    role: 'Chef d’équipe',
    company: 'CNPE de Fessenheim',
    period: '2012 – 2015',
    description:
      'Management d’équipe, gestion des priorités, protocoles de sécurité en environnement critique.',
  },
]
