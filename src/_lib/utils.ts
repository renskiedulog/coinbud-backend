export type ResponsePayload<T = any> = {
  status: number;
  data?: T;
  error?: string;
};

export function createResponse<T>(options: {
  status: number;
  data?: T;
  error?: string;
}): ResponsePayload<T> {
  return {
    status: options.status,
    ...(options.data !== undefined ? { data: options.data } : {}),
    ...(options.error !== undefined ? { error: options.error } : {}),
  };
}
