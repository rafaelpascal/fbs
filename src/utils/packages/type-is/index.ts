import { isValidElement } from "react";

export class TypeIs {
  static string = (str: unknown): str is string => typeof str === "string";
  static any = (value: unknown) => value as ANY;

  /**
 *@example
 *```ts
console.log(Object.prototype.toString.call({}) = '[object Object]');
console.log(Object.prototype.toString.call([]) = '[object Array]');
console.log(Object.prototype.toString.call(null) = '[object Null]');
 *```
 * @see {@link https://bobbyhadz.com/blog/javascript-check-if-value-is-object}
 * 
 */
  static object = (value: unknown): value is object =>
    Object.prototype.toString.call(value) === "[object Object]";

  static array = (value: unknown) => Array.isArray(value);

  static number = (value: unknown): value is number =>
    typeof value === "number";

  static reactNode = (node?: unknown): node is React.ReactNode =>
    isValidElement<ANY>(node);

  static stringOrNumber = (value: unknown): value is string | number =>
    this.string(value) || this.number(value);

  static custom<T>(value?: unknown) {
    return value as T;
  }

  static safe = <T>(value: IsUncertain<T>) => value as T;
}

export const Utils = {
  safeArray<T>(array?: T[]) {
    return array ?? [];
  },
};
