export const removeEmptyProperties = <T>(object: T) => {
  Object.keys(object).forEach(
    key => object[key] === undefined && delete object[key],
  );
};
