const getLocalStorage = <T>(name: string): T | null => {
  try {
    const json = localStorage.getItem(name);

    if (!json) {
      return null;
    }

    return JSON.parse(json) as T;
  } catch (error) {
    console.error(`Erro ao buscar ${name} no localStorage:`, error);
    return null;
  }
};

const addLocalStorage = <T>(name: string, data: T): boolean => {
  try {
    const json = JSON.stringify(data);

    localStorage.setItem(name, json);

    return true;
  } catch (error) {
    console.error(`Erro ao salvar ${name} no localStorage:`, error);
    return false;
  }
};

export const actionsStore = {
  get: getLocalStorage,
  add: addLocalStorage,
};