# Portfolio — El Hadji Birane Cisse Thiam

Portfolio personnel développé avec React, TypeScript et Tailwind CSS. Design dark moderne avec glassmorphism, animations et effets néon.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)

---

## Aperçu

Site vitrine présentant mon profil, mes compétences et mes projets personnels. L'interface mise sur un impact visuel immédiat : fond sombre animé, dégradés violet/cyan, cartes en verre et transitions fluides.

---

## Stack technique

| Outil | Rôle |
|---|---|
| React 18 + TypeScript | UI et logique des composants |
| Tailwind CSS | Design utilitaire |
| Vite | Bundler et dev server |
| Supabase | Backend du formulaire de contact |
| Lucide React | Icônes |
| Space Grotesk | Typographie (Google Fonts) |

---

## Fonctionnalités

- Hero plein écran avec nom en dégradé animé
- Navigation fixe glass avec détection de la section active
- Orbs gradient animées en arrière-plan
- Cartes glassmorphism avec glow néon au survol
- Barres de compétences avec animation d'entrée et effet shimmer
- 9 cartes projets cliquables (liens GitHub)
- Dashboard Power BI intégré (PDF)
- Timeline de formation
- Formulaire de contact connecté à Supabase
- Animations scroll-triggered via IntersectionObserver
- 100% responsive mobile

---

## Projets présentés

| Projet | Technologie | Lien |
|---|---|---|
| Planification de Révision | Python | [github.com/BiraneThiam2/Planning-de-revision](https://github.com/BiraneThiam2/Planning-de-revision) |
| E-commerce Parfums | HTML/CSS/JS | [github.com/BiraneThiam2/luxury](https://github.com/BiraneThiam2/luxury) |
| Chatbot IA | Python / NLP | [github.com/BiraneThiam2/Chatboot-IA](https://github.com/BiraneThiam2/Chatboot-IA) |
| Chat Client-Serveur | Python / Sockets | [github.com/BiraneThiam2/Chat-Python](https://github.com/BiraneThiam2/Chat-Python) |
| Tic-Tac-Toe | JavaScript | [github.com/BiraneThiam2/projet-tic-tac-toe](https://github.com/BiraneThiam2/projet-tic-tac-toe) |
| Organisateur de Fichiers | Python | [github.com/BiraneThiam2/Organisateur-de-fichier](https://github.com/BiraneThiam2/Organisateur-de-fichier) |
| Dashboard Performances | Power BI | PDF local |
| Assistant Matinal | Python | [github.com/BiraneThiam2/assistant-matinal](https://github.com/BiraneThiam2/assistant-matinal) |
| Portfolio Personnel | React / TypeScript | [github.com/BiraneThiam2/Portofolio](https://github.com/BiraneThiam2/Portofolio) |

---

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/BiraneThiam2/Portofolio.git
cd Portofolio

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Le site est accessible sur `http://localhost:5173`.

## Build de production

```bash
npm run build
npm run preview
```

Les fichiers générés se trouvent dans `dist/`.

---

## Structure du projet

```
src/
├── components/
│   ├── Header.tsx      # Navigation fixe avec détection section active
│   ├── Hero.tsx        # Section d'accueil plein écran
│   ├── About.tsx       # Présentation avec photo
│   ├── Skills.tsx      # Compétences avec barres animées
│   ├── Projects.tsx    # 9 cartes projets avec liens GitHub
│   ├── Education.tsx   # Parcours académique (timeline)
│   ├── Goals.tsx       # Objectifs professionnels
│   ├── Contact.tsx     # Formulaire de contact (Supabase)
│   └── Footer.tsx      # Pied de page
├── App.tsx             # Racine + orbs d'arrière-plan
├── index.css           # Styles globaux, utilitaires, animations
└── main.tsx            # Point d'entrée React
```

---

## Personnalisation

**Mettre à jour les projets** — modifier le tableau `projects` dans [src/components/Projects.tsx](src/components/Projects.tsx).

**Informations de contact** — Email et liens sociaux dans `Hero.tsx`, `Contact.tsx`, `Header.tsx` et `Footer.tsx`.

**CV** — placer le fichier PDF dans `public/cv.pdf`. Le bouton "Mon CV" déclenchera le téléchargement automatiquement.

**Photo de profil** — remplacer `b.jpeg` à la racine et mettre à jour la référence dans `About.tsx`.

---

## Auteur

**El Hadji Birane Cisse Thiam**
Étudiant en Intelligence Artificielle & Stratégie des Affaires — Swiss UMEF Campus Dakar

- Email : biranethiam916@gmail.com
- LinkedIn : [linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336](https://www.linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336/)
- GitHub : [github.com/BiraneThiam2](https://github.com/BiraneThiam2)
