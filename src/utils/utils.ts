export const generateRandom = (min: number, max: number, notSame: number[] = []) => {
  let result;
  do {
    result = Number.parseInt((Math.random() * max + min) as any, 10);
  } while (notSame.indexOf(result) >= 0);

  return result;
};

export const generateRandomLetter = (notSame: string[] = []) => {
  let result: string;
  const chars = 'абвгдеёжзиклмнопрстуфхцчшщьыъэюя';
  do {
    result = chars.substr( Math.floor(Math.random() * chars.length), 1);
  } while (notSame.filter((word) => word === result).length !== 0);

  return result;
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export const shuffle = (a: any[]) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
