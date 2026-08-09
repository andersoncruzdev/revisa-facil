import { act, renderHook } from "@testing-library/react";
import { subjectColors } from "@constants/subject-colors";
import { useColor } from "@hooks/useColor";

describe("hooks: useColor", () => {
  it("inicia com azul como cor selecionada", () => {
    const { result } = renderHook(useColor);

    expect(result.current.selectedColor).toBe(subjectColors.azul);
  });

  it("atualiza a cor selecionada", () => {
    const { result } = renderHook(useColor);

    act(() => {
      result.current.setSelectedColor(subjectColors.rosa);
    });

    expect(result.current.selectedColor).toBe(subjectColors.rosa);
  });
});
