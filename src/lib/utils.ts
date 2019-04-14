export function isPromise<T = any>(obj: any): obj is Promise<T> {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

export function toNumber(value: string | number) {
  return typeof value === 'number' ? value : parseFloat(value);
}

export function warn(message: string) {
  console.warn(`[vue-infinite] ${message}`);
}

export function error(message: string) {
  return new Error(`[vue-infinite] ${message}`);
}
