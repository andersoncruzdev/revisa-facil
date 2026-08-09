export const subjectColors = {
  red: "#ef4444",
  azul: "#2563eb",
  amareloEscuro: "#ca8a04",
  laranja: "#f97316",
  verdeEscuro: "#166534",
  roxo: "#7c3aed",
  rosa: "#db2777",
} as const;

export type SubjectColorName = keyof typeof subjectColors;
export type SubjectColor = (typeof subjectColors)[SubjectColorName];

export const subjectColorOptions = Object.entries(subjectColors).map(
  ([name, value]) => ({
    name: name as SubjectColorName,
    value,
  }),
);
