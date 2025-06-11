export interface ErrorData {
  message: string;
  error?: object;
  status: number;
}

export class BaseAppError extends Error {
  status: number;
  error?: object;

  constructor(data: ErrorData) {
    super(data.message);
    this.name = this.constructor.name;
    this.status = data.status;
    this.error = data.error;

    (Error as any).captureStackTrace(this, this.constructor);
  }
}
