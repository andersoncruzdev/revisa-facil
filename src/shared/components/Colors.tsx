import {
  subjectColorOptions,
  subjectColors,
  type SubjectColor,
} from "@constants/subject-colors";

interface ColorsProps {
  readonly selectedColor?: string;
  readonly onSelectColor: (color: SubjectColor) => void;
}

export function Colors({
  selectedColor = subjectColors.azul,
  onSelectColor,
}: ColorsProps) {
  return (
    <div aria-label="Cores da matéria" className="flex gap-2">
      {subjectColorOptions.map((color) => (
        <button
          key={color.name}
          type="button"
          aria-label={`Selecionar cor ${color.name}`}
          aria-pressed={selectedColor === color.value}
          className={`h-6 w-6 rounded-full cursor-pointer ${
            selectedColor === color.value
              ? "ring-2 ring-blue-700 ring-offset-2"
              : ""
          }`}
          onClick={() => onSelectColor(color.value)}
          style={{ backgroundColor: color.value }}
        />
      ))}
    </div>
  );
}
