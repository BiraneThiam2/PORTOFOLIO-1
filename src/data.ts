import {
  Activity, BarChart3, Bot, Brain, Briefcase, CalendarCheck, Car, Code, Database, FolderTree, Gamepad2, GitBranch,
  Globe, Lightbulb, MessageSquare, MessagesSquare, Shield, ShoppingBag, Sunrise, Target, Terminal, TrendingUp, Users,
  type LucideIcon,
} from 'lucide-react';
import type { L } from './lib/i18n';
import type { UIKey } from './i18n/ui';

/* Toutes les données du site sont ici : modifie ce fichier pour mettre à jour le contenu.
   Chaque texte affiché existe en français (fr) et en anglais (en). */

export const GITHUB_USER = 'BiraneThiam2';

export const profile = {
  firstName: 'El Hadji Birane',
  lastName: 'Cisse Thiam',
  school: 'Swiss UMEF Campus Dakar',
  email: 'biranethiam916@gmail.com',
  github: `https://github.com/${GITHUB_USER}`,
  linkedin: 'https://www.linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336/',
  cv: '/CV_ElHadjiBiraneCisseThiam.pdf',
  cvName: 'CV_ElHadjiBiraneCisseThiam.pdf',
  photo: '/b.jpeg',
  roles: [
    { fr: 'Intelligence Artificielle', en: 'Artificial Intelligence' },
    { fr: 'Stratégie des Affaires', en: 'Business Strategy' },
    { fr: 'Data & Machine Learning', en: 'Data & Machine Learning' },
    { fr: 'Cybersécurité', en: 'Cybersecurity' },
  ] as L[],
};

export const nav: { id: string; key: UIKey }[] = [
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'github', key: 'nav.github' },
  { id: 'education', key: 'nav.education' },
  { id: 'contact', key: 'nav.contact' },
];

export const stack = [
  'Python', 'scikit-learn', 'Machine Learning', 'pandas', 'Streamlit', 'React', 'TypeScript', 'SQL', 'Power BI',
  'NLP', 'LLM', 'Git', 'Linux', 'Cybersécurité',
];

export type Skill = { icon: LucideIcon; name: L; pct: number };

export const technicalSkills: Skill[] = [
  { icon: GitBranch, name: { fr: 'Git & GitHub', en: 'Git & GitHub' }, pct: 60 },
  { icon: Terminal, name: { fr: 'Linux / Windows', en: 'Linux / Windows' }, pct: 50 },
  { icon: Database, name: { fr: 'Bases de données', en: 'Databases' }, pct: 45 },
  { icon: BarChart3, name: { fr: 'Data & Analyse', en: 'Data analysis' }, pct: 40 },
  { icon: Code, name: { fr: 'Python', en: 'Python' }, pct: 35 },
  { icon: Globe, name: { fr: 'Réseaux informatiques', en: 'Computer networks' }, pct: 35 },
  { icon: Shield, name: { fr: 'Cybersécurité', en: 'Cybersecurity' }, pct: 30 },
  { icon: Brain, name: { fr: 'Intelligence Artificielle', en: 'Artificial Intelligence' }, pct: 25 },
];

export const softSkills: Skill[] = [
  { icon: TrendingUp, name: { fr: 'Apprentissage rapide', en: 'Fast learner' }, pct: 80 },
  { icon: Users, name: { fr: 'Travail en équipe', en: 'Teamwork' }, pct: 75 },
  { icon: Target, name: { fr: 'Esprit analytique', en: 'Analytical mindset' }, pct: 75 },
  { icon: Lightbulb, name: { fr: 'Résolution de problèmes', en: 'Problem solving' }, pct: 70 },
  { icon: MessageSquare, name: { fr: 'Communication', en: 'Communication' }, pct: 65 },
  { icon: Briefcase, name: { fr: 'Stratégie des affaires', en: 'Business strategy' }, pct: 35 },
];

