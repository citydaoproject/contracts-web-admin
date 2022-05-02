export const cloneMap = <K, V>(map: Map<K, V>): Map<K, V> => {
  const clone = new Map<K, V>();
  for (const [key, value] of map) {
    clone.set(key, value);
  }
  return clone;
};
