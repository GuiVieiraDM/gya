import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import brasil from '../assets/brasil.svg';
// @ts-ignore
import usa from '../assets/usa.svg';
// @ts-ignore
import spain from '../assets/spain.svg';

const languages = [
  { code: 'pt-BR', label: 'Português', flag: brasil },
  { code: 'en', label: 'English', flag: usa },
  { code: 'es', label: 'Español', flag: spain },
];

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  // Normaliza o código do idioma para o disponível
  function normalizeLang(code: string) {
    if (code.startsWith('pt')) return 'pt-BR';
    if (code.startsWith('en')) return 'en';
    if (code.startsWith('es')) return 'es';
    return 'pt-BR';
  }
  const current = normalizeLang(i18n.language);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const currentLang = languages.find(l => l.code === current) || languages[0];

  return (
    <div className="flex justify-end w-full px-4 py-2" ref={ref}>
      <button
        className="flex items-center gap-2 bg-white/80 border border-violet-200 rounded px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-sm transition min-w-[120px]"
        onClick={() => setOpen(v => !v)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img src={currentLang.flag} alt={t(`flags.${currentLang.code.slice(0,2)}`)} className="w-5 h-5 rounded-full object-cover" />
        <span>{currentLang.label}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <ul className="absolute mt-1 right-4 bg-white border border-violet-200 rounded shadow-lg z-50 min-w-[140px]">
          {languages.map(lang => (
            <li key={lang.code}>
              <button
                className={`flex items-center gap-2 px-3 py-2 w-full text-left text-sm hover:bg-violet-100 transition ${current === lang.code ? 'font-bold text-violet-700' : 'text-gray-800'}`}
                onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                type="button"
              >
                <img src={lang.flag} alt={t(`flags.${lang.code.slice(0,2)}`)} className="w-5 h-5 rounded-full object-cover" />
                <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector; 