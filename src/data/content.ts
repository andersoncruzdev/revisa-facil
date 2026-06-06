import { Content } from "@types-app/study";
import { actionsStudyStorage } from "./study-storage";
import { utils } from "../utils/utils";

type NewContent = Omit<Content, "id" | "idMateria">;

type UpdateContent = Partial<Omit<Content, "id" | "idMateria">>;

const getContents = (): Content[] => {
  const storage = actionsStudyStorage.get();

  return storage.contents;
};

const addContent = (
  idMateria: number,
  data: NewContent,
): boolean => {
  const storage = actionsStudyStorage.get();

  const subjectExists = storage.subjects.some(
    (subject) => subject.id === idMateria,
  );

  if (!subjectExists) return false;

  const newContent: Content = {
    id: utils.nextId(storage.contents),
    idMateria,
    ...data,
  };

  return actionsStudyStorage.save({
    ...storage,
    contents: [...storage.contents, newContent],
  });
};

const updateContent = (
  idContent: number,
  data: UpdateContent,
): boolean => {
  const storage = actionsStudyStorage.get();

  const indexContent = utils.index(storage.contents, idContent);

  if (indexContent === undefined) return false;

  const updatedContents = [...storage.contents];

  updatedContents[indexContent] = {
    ...updatedContents[indexContent],
    ...data,
  };

  return actionsStudyStorage.save({
    ...storage,
    contents: updatedContents,
  });
};

const deleteContent = (idContent: number): boolean => {
  const storage = actionsStudyStorage.get();

  const indexContent = utils.index(storage.contents, idContent);

  if (indexContent === undefined) return false;

  return actionsStudyStorage.save({
    ...storage,
    contents: storage.contents.filter(
      (content) => content.id !== idContent,
    ),
  });
};


export const actionsContent = {
  get: getContents,
  add: addContent,
  update: updateContent,
  delete: deleteContent,
};