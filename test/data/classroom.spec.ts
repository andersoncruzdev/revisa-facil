import { StudyStorage } from "@types-app/study";
import { actionsClassroom } from "@data/classroom";
import { actionsStudyStorage } from "@data/study-storage";
import { afterEach, describe, expect, it, vi, type Mock } from "vitest";

vi.mock("@data/study-storage", () => ({
  actionsStudyStorage: {
    get: vi.fn(),
    save: vi.fn(),
  },
}));

const storageMock: StudyStorage = {
  subjects: [
    {
      id: 1,
      name: "direito constitucional",
      color: "#000",
    },
    {
      id: 2,
      name: "direito administrativo",
      color: "#1E88E5",
    },
  ],
  contents: [
    {
      id: 1,
      idClassroom: 1,
      content: "Direitos e garantias individuais",
      studied: "01/06/2026",
      nextRevision: "07/06/2026",
    },
    {
      id: 2,
      idClassroom: 2,
      content: "Atos administrativos",
      studied: "02/06/2026",
      nextRevision: "08/06/2026",
    },
  ],
};

const newClassroom = {
  name: " Direito Penal ",
  color: "#E53935",
};

describe("Data: classroom", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("deve trazer as matérias da store", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);

    const result = actionsClassroom.get();

    expect(actionsStudyStorage.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(storageMock.subjects);
  });

  it("deve adicionar matéria corretamente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);
    (actionsStudyStorage.save as Mock).mockReturnValue(true);

    const result = actionsClassroom.add(newClassroom);

    expect(result).toBe(true);

    expect(actionsStudyStorage.save).toHaveBeenCalledWith({
      ...storageMock,
      subjects: [
        ...storageMock.subjects,
        {
          id: 3,
          name: "direito penal",
          color: "#E53935",
        },
      ],
    });

    expect(actionsStudyStorage.save).toHaveBeenCalledTimes(1);
  });

  it("deve falhar ao adicionar matéria de mesmo nome", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);

    const result = actionsClassroom.add({
      name: " Direito Constitucional ",
      color: "#000",
    });

    expect(result).toBe(false);
    expect(actionsStudyStorage.save).not.toHaveBeenCalled();
  });

  it("deve editar matéria corretamente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);
    (actionsStudyStorage.save as Mock).mockReturnValue(true);

    const result = actionsClassroom.edit(1, {
      name: " Direito Civil ",
      color: "#43A047",
    });

    expect(result).toBe(true);

    expect(actionsStudyStorage.save).toHaveBeenCalledWith({
      ...storageMock,
      subjects: [
        {
          id: 1,
          name: "direito civil",
          color: "#43A047",
        },
        {
          id: 2,
          name: "direito administrativo",
          color: "#1E88E5",
        },
      ],
    });

    expect(actionsStudyStorage.save).toHaveBeenCalledTimes(1);
  });

  it("deve editar apenas a cor da matéria", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);
    (actionsStudyStorage.save as Mock).mockReturnValue(true);

    const result = actionsClassroom.edit(1, {
      color: "#FFFFFF",
    });

    expect(result).toBe(true);

    expect(actionsStudyStorage.save).toHaveBeenCalledWith({
      ...storageMock,
      subjects: [
        {
          id: 1,
          name: "direito constitucional",
          color: "#FFFFFF",
        },
        {
          id: 2,
          name: "direito administrativo",
          color: "#1E88E5",
        },
      ],
    });
  });

  it("deve falhar ao editar matéria inexistente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);

    const result = actionsClassroom.edit(999, {
      name: "Direito Civil",
    });

    expect(result).toBe(false);
    expect(actionsStudyStorage.save).not.toHaveBeenCalled();
  });

  it("deve falhar ao editar matéria para nome já existente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);

    const result = actionsClassroom.edit(1, {
      name: " Direito Administrativo ",
    });

    expect(result).toBe(false);
    expect(actionsStudyStorage.save).not.toHaveBeenCalled();
  });

  it("deve deletar matéria e seus conteúdos corretamente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);
    (actionsStudyStorage.save as Mock).mockReturnValue(true);

    const result = actionsClassroom.delete(1);

    expect(result).toBe(true);

    expect(actionsStudyStorage.save).toHaveBeenCalledWith({
      subjects: [
        {
          id: 2,
          name: "direito administrativo",
          color: "#1E88E5",
        },
      ],
      contents: [
        {
          id: 2,
          idClassroom: 2,
          content: "Atos administrativos",
          studied: "02/06/2026",
          nextRevision: "08/06/2026",
        },
      ],
    });
  });

  it("deve falhar ao deletar matéria inexistente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);

    const result = actionsClassroom.delete(999);

    expect(result).toBe(false);
    expect(actionsStudyStorage.save).not.toHaveBeenCalled();
  });
});
