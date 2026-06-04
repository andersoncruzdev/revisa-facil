export type StudyDate = Date | string;

export type RevisionInterval = "D+1" | "D+7" | "D+14";

export interface Classroom {
  readonly id?: string;
  readonly title: string;
  readonly color: string;
  readonly amountContent: number;
}

export interface Content {
  readonly id?: string;
  readonly name: string;
  readonly studied: StudyDate;
  readonly revised?: StudyDate | null;
  readonly nextRevision: StudyDate;
}

export interface ContentRevision extends Content {
  readonly tipoRevisao: RevisionInterval;
}
