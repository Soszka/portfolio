import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './assets/i18n/en.json';
import translationPL from './assets/i18n/pl.json';

const supportedLanguages = ['pl', 'en'];

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'pl';
  }

  const savedLanguage = window.localStorage.getItem('language');
  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language?.slice(0, 2).toLowerCase();
  return supportedLanguages.includes(browserLanguage) ? browserLanguage : 'pl';
};

const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'pl',
  supportedLngs: supportedLanguages,
  nonExplicitSupportedLngs: true,
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (language) => {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedLanguage = language?.slice(0, 2).toLowerCase();
  if (supportedLanguages.includes(normalizedLanguage)) {
    window.localStorage.setItem('language', normalizedLanguage);
  }
});

export default i18n;