export type Category = 'python' | 'web' | 'data' | 'auto';

export const categories: { id: Category | 'all'; label: L }[] = [
  { id: 'all', label: { fr: 'Tous', en: 'All' } },
  { id: 'data', label: { fr: 'IA & Data', en: 'AI & Data' } },
  { id: 'python', label: { fr: 'Python', en: 'Python' } },
  { id: 'web', label: { fr: 'Web', en: 'Web' } },
  { id: 'auto', label: { fr: 'Automatisation', en: 'Automation' } },
];

export type CaseStudy = {
  goal: L;
  approach: L[];
  results?: { label: L; value: L; ref?: L }[];
  resultsNote?: L;
  limits?: L[];
  stack: string[];
};

export type Project = {
  slug: string;
  icon: LucideIcon;
  title: L;
  description: L;
  tech: string[];
  categories: Category[];
  hue: number;
  link: string;
  github?: string;
  demo?: string;
  /** Capture d'écran affichée en haut de la carte (ex. '/projects/mon-projet.png' dans public/).
      Sans image, un aperçu est généré à partir de la couleur et de l'icône du projet. */
  image?: string;
  featured?: boolean;
  caseStudy?: CaseStudy;
};

const repo = (name: string) => `https://github.com/${GITHUB_USER}/${name}`;

