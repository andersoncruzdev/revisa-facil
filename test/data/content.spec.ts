import { StudyStorage } from "@types-app/study";
import { actionsContent } from "@data/content";
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
      name: "Direito Constitucional",
      color: "#000",
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
      idClassroom: 1,
      content: "Divisão política",
      studied: "01/06/2026",
      nextRevision: "07/06/2026",
    },
  ],
};

const newContent = {
  content: "Novo conteúdo",
  studied: "01/06/2026",
  nextRevision: "07/06/2026",
};

describe("Data: content", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("deve trazer o conteúdo da store", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);

    const result = actionsContent.get();

    expect(actionsStudyStorage.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(storageMock.contents);
  });

  it("deve adicionar o conteúdo corretamente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);
    (actionsStudyStorage.save as Mock).mockReturnValue(true);

    const result = actionsContent.add(1, newContent);

    expect(result).toBe(true);

    expect(actionsStudyStorage.save).toHaveBeenCalledWith({
      ...storageMock,
      contents: [
        ...storageMock.contents,
        {
          id: 3,
          idClassroom: 1,
          ...newContent,
        },
      ],
    });

    expect(actionsStudyStorage.save).toHaveBeenCalledTimes(1);
  });

  it("deve falhar ao adicionar conteúdo em matéria inexistente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);

    const result = actionsContent.add(2, newContent);

    expect(result).toBe(false);
    expect(actionsStudyStorage.save).not.toHaveBeenCalled();
  });

  it("deve atualizar o conteúdo corretamente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);
    (actionsStudyStorage.save as Mock).mockReturnValue(true);

    const result = actionsContent.update(1, {
      studied: "08/06/2026",
    });

    expect(result).toBe(true);

    expect(actionsStudyStorage.save).toHaveBeenCalledWith({
      ...storageMock,
      contents: [
        {
          id: 1,
          idClassroom: 1,
          content: "Direitos e garantias individuais",
          studied: "08/06/2026",
          nextRevision: "07/06/2026",
        },
        {
          id: 2,
          idClassroom: 1,
          content: "Divisão política",
          studied: "01/06/2026",
          nextRevision: "07/06/2026",
        },
      ],
    });

    expect(actionsStudyStorage.save).toHaveBeenCalledTimes(1);
  });

  it("deve falhar ao atualizar conteúdo inexistente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);

    const result = actionsContent.update(999, {
      studied: "08/06/2026",
    });

    expect(result).toBe(false);
    expect(actionsStudyStorage.save).not.toHaveBeenCalled();
  });

  it("deve deletar o conteúdo corretamente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);
    (actionsStudyStorage.save as Mock).mockReturnValue(true);

    const result = actionsContent.delete(1);

    expect(result).toBe(true);

    expect(actionsStudyStorage.save).toHaveBeenCalledWith({
      ...storageMock,
      contents: [
        {
          id: 2,
          idClassroom: 1,
          content: "Divisão política",
          studied: "01/06/2026",
          nextRevision: "07/06/2026",
        },
      ],
    });

    expect(actionsStudyStorage.save).toHaveBeenCalledTimes(1);
  });

  it("deve falhar ao deletar conteúdo inexistente", () => {
    (actionsStudyStorage.get as Mock).mockReturnValue(storageMock);

    const result = actionsContent.delete(999);

    expect(result).toBe(false);
    expect(actionsStudyStorage.save).not.toHaveBeenCalled();
  });
});
