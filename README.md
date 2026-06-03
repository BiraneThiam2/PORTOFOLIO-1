# Portfolio — El Hadji Birane Cisse Thiam

Portfolio personnel développé avec React, TypeScript et Tailwind CSS. Design dark moderne avec glassmorphism, animations et effets néon.

## Aperçu

Site vitrine présentant mon profil, mes compétences et mes projets personnels. L'interface mise sur un impact visuel immédiat : fond sombre animé, dégradés violet/cyan, cartes en verre et transitions fluides.

## Technologies

- **React 18** + **TypeScript**
- **Tailwind CSS** — design utilitaire
- **Vite** — bundler rapide
- **Lucide React** — icônes
- **Space Grotesk** — typographie (Google Fonts)

## Fonctionnalités

- Hero plein écran avec nom en dégradé animé
- Navigation fixe glass avec détection de la section active
- Orbs gradient animées en arrière-plan
- Cartes glassmorphism avec glow néon au survol
- Barres de compétences avec animation d'entrée et effet shimmer
- 5 cartes projets cliquables (redirection GitHub)
- Timeline de formation
- Formulaire de contact avec confirmation
- Animations scroll-triggered (IntersectionObserver)
- 100% responsive mobile

## Projets présentés

| Projet | Technologie | Lien |
|---|---|---|
| Planification de Révision | Python | [github.com/BiraneThiam2/planification-revision](https://github.com/BiraneThiam2/planification-revision) |
| E-commerce Parfums | HTML/CSS/JS | [github.com/BiraneThiam2/ecommerce-parfum](https://github.com/BiraneThiam2/ecommerce-parfum) |
| Chatbot IA | Python / NLP | [github.com/BiraneThiam2/chatbot-ia](https://github.com/BiraneThiam2/chatbot-ia) |
| Chat Client-Serveur | Python / Sockets | [github.com/BiraneThiam2/chat-client-serveur](https://github.com/BiraneThiam2/chat-client-serveur) |
| Tic-Tac-Toe | JavaScript | [github.com/BiraneThiam2/tic-tac-toe](https://github.com/BiraneThiam2/tic-tac-toe) |

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/BiraneThiam2/portfolio.git
cd portfolio

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

Les fichiers générés se trouvent dans le dossier `dist/`.

## Structure du projet

```
src/
├── components/
│   ├── Header.tsx      # Navigation fixe avec détection section active
│   ├── Hero.tsx        # Section d'accueil plein écran
│   ├── About.tsx       # Présentation avec photo
│   ├── Skills.tsx      # Compétences avec barres animées
│   ├── Projects.tsx    # 5 cartes projets avec liens
│   ├── Education.tsx   # Parcours académique (timeline)
│   ├── Goals.tsx       # Objectifs professionnels
│   ├── Contact.tsx     # Formulaire de contact
│   └── Footer.tsx      # Pied de page
├── App.tsx             # Racine + orbs d'arrière-plan
├── index.css           # Styles globaux, utilitaires, animations
└── main.tsx            # Point d'entrée React
```

## Personnalisation

### Mettre à jour les liens de projets

Dans [src/components/Projects.tsx](src/components/Projects.tsx), modifier le champ `link` de chaque projet avec l'URL réelle du dépôt ou de la démo.

### Changer les informations de contact

- Email : `Hero.tsx` et `Contact.tsx`
- GitHub : `Header.tsx`, `Hero.tsx`, `Contact.tsx`, `Footer.tsx`
- LinkedIn : même fichiers

### Ajouter son CV

Placer le fichier PDF du CV dans le dossier `public/` en le nommant `cv.pdf` :

```
public/
└── cv.pdf
```

Le bouton "Mon CV" dans le Hero et le lien dans Contact déclencheront automatiquement le téléchargement sous le nom `CV_ElHadjiBiraneCisseThiam.pdf`.

### Photo de profil

Remplacer le fichier `b.jpeg` à la racine du projet par votre photo, puis mettre à jour la référence dans `About.tsx`.

## Auteur

**El Hadji Birane Cisse Thiam**
Étudiant en Intelligence Artificielle & Stratégie des Affaires — Swiss UMEF Campus Dakar

- Email : biranethiam916@gmail.com
- LinkedIn : [linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336](https://www.linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336/)
- GitHub : [github.com/BiraneThiam2](https://github.com/BiraneThiam2)