export const projects: Project[] = [
  {
    slug: 'diabetescope',
    icon: Activity,
    featured: true,
    title: { fr: 'DiabèteScope', en: 'DiabèteScope' },
    description: {
      fr: "Dépistage du risque de diabète par machine learning, avec une application Streamlit en ligne pour tester le modèle. Réalisé pendant l'UMEF AI Bootcamp (GalsenAI).",
      en: 'Diabetes risk screening with machine learning, plus a live Streamlit app to test the model. Built during the UMEF AI Bootcamp (GalsenAI).',
    },
    tech: ['Python', 'scikit-learn', 'Streamlit'],
    categories: ['python', 'data'],
    hue: 350,
    link: 'https://diabetescope.streamlit.app/',
    demo: 'https://diabetescope.streamlit.app/',
    github: repo('DiabeteScope'),
    caseStudy: {
      goal: {
        fr: "Prédire, à partir de 8 mesures médicales simples (glycémie, IMC, âge, tension…), la probabilité qu'une patiente soit diabétique — et couvrir toute la chaîne, de l'analyse à une application web utilisable.",
        en: 'Predict, from 8 simple medical measurements (glucose, BMI, age, blood pressure…), the probability that a patient is diabetic — covering the whole chain, from analysis to a usable web app.',
      },
      approach: [
        {
          fr: 'Nettoyage : les 0 « non mesurés » (glycémie, tension, insuline, IMC…) sont convertis en valeurs manquantes puis imputés par la médiane dans le pipeline.',
          en: 'Cleaning: “not measured” zeros (glucose, blood pressure, insulin, BMI…) are turned into missing values, then median-imputed inside the pipeline.',
        },
        {
          fr: 'Pipeline scikit-learn (imputation → standardisation → modèle) et comparaison de trois modèles : régression logistique, forêt aléatoire, gradient boosting.',
          en: 'scikit-learn pipeline (imputation → scaling → model) comparing three models: logistic regression, random forest, gradient boosting.',
        },
        {
          fr: 'Sélection sur le ROC-AUC en validation croisée stratifiée à 5 plis, face à une référence naïve.',
          en: 'Model selection on ROC-AUC with stratified 5-fold cross-validation, against a naive baseline.',
        },
        {
          fr: "Seuil de décision réglable : un diabète non détecté coûte plus cher qu'une fausse alerte, donc on privilégie le rappel.",
          en: 'Adjustable decision threshold: a missed diabetes case costs more than a false alarm, so recall is prioritised.',
        },
        {
          fr: 'Application Streamlit en 5 onglets : une patiente, fichier CSV, données, performances, à propos.',
          en: 'Streamlit app with 5 tabs: single patient, CSV batch, data, performance, about.',
        },
      ],
      results: [
        { label: { fr: 'ROC-AUC (validation croisée)', en: 'ROC-AUC (cross-validation)' }, value: { fr: '0,84', en: '0.84' }, ref: { fr: '0,50', en: '0.50' } },
        { label: { fr: 'ROC-AUC (test)', en: 'ROC-AUC (test)' }, value: { fr: '0,81', en: '0.81' }, ref: { fr: '0,50', en: '0.50' } },
        { label: { fr: 'Accuracy', en: 'Accuracy' }, value: { fr: '0,73', en: '0.73' }, ref: { fr: '0,65', en: '0.65' } },
        { label: { fr: 'Rappel (diabète)', en: 'Recall (diabetes)' }, value: { fr: '0,70', en: '0.70' }, ref: { fr: '0,00', en: '0.00' } },
      ],
      resultsNote: {
        fr: 'Meilleur modèle : régression logistique, évaluée sur 154 patientes. Avec un seuil abaissé à 0,4, le rappel monte à 0,83. La valeur grisée est la référence naïve.',
        en: 'Best model: logistic regression, evaluated on 154 patients. Lowering the threshold to 0.4 raises recall to 0.83. The greyed value is the naive baseline.',
      },
      limits: [
        {
          fr: 'Population restreinte (768 femmes Pima) : les résultats ne se généralisent pas automatiquement, par exemple à la population sénégalaise.',
          en: 'Narrow population (768 Pima women): results do not automatically generalise, e.g. to the Senegalese population.',
        },
        {
          fr: 'Projet pédagogique : le modèle estime un risque, il ne pose pas de diagnostic médical.',
          en: 'Educational project: the model estimates a risk, it does not make a medical diagnosis.',
        },
      ],
      stack: ['Python', 'pandas', 'scikit-learn', 'Streamlit', 'Jupyter'],
    },
  },
  {
    slug: 'chatbot-ia',
    icon: Bot,
    title: { fr: 'Chatbot IA', en: 'AI Chatbot' },
    description: {
      fr: "Chatbot conversationnel en Python branché sur l'API Groq (Llama 3.3 70B) : historique, personnalités et sauvegarde des conversations.",
      en: 'Conversational chatbot in Python powered by the Groq API (Llama 3.3 70B): memory, personalities and saved conversations.',
    },
    tech: ['Python', 'LLM', 'Groq API'],
    categories: ['python', 'data'],
    hue: 265,
    link: repo('Chatboot-IA'),
    github: repo('Chatboot-IA'),
    caseStudy: {
      goal: {
        fr: "Construire un assistant conversationnel en terminal qui garde le fil de la discussion et dont on peut changer le ton, en s'appuyant sur un grand modèle de langage.",
        en: 'Build a terminal chat assistant that keeps track of the conversation and whose tone can be changed, on top of a large language model.',
      },
      approach: [
        {
          fr: "Classe ConversationalChatbot : envoi des messages au modèle llama-3.3-70b-versatile via l'API Groq, avec l'historique complet pour le contexte.",
          en: 'ConversationalChatbot class: sends messages to llama-3.3-70b-versatile through the Groq API, with the full history as context.',
        },
        {
          fr: 'Quatre personnalités (assistant amical, expert technique, professeur, humoriste) définies par prompt système.',
          en: 'Four personalities (friendly assistant, technical expert, teacher, comedian) defined through the system prompt.',
        },
        {
          fr: 'Sauvegarde et rechargement des conversations en JSON horodaté, résumé et remise à zéro depuis un menu.',
          en: 'Save and reload conversations as timestamped JSON, plus summary and reset from a menu.',
        },
        {
          fr: 'Clé API isolée dans un fichier .env (python-dotenv), jamais versionnée.',
          en: 'API key kept in a .env file (python-dotenv), never committed.',
        },
      ],
      stack: ['Python', 'Groq API', 'Llama 3.3 70B', 'python-dotenv'],
    },
  },
  {
    slug: 'analyse-consommation',
    icon: Car,
    title: { fr: 'Analyse de la consommation automobile', en: 'Car fuel-efficiency analysis' },
    description: {
      fr: 'Analyse exploratoire de 398 véhicules (1970–1982) pour comprendre ce qui fait varier la consommation de carburant.',
      en: 'Exploratory analysis of 398 cars (1970–1982) to understand what drives fuel consumption.',
    },
    tech: ['Python', 'pandas', 'matplotlib'],
    categories: ['python', 'data'],
    hue: 190,
    link: repo('Analyse-Consommation-Voiture'),
    github: repo('Analyse-Consommation-Voiture'),
    image: `https://raw.githubusercontent.com/${GITHUB_USER}/Analyse-Consommation-Voiture/main/images/synthese_mpg.png`,
    caseStudy: {
      goal: {
        fr: 'Identifier les facteurs qui expliquent la consommation de carburant de véhicules américains, européens et japonais commercialisés entre 1970 et 1982.',
        en: 'Identify the factors that explain the fuel consumption of American, European and Japanese cars sold between 1970 and 1982.',
      },
      approach: [
        {
          fr: 'Diagnostic : structure, valeurs manquantes, doublons et valeurs aberrantes.',
          en: 'Diagnosis: structure, missing values, duplicates and outliers.',
        },
        {
          fr: 'Nettoyage : 6 puissances manquantes (1,5 %) imputées par la médiane, plus robuste que la moyenne face aux véhicules très puissants.',
          en: 'Cleaning: 6 missing horsepower values (1.5%) imputed with the median, more robust than the mean to very powerful cars.',
        },
        {
          fr: 'Agrégations par origine, cylindrée et période, puis croisements.',
          en: 'Aggregations by origin, cylinders and period, then cross-analysis.',
        },
        {
          fr: 'Visualisation avec matplotlib, dont une grille de quatre graphiques.',
          en: 'Visualisation with matplotlib, including a four-chart grid.',
        },
      ],
      results: [
        { label: { fr: 'Japon vs USA (mpg)', en: 'Japan vs USA (mpg)' }, value: { fr: '30,5', en: '30.5' }, ref: { fr: '20,1', en: '20.1' } },
        { label: { fr: '4 vs 8 cylindres (mpg)', en: '4 vs 8 cylinders (mpg)' }, value: { fr: '29,3', en: '29.3' }, ref: { fr: '15,0', en: '15.0' } },
        { label: { fr: 'Gain après 1976', en: 'Gain after 1976' }, value: { fr: '+39 %', en: '+39%' } },
        { label: { fr: 'Plus sobre : Mazda GLC', en: 'Most efficient: Mazda GLC' }, value: { fr: '46,6', en: '46.6' } },
      ],
      resultsNote: {
        fr: "Le poids est le facteur clé : l'origine la plus légère est la plus sobre. Après les chocs pétroliers, la consommation moyenne passe de 19,4 à 27,0 mpg.",
        en: 'Weight is the key factor: the lightest origin is the most efficient. After the oil crises, average efficiency rises from 19.4 to 27.0 mpg.',
      },
      stack: ['Python', 'pandas', 'matplotlib'],
    },
  },
  {
    slug: 'dashboard-commercial',
    icon: BarChart3,
    title: { fr: 'Dashboard Performances Commerciales', en: 'Sales Performance Dashboard' },
    description: {
      fr: 'Analyse des performances commerciales sous Power BI : KPIs clés, tendances de ventes et visualisations interactives.',
      en: 'Sales performance analysis in Power BI: key KPIs, sales trends and interactive visuals.',
    },
    tech: ['Power BI', 'Data Viz', 'BI'],
    categories: ['data'],
    hue: 45,
    link: '/dashboard-performances.pdf',
  },
  {
    slug: 'assistant-matinal',
    icon: Sunrise,
    title: { fr: 'Assistant Matinal', en: 'Morning Assistant' },
    description: {
      fr: "Script qui envoie chaque matin un email avec la météo du jour (OpenWeatherMap) et les tâches planifiées.",
      en: "Script that emails you every morning with the day's weather (OpenWeatherMap) and scheduled tasks.",
    },
    tech: ['Python', 'API REST', 'Automatisation'],
    categories: ['python', 'auto'],
    hue: 20,
    link: repo('Assistant-Matinale'),
    github: repo('Assistant-Matinale'),
  },
  {
    slug: 'planning-revision',
    icon: CalendarCheck,
    title: { fr: 'Smart Study Planner', en: 'Smart Study Planner' },
    description: {
      fr: "Générateur de planning de révision optimisé selon les priorités, les contraintes de temps et les dates d'examen.",
      en: 'Study schedule generator optimised around priorities, time constraints and exam dates.',
    },
    tech: ['Python', 'Algorithmes', 'CLI'],
    categories: ['python'],
    hue: 35,
    link: repo('Planning-de-revision'),
    github: repo('Planning-de-revision'),
  },
  {
    slug: 'chat-client-serveur',
    icon: MessagesSquare,
    title: { fr: 'Chat Client-Serveur', en: 'Client-Server Chat' },
    description: {
      fr: 'Messagerie instantanée multi-clients : sockets TCP et gestion des connexions avec le threading.',
      en: 'Multi-client instant messaging: TCP sockets and connection handling with threading.',
    },
    tech: ['Python', 'Sockets', 'Threading'],
    categories: ['python'],
    hue: 160,
    link: repo('Chat-Python'),
    github: repo('Chat-Python'),
  },
  {
    slug: 'organisateur-fichiers',
    icon: FolderTree,
    title: { fr: 'Organisateur de Fichiers', en: 'File Organiser' },
    description: {
      fr: "Trie automatiquement un dossier encombré par type : images, documents, vidéos, audio, archives.",
      en: 'Automatically sorts a cluttered folder by type: images, documents, videos, audio, archives.',
    },
    tech: ['Python', 'OS', 'Automatisation'],
    categories: ['python', 'auto'],
    hue: 220,
    link: repo('Organisateur-de-fichier'),
    github: repo('Organisateur-de-fichier'),
  },
  {
    slug: 'mata-luxury',
    icon: ShoppingBag,
    title: { fr: 'MATA Luxury', en: 'MATA Luxury' },
    description: {
      fr: 'Site e-commerce de parfums de luxe : catalogue, panier dynamique et contact WhatsApp / email.',
      en: 'Luxury perfume e-commerce site: catalogue, dynamic cart and WhatsApp / email contact.',
    },
    tech: ['HTML/CSS', 'JavaScript', 'E-commerce'],
    categories: ['web'],
    hue: 335,
    link: repo('Site-de-vente'),
    github: repo('Site-de-vente'),
  },
  {
    slug: 'tic-tac-toe',
    icon: Gamepad2,
    title: { fr: 'Tic-Tac-Toe', en: 'Tic-Tac-Toe' },
    description: {
      fr: 'Jeu de morpion interactif en JavaScript, interface épurée et mode deux joueurs.',
      en: 'Interactive tic-tac-toe in JavaScript with a clean UI and two-player mode.',
    },
    tech: ['JavaScript', 'HTML/CSS'],
    categories: ['web'],
    hue: 200,
    link: repo('projet-tic-tac-toe'),
    github: repo('projet-tic-tac-toe'),
  },
  {
    slug: 'portfolio',
    icon: Globe,
    title: { fr: 'Portfolio Personnel', en: 'Personal Portfolio' },
    description: {
      fr: 'Ce site : React, TypeScript et Tailwind, avec réseau neuronal interactif, palette de commandes et version bilingue.',
      en: 'This site: React, TypeScript and Tailwind, with an interactive neural network, command palette and bilingual version.',
    },
    tech: ['React', 'TypeScript', 'TailwindCSS'],
    categories: ['web'],
    hue: 75,
    link: repo('PORTOFOLIO-1'),
    github: repo('PORTOFOLIO-1'),
  },
];

