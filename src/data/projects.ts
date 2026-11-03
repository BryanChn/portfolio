import { agency } from './profile'

export type Screenshot = {
  src: string
  alt: string
}

export type FeaturedProject = {
  title: string
  status: string
  pitch: string
  stack: string[]
  highlights: string[]
  github: string
  screenshots: Screenshot[]
  screenshotsReady: boolean
  cover: string
}

export type AgencyModule = {
  title: string
  need: string
  done: string[]
  stack: string[]
}

export type TrainingProject = {
  title: string
  subtitle: string
  description: string
}

export const featuredProject: FeaturedProject = {
  title: 'On mange quoi ?',
  status: 'MVP en cours',
  pitch:
    'App mobile de décision collective des repas : chacun propose, tout le monde vote, l’app tranche.',
  stack: ['React Native', 'TypeScript', 'Expo', 'Supabase (Postgres, Auth, Realtime)'],
  highlights: [
    'Migrations SQL versionnées',
    'Scénarios de test SQL',
    'Typage strict',
    'ESLint',
    'Roadmap par objectifs mesurables',
  ],
  github: 'https://github.com/BryanChn/on-mange-quoi',
  screenshots: [
    { src: '/projects/on-mange-quoi/1.png', alt: 'On mange quoi ?, capture 1' },
    { src: '/projects/on-mange-quoi/2.png', alt: 'On mange quoi ?, capture 2' },
    { src: '/projects/on-mange-quoi/3.png', alt: 'On mange quoi ?, capture 3' },
  ],
  screenshotsReady: false,
  cover: 'from-amber-500 to-rose-600',
}

export const agencySection = {
  title: `Expérience en agence · ${agency.name}`,
  notice: 'Code propriétaire, non publié.',
}

export const agencyModules: AgencyModule[] = [
  {
    title: 'Module de retours client',
    need: 'Remplacer le système de retours existant par un parcours neuf, pour les clients connectés comme pour les invités.',
    done: [
      'Client connecté : sélection de la commande à retourner, formulaire pré-rempli.',
      'Invité : retour à partir du numéro de commande, qui retrouve le client et sa commande et pré-remplit le formulaire.',
      'Envoi d’informations par le client (motif, marque, photos).',
      'Interface d’administration intégrée au back-office via un hook PrestaShop pour traiter les demandes.',
      'E-mails automatiques de confirmation et de suivi au client.',
      'Données persistées en base.',
    ],
    stack: ['PHP', 'PrestaShop 8', 'Smarty / Twig', 'MySQL'],
  },
  {
    title: 'Module de campagnes et visuels',
    need: 'Permettre à l’équipe marketing d’afficher rapidement des bannières sur différentes zones du site, sans développeur.',
    done: [
      'Création de panneaux (image, texte) positionnés sur les zones du site via les hooks PrestaShop.',
      'Programmation par dates et horaires : activation et désactivation automatiques par tâche cron.',
      'Exemple : bannière en pied de page affichée uniquement pendant la période de Noël, avec un visuel cadeau et « -20 % ».',
    ],
    stack: ['PHP', 'PrestaShop', 'Smarty / Twig', 'cron', 'MySQL'],
  },
  {
    title: 'Module de purge du cache Varnish',
    need: 'Que les modifications du catalogue apparaissent sans attendre l’expiration du cache.',
    done: [
      'Vidage automatique du cache Varnish après ajout ou modification de données.',
      'Panneau d’administration pour vider le cache manuellement.',
      'Planification par cron à l’horaire choisi par l’équipe du site.',
    ],
    stack: ['PHP', 'PrestaShop', 'Varnish', 'cron'],
  },
  {
    title: 'Module de factures ZPL',
    need: 'Imprimer les factures directement sur imprimante thermique.',
    done: ['Génération des factures au format ZPL à partir des commandes PrestaShop.'],
    stack: ['PHP', 'PrestaShop', 'ZPL'],
  },
]

export const trainingSection = {
  title: 'Projets de formation · UHA 4.0 (2022)',
}

export const trainingProjects: TrainingProject[] = [
  {
    title: 'SDIS 67',
    subtitle: 'React · PWA',
    description:
      'PWA React hors-ligne avec Service Workers, pour les interventions dans les zones sans réseau.',
  },
  {
    title: 'EBN',
    subtitle: 'React Native',
    description: 'App React Native de collecte de bio-déchets avec tableau de bord en temps réel.',
  },
]
