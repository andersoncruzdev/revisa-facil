import { actionsDate } from "@utils/transform-date";

describe("Utils: transform-date", () => {
  it("recebe data string inválida e retorna null", () => {
    const dateString = actionsDate.string("06/13/2026");
    expect(dateString).toBeNull();
  });

  it("calcula o atrasado entre duas datas", () => {
    const dateToday = new Date();
    const dateNextRevision = new Date();
    dateNextRevision.setDate(dateToday.getDate() - 1);
    const diff = actionsDate.diffInDays(
      dateToday,
      dateNextRevision.toLocaleDateString("pt-BR"),
    );
    expect(diff).toEqual(-1);
  });
});
