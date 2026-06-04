export function formatDateBR(date: Date | string) {
  if (typeof date === "string") {
    const [year, month, day] = date.slice(0, 10).split("-").map(Number);

    if (year && month && day) {
      return new Intl.DateTimeFormat("pt-BR").format(
        new Date(year, month - 1, day)
      );
    }

    return date;
  }

  return new Intl.DateTimeFormat("pt-BR").format(date);
}