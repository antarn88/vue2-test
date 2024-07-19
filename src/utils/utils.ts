export function makeReactive(obj: any, key: any, callback: any) {
  let value = obj[key];

  Object.defineProperty(obj, key, {
    get() {
      return value;
    },

    set(newValue) {
      value = newValue;
      callback(newValue);
    },
  });

  return value;
}
