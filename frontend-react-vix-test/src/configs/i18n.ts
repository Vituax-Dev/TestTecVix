import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Languagedetector from "i18next-browser-languagedetector";
import { en } from "../languages/en";
import { es } from "../languages/es";
import { ptBR } from "../languages/pt-br";

i18n
  .use(initReactI18next)
  .use(Languagedetector)
  .init({
    fallbackLng: "en",
    debug: false,
    returnObjects: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
      ptBr: {
        translation: ptBR,
      },
    },
  });
