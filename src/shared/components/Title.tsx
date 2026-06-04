type TitleType = "h1" | "h2";

const titleClassByType: Record<TitleType, string> = {
  h1: "text-3xl font-bold tracking-normal text-slate-950 md:text-4xl",
  h2: "text-2xl font-semibold tracking-normal text-slate-900 md:text-3xl",
};

interface TitleProps {
  readonly subTitle: string;
  readonly title: string;
  readonly typeTitle: TitleType;
}

export default function Title({ subTitle, title, typeTitle }: TitleProps) {
  const TitleTag = typeTitle;

  return (
    <section
      aria-label={`Apresentação da seção ${title}`}
      className="flex flex-col gap-2"
    >
      <TitleTag className={titleClassByType[typeTitle]}>{title}</TitleTag>
      <p className="max-w-2xl text-base leading-7 text-slate-600">
        {subTitle}
      </p>
    </section>
  );
}
