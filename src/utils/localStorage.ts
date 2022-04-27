export const getLocalStorage = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (!value) {
    return null;
  }
  return JSON.parse(value);
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const buildLocalStorageKey = (prefix: string, key: string): string => `${prefix}.${key}`;
