function deepClone(source, map = new WeakMap()) {
  // 非对象类型或者值为null时
  if (typeof source !== "object" || source === null) {
    return source;
  }

  // 日期 Date类型
  if (source instanceof Date) {
    return new Date(source);
  }

  // RegExp正则类型
  if (source instanceof RegExp) {
    return new RegExp(source);
  }

  // 存在相互引用的话
  if (map.get(source)) {
    return map.get(source);
  }

  let result;

  map.set(source, result);

  // 数组
  if (Array.isArray(source)) {
    result = [];

    source.forEach((item) => result.push(deepClone(item, map)));

    return result;
  } else {
    result = {};

    const keys = [
      ...Object.getOwnPropertyNames(source),
      ...getOwnPropertySymbols(source),
    ];

    keys.forEach((key) => (result[key] = deepClone(source[key], map)));
  }

  return result;
}
