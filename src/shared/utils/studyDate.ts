import type { StudyDate } from "@types-app/study";

export function toDate(date: StudyDate) {
  if (date instanceof Date) {
    return date;
  }

  const [year, month, day] = date.slice(0, 10).split("-").map(Number);

  if (year && month && day) {
    return new Date(year, month - 1, day);
  }

  return new Date(date);
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getDaysLate(nextReview: StudyDate) {
  const today = startOfDay(new Date());
  const reviewDate = startOfDay(toDate(nextReview));
  const diffInMs = today.getTime() - reviewDate.getTime();
  const diffInDays = Math.floor(diffInMs / 86_400_000);

  return Math.max(diffInDays, 0);
}
