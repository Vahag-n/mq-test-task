export type OrderType = "asc" | "desc";

export const sortByKey = <T extends Record<string, string | number>>(
  array: T[],
  key: keyof T,
  ordering: OrderType = "asc"
): T[] => {
  const sortedArray = [...array];

  const compare = (a: T, b: T) => {
    const x = a[key];
    const y = b[key];

    if (typeof x === "string" && typeof y === "string") {
      const orderConf = {
        asc: x.localeCompare(y),
        desc: y.localeCompare(x),
      };

      return orderConf[ordering];
    }

    const orderConf = {
      asc: (x as number) - (y as number),
      desc: (y as number) - (x as number),
    };

    return orderConf[ordering];
  };

  sortedArray.sort(compare);

  return sortedArray;
};
