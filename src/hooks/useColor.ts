import { classroomColors } from "@constants/classroom-colors";

import { useState } from "react";

export function useColor(initialColor: string = classroomColors.azul) {
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);

  return {
    selectedColor,
    setSelectedColor,
  };
}
