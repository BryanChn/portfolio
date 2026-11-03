# Portfolio — Bryan Chaine

Portfolio one-page de développeur PHP / PrestaShop, Symfony et React, au design inspiré de l'interface de Spotify.

**En ligne : [bryan-chaine.vercel.app](https://bryan-chaine.vercel.app)**

## Fonctionnalités

- **Layout façon application** : sidebar de navigation, zone principale défilante, barre de statut fixe (barre d'onglets sur mobile)
- **Compétences** regroupées en trois niveaux : au quotidien, maîtrisées, méthodes
- **Projets** : projet phare mis en avant (avec emplacement pour captures), fiches des modules PrestaShop réalisés en agence (besoin / réalisation / stack), projets de formation
- **Contenu modifiable sans toucher aux composants** : textes, compétences, parcours et projets dans `src/data/*.ts`
- **Formulaire de contact** avec validation, états de chargement / succès / erreur, et envoi réel des emails, protégé contre le spam (captcha Cloudflare Turnstile, rate limit, champ piège)
- **Sécurité et cache** : Content-Security-Policy et en-têtes de sécurité, cache longue durée des assets (`vercel.json`)
- **SEO** : HTML pré-rendu au build, balises Open Graph avec vignette, données structurées JSON-LD, `robots.txt`, `sitemap.xml` et `llms.txt`

## Stack

| Côté        | Technologies                                                                |
| ----------- | --------------------------------------------------------------------------- |
| Front       | React 19, TypeScript, Vite, Tailwind CSS v4, pré-rendu au build             |
| Back        | Fonction serverless Vercel (`api/contact.ts`), Resend pour l'envoi d'emails |
| Déploiement | Vercel, déploiement continu depuis `main`                                   |

La validation du formulaire (`src/lib/contact.ts`) est partagée entre le navigateur et la fonction serverless : les mêmes règles s'appliquent des deux côtés.

## Lancer le projet en local

```bash
npm install
cp .env.example .env.local   # puis renseigner les clés Resend (et Turnstile, optionnel)
npx vercel dev               # http://localhost:3000
```

`npx vercel dev` sert à la fois le site et la fonction `/api/contact` (`npm run dev` ne lance que le front).

## Structure

```
api/contact.ts        Fonction serverless d'envoi d'email
public/               robots.txt, sitemap.xml, llms.txt, vignette Open Graph
scripts/prerender.js  Injecte le HTML pré-rendu dans dist/index.html
src/entry-server.tsx  Rendu de l'application en HTML, utilisé au build
src/components/       Une section par composant (Hero, About, Skills, Projects, Contact…)
src/data/projects.ts  Données des projets et modules
src/lib/contact.ts    Types et validation du formulaire, partagés front / back
```
