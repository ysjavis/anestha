import { TRANSLATIONS } from './data/translations.js';

const LANGUAGE_STORAGE_KEY = "anestha.language";

export let currentLanguage = "ko";

export function setCurrentLanguage(lang) {
  currentLanguage = lang;
}

export function t(key, replacements) {
  const dictionary = TRANSLATIONS[currentLanguage] || TRANSLATIONS.ko;
  const fallbackDictionary = TRANSLATIONS.ko;
  let template = dictionary[key] || fallbackDictionary[key] || key;

  if (!replacements) {
    return template;
  }

  Object.keys(replacements).forEach(function (token) {
    template = template.replace(new RegExp(`\\{${token}\\}`, "g"), replacements[token]);
  });

  return template;
}

export function loadLanguagePreference() {
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage === "ko" || savedLanguage === "en") {
    return savedLanguage;
  }

  return "en";
}

export function saveLanguagePreference(language) {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}
