import type { SMError } from "@/types/error"
import {
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  BadRequestError,
  ForbiddenError,
  PreconditionFailedError,
  TooManyRequestsError,
  ServiceUnavailableError,
  InternalServerError,
  ErrorResponseDataSchema,
  type ErrorResponseData,
} from "@/types/error"

interface ErrorResponse {
  status: number
  error: Error
  data: {
    status: number
    timestamp: string
    errorCode: string
    message: string
    path: string
  }
}

export const useErrorBuilder = (err: unknown) => {
  const e = err as Error & Partial<ErrorResponseData>

  if (e && e.status) {
    throwByStatus({
      status: e.status,
      error: e,
      data: {
        timestamp: e.timestamp ?? new Date().toISOString(),
        status: e.status,
        errorCode: e.errorCode ?? 'UNKNOWN_ERROR',
        message: e.message,
        path: e.path ?? '',
      }
    })
  }

  throw new Error(String(err))
}


const throwByStatus = (response: {
  status: number
  error: Error
  data: ErrorResponseData
}) => {
  switch (response.status) {
    case 400: throw new BadRequestError(response.data)
    case 401: throw new UnauthorizedError(response.data)
    case 403: throw new ForbiddenError(response.data)
    case 404: throw new NotFoundError(response.data)
    case 409: throw new ConflictError(response.data)
    case 412: throw new PreconditionFailedError(response.data)
    case 429: throw new TooManyRequestsError(response.data)
    case 500: throw new InternalServerError(response.data)
    case 503: throw new ServiceUnavailableError(response.data)
    default: throw response.error
  }
}