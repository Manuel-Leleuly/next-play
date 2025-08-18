/**
 * WARNING: only use it on a client component
 */
export const useLocalStorage = () => {
  const setValue = (key: string, value: string) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error("Failed to store value to local storage: ", error);
    }
  };

  const getValue = (key: string) => {
    try {
      const result = window.localStorage.getItem(key);
      if (result === null) throw new Error(`key "${key}" is not available`);
      return result;
    } catch (error) {
      console.error("Failed to get value from local storage: ", error);
    }
  };

  return { setValue, getValue };
};
