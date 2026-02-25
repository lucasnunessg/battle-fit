export type APIResponse<T = null> = {
  message: string;
  data?: T;
};
