import { Subject } from "@types-app/study";
import { utils } from "../utils/utils";
import { actionsStudyStorage } from "./study-storage";

export type NewSubject = Omit<Subject, "id">;
export type EditSubject = Partial<Omit<Subject, "id">>;

const normalizeName = (name: string): string => {
  return name.trim().toLowerCase();
};

const getSubject = (): Subject[] => {
  const studyStorage = actionsStudyStorage.get();

  return studyStorage.subjects;
};

const addNewSubject = (data: NewSubject): boolean => {
  const studyStorage = actionsStudyStorage.get();

  const normalizedName = normalizeName(data.name);

  const subjectExists = utils.param(
    studyStorage.subjects,
    "name",
    normalizedName,
  );

  if (subjectExists) {
    return false;
  }

  const newSubject: Subject = {
    ...data,
    id: utils.nextId(studyStorage.subjects),
    name: normalizedName,
  };

  return actionsStudyStorage.save({
    ...studyStorage,
    subjects: [...studyStorage.subjects, newSubject],
  });
};

const editSubject = (subjectId: number, data: EditSubject): boolean => {
  const studyStorage = actionsStudyStorage.get();

  const indexSubject = utils.index(studyStorage.subjects, subjectId);

  if (indexSubject === undefined) {
    return false;
  }

  const updatedSubject: Subject = {
    ...studyStorage.subjects[indexSubject],
    ...data,
  };

  if (data.name) {
    const normalizedName = normalizeName(data.name);

    const nameExists = studyStorage.subjects.some(
      (subject) =>
        subject.id !== subjectId && subject.name === normalizedName,
    );

    if (nameExists) {
      return false;
    }

    updatedSubject.name = normalizedName;
  }

  const updatedSubjects = [...studyStorage.subjects];

  updatedSubjects[indexSubject] = updatedSubject;

  return actionsStudyStorage.save({
    ...studyStorage,
    subjects: updatedSubjects,
  });
};

const deleteSubject = (subjectId: number): boolean => {
  const studyStorage = actionsStudyStorage.get();

  const subjectExists = utils.param(studyStorage.subjects, "id", subjectId);

  if (!subjectExists) {
    return false;
  }

  const updatedSubjects = studyStorage.subjects.filter(
    (subject) => subject.id !== subjectId,
  );

  const updatedContents = studyStorage.contents.filter(
    (content) => content.subjectId !== subjectId,
  );

  return actionsStudyStorage.save({
    subjects: updatedSubjects,
    contents: updatedContents,
  });
};

export const actionsSubject = {
  get: getSubject,
  add: addNewSubject,
  edit: editSubject,
  delete: deleteSubject,
};
