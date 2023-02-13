export interface IDictionary<TValue> {
  [id: string]: TValue
}

export type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T
