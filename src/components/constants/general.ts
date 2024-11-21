export const AUTH_STORE_KEY = "dgrep";

export const PAGE_SIZE = 100;

export enum MFA_TYPES {
  APP = "app",
  SMS = "sms",
  EMAIL = "email",
}

export enum USER_TYPES {
  Admin = "adminUser",
  Merchant = "merchantUser",
}

export const USER_TYPES_OPTION = [
  { value: USER_TYPES.Admin, label: "Admin" },
  { value: USER_TYPES.Merchant, label: "Merchant" },
];

export enum LOCAL_STORAGE_KEYS {
  USER_TOKEN = "@USER_TOKEN",
  BIOPAY_KEY = "@BIOPAY",
  APP_USER = "@APP_USER",
  RESET_PASSWORD = "@RESET_PASSWORD",
}

export const ONE_SECOND_IN_MS = 1000;
export const ONE_MINUTE_IN_MS = ONE_SECOND_IN_MS * 60;
export const ONE_MINUTE_IN_SECONDS = 60;
export const TRANSACTION_MODE = "test";

export enum PasswordRulesKeys {
  hasLowercase = "hasLowercase",
  hasUppercase = "hasUppercase",
  hasNumber = "hasNumber",
  has8Chars = "has8Chars",
  hasSpecialChar = "hasSpecialChar",
}
