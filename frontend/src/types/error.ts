import { z } from "zod"

const ErrorResponseDataSchema = z.object({
  timestamp: z.string(),
  status: z.number(),
  errorCode: z.string(),
  message: z.string(),
  path: z.string(),
})
type ErrorResponseData = z.infer<typeof ErrorResponseDataSchema>

class SMError extends Error {
  public readonly timestamp: string
  public readonly status: number
  public readonly errorCode: string
  public readonly path: string

  constructor(public data: ErrorResponseData) {
    super(data.message)
    this.timestamp = data.timestamp
    this.status = data.status
    this.errorCode = data.errorCode
    this.path = data.path
  }
}

class NotFoundError extends SMError {}
class ConflictError extends SMError {}
class UnauthorizedError extends SMError {}
class BadRequestError extends SMError {}
class ForbiddenError extends SMError {}
class PreconditionFailedError extends SMError {}
class TooManyRequestsError extends SMError {}
class ServiceUnavailableError extends SMError {}
class InternalServerError extends SMError {}

export {
  type ErrorResponseData,
  ErrorResponseDataSchema,
  SMError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  BadRequestError,
  ForbiddenError,
  PreconditionFailedError,
  TooManyRequestsError,
  ServiceUnavailableError,
  InternalServerError,
}