import { actionsDate } from "@utils/transform-date";

describe("Utils: transform-date", () => {
  it("recebe data string inválida e retorna null", () => {
    const dateString = actionsDate.string("06/13/2026");
    expect(dateString).toBeNull();
  });

  it("recebe data faltando algum campo", () => {
    const dateString = actionsDate.string("06/13");
    expect(dateString).toBeNull();
  })

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

  it("retorna null se a string para os dias de atraso for inválida", () => {
    const dateToday = new Date();
    const dateNextRevision = new Date();
    const [_, month, year] = dateNextRevision.toLocaleDateString("pt-BR").split("/")
    const dateString = month + "/" + year;
    const diff = actionsDate.diffInDays(dateToday, dateString);
    expect(diff).toBeNull();
  })
});
