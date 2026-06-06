const validDate = (
  date: Date,
  day: number,
  month: number,
  year: number,
): boolean => {
  return (
    !Number.isNaN(date.getTime()) &&
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
};

const stringForDate = (date: string): Date | null => {
  const [day, month, year] = date.split("/").map(Number);

  if (!day || !month || !year) {
    return null;
  }

  const dateObj = new Date(year, month - 1, day);

  const isValid = validDate(dateObj, day, month, year);

  return isValid ? dateObj : null;
};


const diffInDays = (
  dateToday: Date,
  dateRevision: string,
): number | null => {
  const revisionDate = stringForDate(dateRevision);

  if (!revisionDate) {
    return null;
  }

  const today = new Date(
    dateToday.getFullYear(),
    dateToday.getMonth(),
    dateToday.getDate(),
  );

  const revision = new Date(
    revisionDate.getFullYear(),
    revisionDate.getMonth(),
    revisionDate.getDate(),
  );

  const milliseconds = revision.getTime() - today.getTime();

  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round(milliseconds / oneDay);
};

export const actionsDate = {
  string: stringForDate,
  diffInDays,
};