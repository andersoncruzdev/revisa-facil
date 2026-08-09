import { subjectColors } from "@constants/subject-colors";

import { useState } from "react";

export function useColor(initialColor: string = subjectColors.azul) {
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);

  return {
    selectedColor,
    setSelectedColor,
  };
}
