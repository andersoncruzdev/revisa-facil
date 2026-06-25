import {
  classroomColorOptions,
  classroomColors,
  type ClassroomColor,
} from "@constants/classroom-colors";

interface ColorsProps {
  readonly selectedColor?: ClassroomColor;
  readonly onSelectColor: (color: ClassroomColor) => void;
}

export function Colors({
  selectedColor = classroomColors.azul,
  onSelectColor,
}: ColorsProps) {
  return (
    <div aria-label="Cores da matéria" className="flex gap-2">
      {classroomColorOptions.map((color) => (
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
