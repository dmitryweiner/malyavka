export const generateRandom = (min: number, max: number, notSame: number[]) => {
  let result;
  do {
    result = Number.parseInt((Math.random() * max + min) as any, 10);
  } while (notSame.indexOf(result) >= 0);

  return result;
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export const shuffle = (a: number[]) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