export const educations = [
  {
    degree: { fr: 'Intelligence Artificielle & Stratégie des Affaires', en: 'Artificial Intelligence & Business Strategy' },
    school: { fr: 'Swiss UMEF Campus Dakar', en: 'Swiss UMEF Campus Dakar' },
    period: { fr: '2025 — Aujourd’hui', en: '2025 — Present' },
    current: true,
    description: {
      fr: 'Formation qui combine les compétences techniques en IA avec une compréhension stratégique du monde des affaires.',
      en: 'A programme combining technical AI skills with a strategic understanding of business.',
    },
    subjects: [
      { fr: 'Machine Learning', en: 'Machine Learning' },
      { fr: 'Data Science', en: 'Data Science' },
      { fr: "Stratégie d'entreprise", en: 'Business strategy' },
      { fr: 'Transformation digitale', en: 'Digital transformation' },
      { fr: 'Cybersécurité', en: 'Cybersecurity' },
    ],
  },
  {
    degree: { fr: 'Génie Logiciel & Bases de données', en: 'Software Engineering & Databases' },
    school: { fr: 'Formation initiale', en: 'Undergraduate studies' },
    period: { fr: '2024 — 2025', en: '2024 — 2025' },
    current: false,
    description: {
      fr: "Première année d'études en génie logiciel : des bases solides en développement et en gestion de données.",
      en: 'A first year of software engineering: solid foundations in development and data management.',
    },
    subjects: [
      { fr: 'Programmation', en: 'Programming' },
      { fr: 'Bases de données', en: 'Databases' },
      { fr: 'SQL', en: 'SQL' },
      { fr: 'Modélisation', en: 'Modelling' },
      { fr: 'Architecture logicielle', en: 'Software architecture' },
    ],
  },
];

