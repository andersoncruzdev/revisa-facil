const getIndex = <T extends { id: number }>(
  data: T[],
  id: number,
): number | undefined => {
  const index = data.findIndex((item) => item.id === id);

  return index >= 0 ? index : undefined;
};

const getByParam = <T, K extends keyof T>(
  data: T[],
  key: K,
  value: T[K],
): T | undefined => {
  return data.find((item) => item[key] === value);
};

const getNextId = <T extends { id: number }>(data: T[]): number => {
  if (data.length === 0) return 1;

  return Math.max(...data.map((item) => item.id)) + 1;
};

export const utils = {
  index: getIndex,
  param: getByParam,
  nextId: getNextId,
};