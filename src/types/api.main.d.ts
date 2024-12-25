type APIResponse<Type> = {
  user: any;
  message: string;
  statusCode: string;
  mfaTypes: string[];
  data: { [key: string]: Type };
};
