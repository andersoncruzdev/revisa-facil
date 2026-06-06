import { StudyStorage } from "@types-app/study";
import { actionsStore } from "./storage";

const studyKey = "study";

const initialStudyStorage: StudyStorage = {
  subjects: [],
  contents: [],
};

const getStudyStorage = (): StudyStorage => {
  return actionsStore.get<StudyStorage>(studyKey) ?? initialStudyStorage;
};

const saveStudyStorage = (data: StudyStorage): boolean => {
  return actionsStore.add<StudyStorage>(studyKey, data);
};

export const actionsStudyStorage = {
  get: getStudyStorage,
  save: saveStudyStorage,
};