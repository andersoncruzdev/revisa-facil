import { act, renderHook } from "@testing-library/react";
import { useHeader } from "@hooks/useHeader";

describe("Teste do 'useHeader'", () => {
  it.each([
    "#/dashboard",
    "#/materias",
    "#/conteudos",
    "#/revisoes",
    "#/historico",
  ])("inicia com a âncora ativa correta", (href) => {
    const { result } = renderHook(() => useHeader(href));

    expect(result.current.active).toBe(href);
  });

  it("atualiza a âncora ativa quando setActive é chamado", () => {
    const { result } = renderHook(() => useHeader("#/dashboard"));

    act(() => {
      result.current.setActive("#/materias");
    });

    expect(result.current.active).toBe("#/materias");
  });
});
