// Chatgpt came up with this
type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${R}`
  : S;

// And this too
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? ReplaceAll<`${L}${To}${R}`, From, To>
  : S;

type IsUncertain<Type> = Type | null | undefined;

type IsUndefined<Type> = Type | undefined;
