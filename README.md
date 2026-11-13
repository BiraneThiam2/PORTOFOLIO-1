# Portfolio — El Hadji Birane Cisse Thiam

Portfolio personnel bilingue (FR / EN) développé avec React, TypeScript et Tailwind CSS.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)

---

## Fonctionnalités

- **Réseau de neurones interactif** en arrière-plan du hero (canvas), qui réagit au pointeur
- **Bilingue FR / EN** : bouton dans le header, langue du navigateur détectée par défaut
- **Thème clair / sombre** avec transition circulaire (touche `T`)
- **Palette de commandes** `⌘K` / `Ctrl+K` : navigation, études de cas, thème, langue, CV, email
- **Projets filtrables** avec cartes 3D et halo qui suit la souris
- **Études de cas** détaillées (objectif, démarche, résultats, limites), accessibles par lien direct `#projet/<slug>`
- **Activité GitHub en direct** : dépôts récents, étoiles et répartition des langages via l'API GitHub
- **Formulaire de contact** envoyé via Formspree (ou ouverture de la messagerie si non configuré)
- Animations au défilement, compteurs, machine à écrire, heure de Dakar en direct
- Respect de la préférence « réduire les animations », navigation clavier, 100 % responsive

---

## Installation

```bash
git clone https://github.com/BiraneThiam2/PORTOFOLIO-1.git
cd PORTOFOLIO-1
npm install
npm run dev
```

Le site est accessible sur `http://localhost:5173`.

```bash
npm run build     # build de production dans dist/
npm run preview   # prévisualiser le build
```

### Activer l'envoi du formulaire de contact

1. Créer un compte gratuit sur [formspree.io](https://formspree.io) et un nouveau formulaire.
2. Copier son identifiant (la fin de l'URL `https://formspree.io/f/xxxxxxx`).
3. Créer un fichier `.env` à la racine (voir `.env.example`) :
   ```env
   VITE_FORMSPREE_ID=xxxxxxx
   ```
4. Sur l'hébergeur (Vercel, Netlify…), ajouter la même variable d'environnement.

Sans cette variable, le bouton « Envoyer » ouvre la messagerie du visiteur avec le message pré-rempli.

---

## Structure

```
src/
├── data.ts               # ★ Tout le contenu : profil, projets, études de cas, compétences, parcours
├── i18n/ui.ts            # Textes d'interface en français et en anglais
├── lib/
│   ├── i18n.tsx          # Gestion de la langue (useLang)
│   ├── theme.ts          # Thème clair / sombre
│   ├── hooks.ts          # Apparition au scroll, compteurs, machine à écrire…
│   └── nav.ts            # Défilement et liens vers les études de cas
├── components/
│   ├── Header.tsx        # Navigation, langue, thème, menu mobile
│   ├── Hero.tsx          # Accueil + réseau de neurones (NeuralCanvas.tsx)
│   ├── About.tsx · Skills.tsx · Education.tsx · Vision.tsx
│   ├── Projects.tsx      # Filtres et cartes projets
│   ├── CaseStudy.tsx     # Panneau d'étude de cas
│   ├── GithubActivity.tsx# Dépôts GitHub en direct
│   ├── Contact.tsx       # Formulaire (Formspree)
│   ├── CommandPalette.tsx · Cursor.tsx · Marquee.tsx · Footer.tsx
│   └── ui.tsx            # Composants partagés
└── index.css             # Couleurs du thème (variables CSS) et animations
```

---

## Personnalisation

- **Contenu** : tout se modifie dans [src/data.ts](src/data.ts). Chaque texte existe en `fr` et en `en`.
- **Ajouter une capture d'écran à un projet** : placer l'image dans `public/projects/` puis ajouter
  `image: '/projects/mon-image.png'` au projet. Sans image, un aperçu coloré est généré.
- **Ajouter une étude de cas** : renseigner le champ `caseStudy` du projet (voir DiabèteScope comme modèle).
- **Couleurs** : variables `--accent`, `--bg`, `--ink`… en haut de [src/index.css](src/index.css).

---

## Auteur

**El Hadji Birane Cisse Thiam**
Étudiant en Intelligence Artificielle & Stratégie des Affaires — Swiss UMEF Campus Dakar

- Email : biranethiam916@gmail.com
- LinkedIn : [linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336](https://www.linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336/)
- GitHub : [github.com/BiraneThiam2](https://github.com/BiraneThiam2)
