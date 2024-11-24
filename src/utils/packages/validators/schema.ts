import { z } from "zod";
import {
  invalidEmailErrorMessage,
  invalidErrorMessage,
  noNumberErrorMessage,
  requiredErrorMessage,
  upperLimitErrorMessage,
} from "./error-message";

const numberRegex = new RegExp(/\d/);

// import { formatNumWithoutCommaNaira } from "../../format-utils";

export const genericStringSchema = (
  fieldName: string,
  lowerLimit?: number,
  upperLimit?: number,
  disAllowNumbers?: boolean
) =>
  z
    .string({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    })
    .trim()
    .max(upperLimit || 200, {
      message: upperLimitErrorMessage(fieldName, upperLimit || 200),
    })
    .min(lowerLimit || 1, {
      message: `${fieldName} cannot be blank`,
    })
    .refine(
      (arg: string) => {
        return disAllowNumbers ? !arg.match(numberRegex) : true;
      },
      { message: noNumberErrorMessage(fieldName) }
    );

export const stringNumberSchema = (fieldName: string) =>
  z
    .string({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    })
    .refine(
      (arg: string) => {
        if (!Number(arg)) return false;
        return true;
      },
      {
        message: invalidErrorMessage(fieldName),
      }
    )
    .refine((arg) => Number(arg) > 0, {
      message: invalidErrorMessage(fieldName),
    });

export const emailSchema = (fieldName: string) =>
  z
    .string({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    })
    .email(invalidEmailErrorMessage(fieldName));
