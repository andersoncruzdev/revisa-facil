import { actionsStudyStorage } from "@data/study-storage";

export const getAmount = (id: number) => {
  const storage = actionsStudyStorage.get();

  return storage.contents.filter((content) => (content.idMateria === id)).length;
};
