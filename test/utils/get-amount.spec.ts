import { getAmount } from "@utils/get-amount";
import { actionsStudyStorage } from "@data/study-storage";

const storageMock = {
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
    {
      id: 2,
      idMateria: 1,
      content: "Direitos e garantias individuais",
      studied: "01/06/2026",
      nextRevision: "07/06/2026",
    },
    {
      id: 3,
      idMateria: 2,
      content: "Direitos e garantias individuais",
      studied: "01/06/2026",
      nextRevision: "07/06/2026",
    },
  ],
};

describe("Utils: get-amount", () => {
  it("traz a quantidade de contéudo da matéria", () => {
    vi.spyOn(actionsStudyStorage, "get").mockReturnValue(storageMock);
    const amount = getAmount(1);
    expect(amount).toEqual(2);
  });
});
