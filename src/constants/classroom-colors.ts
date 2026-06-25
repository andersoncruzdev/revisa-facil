export const classroomColors = {
  red: "#ef4444",
  azul: "#2563eb",
  amareloEscuro: "#ca8a04",
  laranja: "#f97316",
  verdeEscuro: "#166534",
  roxo: "#7c3aed",
  rosa: "#db2777",
} as const;

export type ClassroomColorName = keyof typeof classroomColors;
export type ClassroomColor = (typeof classroomColors)[ClassroomColorName];

export const classroomColorOptions = Object.entries(classroomColors).map(
  ([name, value]) => ({
    name: name as ClassroomColorName,
    value,
  }),
);
