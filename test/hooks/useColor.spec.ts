import { act, renderHook } from "@testing-library/react";
import { classroomColors } from "@constants/classroom-colors";
import { useColor } from "@hooks/useColor";

describe("hooks: useColor", () => {
  it("inicia com azul como cor selecionada", () => {
    const { result } = renderHook(useColor);

    expect(result.current.selectedColor).toBe(classroomColors.azul);
  });

  it("atualiza a cor selecionada", () => {
    const { result } = renderHook(useColor);

    act(() => {
      result.current.setSelectedColor(classroomColors.rosa);
    });

    expect(result.current.selectedColor).toBe(classroomColors.rosa);
  });
});
