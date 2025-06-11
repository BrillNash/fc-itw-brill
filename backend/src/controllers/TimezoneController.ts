import { Request, Response } from 'express'
import { getTimezone, setTimezone } from '../services/Timezone'
import { timezoneSchema } from '../schemas/timezoneSchema'
import { TimezoneError } from '../errors/timezoneError'

export const getTimezoneHandler = (_request: Request, response: Response) => {
  response.json({ timezone: getTimezone() })
}

export const setTimezoneHandler = (request: Request, response: Response) => {
  const validatedBody = timezoneSchema.safeParse(request.body);
  
  if (!validatedBody.success) {
    throw new TimezoneError({
      error: validatedBody.error.flatten(),
      message: "Validation failed",
      status: 400,
    });
  }

  const { timezone } = validatedBody.data;

  setTimezone(timezone);

  response.status(200).json({ message: 'Timezone updated', timezone: getTimezone() });
}
