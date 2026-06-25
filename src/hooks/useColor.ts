import {
  type ClassroomColor,
  classroomColors,
} from "@constants/classroom-colors";

import { useState } from "react";

export function useColor() {
  const [selectedColor, setSelectedColor] = useState<ClassroomColor>(
    classroomColors.azul,
  );

  return {
    selectedColor,
    setSelectedColor,
  };
}
