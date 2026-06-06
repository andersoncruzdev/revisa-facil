export type Classroom = {
  id: number;
  name: string;
  color: string;
};

export type Content = {
  id: number;
  idMateria: number;
  content: string;
  studied: string;
  nextRevision: string;
};

export type StudyStorage = {
  subjects: Classroom[];
  contents: Content[];
};

export type ClassroomWithContent = Classroom & {
  content: Content[];
};

export type RevisionContent = Content & {
  tipoRevisao: string;
}