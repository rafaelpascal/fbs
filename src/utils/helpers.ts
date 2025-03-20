import clsx, { ClassArray } from "clsx";
import { twMerge } from "tailwind-merge";
import { PasswordRulesKeys } from "~/components/constants/general";
import { validatePassword } from "./packages/validators";

export function cn(...inputs: ClassArray) {
  return twMerge(clsx(inputs));
}

interface CreateAvatarUrlArgs {
  /** Can be the user's name or the imgSrc. */
  avatarUrl: string;
  /** @see https://ui-avatars.com/ for additional properties. */
  additionalParams?: Record<string, string | number>;
}

export const createAvatarUrl = (args: CreateAvatarUrlArgs) => {
  const { avatarUrl: url, additionalParams } = args;

  if (url.includes("http")) return url;

  const params = new URLSearchParams();
  params.append("name", url);
  params.append("size", "256");

  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      params.append(key, String(value));
    });
  }

  return `https://ui-avatars.com/api.jpg?${params.toString()}`;
};

export function statusColorCode(statusText: string): BadgeStatus {
  const positives = [
    "completed",
    "verified",
    "successful",
    "approved",
    "active",
  ];
  const negatives = ["reject", "late", "archieved"];
  const cautions = ["not verified", "not active", "pending"];
  const others = ["permanent"];

  const text = statusText.toLowerCase();
  if (positives.includes(text)) return "positive";
  else if (negatives.includes(text)) return "negative";
  else if (cautions.includes(text)) return "caution";
  else if (others.includes(text)) return "perma";
  else return "neutral";
}

export function statColorCode(statText: string): StatusText {
  const positives = [
    "completed",
    "approved",
    "on time",
    "activated",
    "successful",
    "confirmed",
    "true",
  ];
  const negatives = [
    "reject",
    "deactivated",
    "late",
    "failed",
    "cancelled",
    "rejected",
    "false",
  ];
  const cautions = ["in process", "pending"];
  const others = ["permanent", "processing"];

  const text = statText.toLowerCase();
  if (positives.includes(text)) return "successful";
  else if (negatives.includes(text)) return "failed";
  else if (cautions.includes(text)) return "pending";
  else if (others.includes(text)) return "processing";
  else return "neutral";
}

export const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const maskEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  const domainParts = domain.split(".");
  const visiblePart = localPart.slice(0, 3);
  const maskedPart = localPart.slice(3).replace(/./g, "*");
  const maskedLocalPart = visiblePart + maskedPart;
  const maskedDomain = `${domainParts[0]}.${domainParts.slice(1).join(".")}`;
  return `${maskedLocalPart}@${maskedDomain}`;
};

export const maskPhoneNumber = (phone: string) => {
  return phone.replace(/^(\d{3})\d+(\d{2})$/, "$1*****$2");
};

export const maskPhone = (phone: string) => {
  const maskedPhone = `${phone.slice(0, 5)}****${phone.slice(-4)}`;
  return maskedPhone;
};

/**
 * Joins multiple class names into a single string without spaces.
 *
 * @param {...ClassArray} inputs - A variable number of class name arguments, which can be strings or arrays of strings.
 * @returns {string} A single string of class names with all spaces removed.
 *
 * @example
 * // Returns "class1class2class3"
 * joinString('class1', 'class2', 'class3');
 *
 * @example
 * // Returns "class1class2"
 * joinString(['class1', 'class2']);
 */
export const joinString = (...inputs: ClassArray) => {
  return clsx(inputs).replace(/ /g, ""); // Use clsx to combine class names, then remove spaces.
};

/**
 * Description placeholder
 *
 * @param {string} password
 * @returns {{ hasUppercase: boolean; hasNumber: boolean; has8Chars: boolean; hasSpecialChar: boolean; }}
 */
export const checkPasswordStrength = (
  password: string
): {
  [PasswordRulesKeys.hasLowercase]: boolean;
  [PasswordRulesKeys.hasUppercase]: boolean;
  [PasswordRulesKeys.hasNumber]: boolean;
  [PasswordRulesKeys.has8Chars]: boolean;
  [PasswordRulesKeys.hasSpecialChar]: boolean;
} => {
  return {
    [PasswordRulesKeys.hasLowercase]: /(?=.*[a-z])/.test(password),
    [PasswordRulesKeys.hasUppercase]: /(?=.*[A-Z])/.test(password),
    [PasswordRulesKeys.hasNumber]: /(?=.*\d)/.test(password),
    [PasswordRulesKeys.has8Chars]: /^.{6,}$/.test(password),
    [PasswordRulesKeys.hasSpecialChar]: /[^a-zA-Z0-9]/.test(password),
  };
};

/**
 * Description placeholder
 *
 * @param {?string} [password]
 * @returns {*}
 */
export const isValidPassword = (password?: string): boolean =>
  validatePassword.safeParse(password).success;

export function formatToCurrency(amount: any, currency: "NGN" | "USD" = "NGN") {
  const locale = currency === "USD" ? "en-US" : "en-NG";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

// export function splitArray<T>(arr: T[]): T[][] {
//   const breakPoints = [2, 9]; // Break points at indices 5 and 9
//   const result = [];
//   let start = 0;

//   for (const breakPoint of breakPoints) {
//     if (start < arr.length) {
//       result.push(arr.slice(start, breakPoint));
//       start = breakPoint;
//     }
//   }

//   if (start < arr.length) {
//     result.push(arr.slice(start)); // Add remaining items
//   }

//   return result;
// }

// export function splitArray<T>(arr: T[]): T[][] {
//   const result: T[][] = [];
//   let start = 0;
//   const pattern = [4, 1]; // Pattern of chunk sizes: 4, 1, repeat

//   while (start < arr.length) {
//     for (const chunkSize of pattern) {
//       if (start < arr.length) {
//         result.push(arr.slice(start, start + chunkSize));
//         start += chunkSize;
//       } else {
//         break;
//       }
//     }
//   }

//   return result;
// }

export function splitArray<T>(arr: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  let start = 0;

  while (start < arr.length) {
    result.push(arr.slice(start, start + chunkSize));
    start += chunkSize;
  }

  return result;
}
