export const groupBy = <T>(list: T[], keyGetter: (prop: T) => string): {[key: string]: T[]} => {
  const map: {[key: string]: T[]} = {};
  list.forEach((item: T) => {
    const key = keyGetter(item);
    const collection = map[key];
    if (!collection) {
      map[key] = [item];
    } else {
      collection.push(item);
    }
  });
  return map;
};
