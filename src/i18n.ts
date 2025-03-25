import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from '@/translation/en.json'
import per from '@/translation/per.json'
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    global : en
  },
  per: {
   global : per
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "per", 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;