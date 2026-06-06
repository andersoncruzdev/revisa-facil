import { render, screen } from "@testing-library/react";
import Title from "@shared/components/Title";

describe("Testes de verificação do 'Title'", () => {
  it.each([
    {
      expectedClass: "text-3xl",
      level: 1,
      title: "Suas revisões de Hoje",
      typeTitle: "h1" as const,
    },
    {
      expectedClass: "text-2xl",
      level: 2,
      title: "Próximas revisões",
      typeTitle: "h2" as const,
    },
  ])(
    "renderiza o título como $typeTitle",
    ({ expectedClass, level, title, typeTitle }) => {
      render(
        <Title
          typeTitle={typeTitle}
          title={title}
          subTitle="Acompanhe seu plano de revisão"
        />,
      );

      const heading = screen.getByRole("heading", { level, name: title });

      expect(heading.tagName).toBe(typeTitle.toUpperCase());
      expect(heading).toHaveClass(expectedClass);
    },
  );

  it("renderiza o subtítulo e identifica a seção pelo título", () => {
    render(
      <Title
        typeTitle="h1"
        title="Histórico"
        subTitle="Veja as revisões já concluídas"
      />,
    );

    expect(
      screen.getByLabelText("Apresentação da seção Histórico"),
    ).toBeInTheDocument();
    expect(screen.getByText("Veja as revisões já concluídas")).toHaveClass(
      "text-slate-600",
    );
  });
});
