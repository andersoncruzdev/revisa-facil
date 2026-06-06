import { actionsStore } from "@data/storage";

describe("Data: storage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
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

  it("deve retornar null se não tiver nada para pegar ou a chave for errada", () => {
    const result = actionsStore.get("study");
    expect(result).toBeNull();
  });

  it("deve retornar false se a chave para salvar for inválida", () => {
    const result = actionsStore.add("Study", {
      name: "Direito Constitucional",
    });

    expect(result).toBe(false);
    expect(localStorage.getItem("Study")).toBeNull();
  });

  it("deve capturar o erro e fazer console.error se o localStorage falhar", () => {
    const consoleSpyon = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("localStorage falhou");
    });

    const result = actionsStore.add("study", {
      name: "Direito Constitucional",
    });

    expect(result).toBe(false);
    expect(consoleSpyon).toHaveBeenCalled();
  });

  it("deve retornar null quando o getItem falhar", () => {
    const consoleSpyon = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("localStorage falhou");
    });

    const result = actionsStore.get("study");

    expect(result).toBeNull();
    expect(consoleSpyon).toHaveBeenCalledWith(
      "Erro ao buscar study no localStorage:",
      expect.any(Error),
    );
  });
});
