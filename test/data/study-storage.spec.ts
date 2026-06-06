import { Mock } from "vitest";
import { StudyStorage } from "@types-app/study";
import { actionsStudyStorage } from "@data/study-storage";
import { actionsStore } from "@data/storage";

vi.mock("@data/storage", () => ({
  actionsStore: {
    get: vi.fn(),
    add: vi.fn(),
  },
}));

const storageMock: StudyStorage = {
  subjects: [
    {
      id: 1,
      name: "Direito Constitucional",
      color: "#000",
    },
  ],
  contents: [
    {
      id: 1,
      idMateria: 1,
      content: "Direitos e garantias individuais",
      studied: "01/06/2026",
      nextRevision: "07/06/2026",
    },
  ],
};

describe("Data: study-storage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("deve buscar o storage pela chave study", () => {
    (actionsStore.get as Mock).mockReturnValue(storageMock);

    const result = actionsStudyStorage.get();

    expect(actionsStore.get).toHaveBeenCalledWith("study");
    expect(actionsStore.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(storageMock);
  });

  it("deve retornar o storage inicial quando não existir dado salvo", () => {
    (actionsStore.get as Mock).mockReturnValue(null);

    const result = actionsStudyStorage.get();

    expect(actionsStore.get).toHaveBeenCalledWith("study");
    expect(result).toEqual({
      subjects: [],
      contents: [],
    });
  });

  it("deve salvar o storage pela chave study", () => {
    (actionsStore.add as Mock).mockReturnValue(true);

    const result = actionsStudyStorage.save(storageMock);

    expect(actionsStore.add).toHaveBeenCalledWith("study", storageMock);
    expect(actionsStore.add).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it("deve retornar false quando não conseguir salvar", () => {
    (actionsStore.add as Mock).mockReturnValue(false);

    const result = actionsStudyStorage.save(storageMock);

    expect(actionsStore.add).toHaveBeenCalledWith("study", storageMock);
    expect(result).toBe(false);
  });
});