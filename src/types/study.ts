export type Subject = {
  id: number;
  name: string;
  color: string;
};

export type Content = {
  id: number;
  subjectId: number;
  content: string;
  studied: string;
  nextRevision: string;
};

export type StudyStorage = {
  subjects: Subject[];
  contents: Content[];
};

export type SubjectWithContent = Subject & {
  content: Content[];
};

export type RevisionContent = Content & {
  tipoRevisao: string;
}