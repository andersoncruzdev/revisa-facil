import { actionsStore } from "@data/storage";

describe("Data: storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve salvar dados no localStorage e pegar a informação", () => {
    const result = actionsStore.add("study", {
      name: "Direito Constitucional",
    });

    const storage = actionsStore.get("study");
    expect(result).toBe(true);
    expect(storage).toEqual({
      name: "Direito Constitucional",
    });
  });

  it("deve retornar null se não tiver nada para pegar", () => {
    const result = actionsStore.get("study");
    expect(result).toBeNull();
  });
});
