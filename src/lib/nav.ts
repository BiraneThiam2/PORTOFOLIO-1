import { prefersReducedMotion } from './hooks';

export const scrollToId = (id: string) => {
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
  if (id === 'top') window.scrollTo({ top: 0, behavior });
  else document.getElementById(id)?.scrollIntoView({ behavior });
};

export const openPalette = () => window.dispatchEvent(new Event('open-palette'));

const PROJECT_PREFIX = 'projet/';

/** Slug du projet ouvert dans l'URL (#projet/<slug>), sinon null. */
export const projectFromHash = () => {
  const h = window.location.hash.slice(1);
  return h.startsWith(PROJECT_PREFIX) ? h.slice(PROJECT_PREFIX.length) : null;
};

/** Ouvre l'étude de cas d'un projet (le bouton « retour » du navigateur la referme). */
export const openProject = (slug: string) => {
  window.location.hash = PROJECT_PREFIX + slug;
};
