export const invalidErrorMessage = (fieldName: string) => {
  return `${fieldName} is invalid`;
};

export const requiredErrorMessage = (fieldName: string) => {
  return `${fieldName} is required`;
};

export const invalidEmailErrorMessage = (fieldName: string) => {
  return `${fieldName} must be a valid email`;
};

export const upperLimitErrorMessage = (fieldName: string, limit: number) => {
  return `${fieldName} should not be more than ${limit} characters`;
};

export const noNumberErrorMessage = (fieldName: string) => {
  return `${fieldName} cannot contain numbers`;
};

export const mfarequiredErrorMessage = (fieldName: string) => {
  return `${fieldName} is required.`;
};
export const mfainvalidErrorMessage = (fieldName: string) => {
  return `${fieldName} must be a number between 1 and 6.`;
};
