import { Classroom } from "@types-app/study";
import { utils } from "../utils/utils";
import { actionsStudyStorage } from "./study-storage";

export type NewClassroom = Omit<Classroom, "id">;
export type EditClassroom = Partial<Omit<Classroom, "id">>;

const normalizeName = (name: string): string => {
  return name.trim().toLowerCase();
};

const getClassroom = (): Classroom[] => {
  const studyStorage = actionsStudyStorage.get();

  return studyStorage.subjects;
};

const addNewClassroom = (data: NewClassroom): boolean => {
  const studyStorage = actionsStudyStorage.get();

  const normalizedName = normalizeName(data.name);

  const classroomExists = utils.param(
    studyStorage.subjects,
    "name",
    normalizedName,
  );

  if (classroomExists) {
    return false;
  }

  const newClassroom: Classroom = {
    ...data,
    id: utils.nextId(studyStorage.subjects),
    name: normalizedName,
  };

  return actionsStudyStorage.save({
    ...studyStorage,
    subjects: [...studyStorage.subjects, newClassroom],
  });
};

const editClassroom = (idClassroom: number, data: EditClassroom): boolean => {
  const studyStorage = actionsStudyStorage.get();

  const indexClassroom = utils.index(studyStorage.subjects, idClassroom);

  if (indexClassroom === undefined) {
    return false;
  }

  const updatedClassroom: Classroom = {
    ...studyStorage.subjects[indexClassroom],
    ...data,
  };

  if (data.name) {
    const normalizedName = normalizeName(data.name);

    const nameExists = utils.param(
      studyStorage.subjects,
      "name",
      normalizedName,
    );

    if (nameExists) {
      return false;
    }

    updatedClassroom.name = normalizedName;
  }

  const updatedSubjects = [...studyStorage.subjects];

  updatedSubjects[indexClassroom] = updatedClassroom;

  return actionsStudyStorage.save({
    ...studyStorage,
    subjects: updatedSubjects,
  });
};

const deleteClassroom = (idClassroom: number): boolean => {
  const studyStorage = actionsStudyStorage.get();

  const classroomExists = utils.param(studyStorage.subjects, "id", idClassroom);

  if (!classroomExists) {
    return false;
  }

  const updatedSubjects = studyStorage.subjects.filter(
    (subject) => subject.id !== idClassroom,
  );

  const updatedContents = studyStorage.contents.filter(
    (content) => content.idMateria !== idClassroom,
  );

  return actionsStudyStorage.save({
    subjects: updatedSubjects,
    contents: updatedContents,
  });
};

export const actionsClassroom = {
  get: getClassroom,
  add: addNewClassroom,
  edit: editClassroom,
  delete: deleteClassroom,
};