export const certifications = [
  {
    title: 'Meta Front-End Developer',
    issuer: 'Meta · Coursera',
    period: { fr: '2024 — 7 mois', en: '2024 — 7 months' },
    pdf: '/meta-frontend-developer.pdf',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Git/GitHub', 'UI/UX Design', 'Jest'],
    description: {
      fr: 'Certification professionnelle obtenue après 7 mois de formation (6 h/semaine), avec un projet final développé de A à Z.',
      en: 'Professional certificate earned after 7 months of training (6 h/week), with a capstone project built end to end.',
    },
  },
];

export const goals: { title: L; description: L }[] = [
  {
    title: { fr: 'Développement continu', en: 'Continuous growth' },
    description: {
      fr: 'Approfondir l’IA, le Machine Learning et la data science à travers des projets concrets et des formations spécialisées.',
      en: 'Deepen my AI, machine learning and data science skills through real projects and specialised training.',
    },
  },
  {
    title: { fr: 'Vision Tech-Business', en: 'Tech-business vision' },
    description: {
      fr: 'Maîtriser le lien entre technologie et stratégie pour créer de la valeur et transformer les organisations.',
      en: 'Master the link between technology and strategy to create value and transform organisations.',
    },
  },
  {
    title: { fr: 'Expérience pratique', en: 'Hands-on experience' },
    description: {
      fr: 'Gagner de l’expérience terrain via des stages, des projets collaboratifs et des initiatives innovantes.',
      en: 'Gain field experience through internships, collaborative projects and innovative initiatives.',
    },
  },
  {
    title: { fr: 'Évolution professionnelle', en: 'Career path' },
    description: {
      fr: 'Évoluer vers des métiers stratégiques liés à l’IA, la data ou la cybersécurité.',
      en: 'Move into strategic roles in AI, data or cybersecurity.',
    },
  },
];
