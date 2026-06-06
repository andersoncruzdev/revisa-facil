import { utils } from "@utils/utils";

const dataMock = [
  { id: 2, name: "nameMock2", amountQuantity: 1, color: "colorMock" },
  { id: 1, name: "nameMock1", amountQuantity: 1, color: "colorMock" },
];

describe("Data: utils", () => {
  it("deve retornar o index corretamente ao receber o id", () => {
    const index = utils.index(dataMock, 1);
    expect(index).toBe(1);
  });

  it("deve retornar undefined se não achar o index pelo id", () => {
    const index = utils.index(dataMock, 3);
    expect(index).toBe(undefined);
  });

  it("deve retornar o dado ao rereceber um parâmetro se existir", () => {
    const data = utils.param(dataMock, "name", "nameMock2");
    expect(data).toEqual(dataMock[0]);
  });

  it("deve retornar undenied ao não achar pelo parâmetro", () => {
    const data = utils.param(dataMock, "color", "fff");
    expect(data).toEqual(undefined);
  });

  it("ao criar um novo item, o próximo id dever o máximo +1", () => {
    const newData = {
      id: utils.nextId(dataMock),
      name: "nameMock3",
      amountQuantity: 1,
      color: "colorMock3",
    };
    expect(newData).toEqual({ ...newData, id: 3 });
  });
});
