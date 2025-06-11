
import { z } from 'zod'
import { IANAZone } from 'luxon'

export const timezoneSchema = z.object({
  timezone: z.string().refine(
    (tz) => IANAZone.isValidZone(tz),
    { message: "Invalid IANA timezone string" }
  )
});

export type TimezoneDTO = z.infer<typeof timezoneSchema>
