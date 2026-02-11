export interface IResponse<T = unknown> {
  error: boolean;
  statusCode: number;
  data?: T;
  message: string;
}

export interface IJwtPayload {
  id: string;
  role: string;
}
