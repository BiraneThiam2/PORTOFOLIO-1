import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { ui, type UIKey } from '../i18n/ui';

export type Lang = 'fr' | 'en';
/** Texte bilingue. */
export type L = { fr: string; en: string };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  /** Texte d'interface (voir src/i18n/ui.ts). */
  t: (key: UIKey) => string;
  /** Traduit un texte bilingue venant des données. */
  tr: (text: L) => string;
};

const LangContext = createContext<Ctx | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    /* stockage indisponible */
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === 'fr'
        ? 'El Hadji Birane Cisse Thiam — IA & Stratégie des Affaires'
        : 'El Hadji Birane Cisse Thiam — AI & Business Strategy';
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* stockage indisponible */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState((l) => (l === 'fr' ? 'en' : 'fr')), []);
  const t = useCallback((key: UIKey) => ui[key][lang], [lang]);
  const tr = useCallback((text: L) => text[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, toggleLang, t, tr }}>{children}</LangContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang doit être utilisé dans <LangProvider>');
  return ctx;
}
