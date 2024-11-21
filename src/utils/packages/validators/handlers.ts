import { FieldValues, FormState } from "react-hook-form";
import { ZodType } from "zod";

export type ZodExtension = ZodType<Record<string | number, unknown>>;

export const reactHookHandler = <T extends FieldValues>(
  formState: FormState<T>
) => {
  const unWrapErrors = (key: keyof T) => {
    return formState.errors[key]?.message;
  };

  const assertError = (key: keyof T): boolean => {
    return Boolean(formState.errors[key]?.message);
  };

  return { unWrapErrors, assertError };
};

export type ValidationError<T extends ZodExtension> = Partial<
  Record<keyof T["_output"], string>
>;
