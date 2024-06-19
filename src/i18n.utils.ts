import i18n from './i18n';

export const useTranslation = () => {
  return (key: string) => i18n.global.t(key);
}

export const getTranslatedString = (key: string) => {
  return i18n.global.t(key);
};