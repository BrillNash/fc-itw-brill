import { z } from 'zod'

export const createShiftSchema = z.object({
  workerId: z.string().uuid({ message: "Invalid worker ID" }),
  start: z.string().datetime({ message: "Invalid ISO datetime format for start" }),
  end: z.string().datetime({ message: "Invalid ISO datetime format for end" }),
})

export const updateShiftSchema = z.object({
  shiftId: z.string().uuid({ message: "Invalid shift ID" }),
  workerId: z.string().uuid({ message: "Invalid worker ID" }),
  updates: z.object({
    start: z.string().datetime({ message: "Invalid ISO datetime format for start" }),
    end: z.string().datetime({ message: "Invalid ISO datetime format for end" }),
  })
})

export const deleteShiftSchema = z.object({
  shiftId: z.string().uuid({ message: "Invalid shift ID" }),
  workerId: z.string().uuid({ message: "Invalid worker ID" }),
})

export type CreateShiftDTO = z.infer<typeof createShiftSchema>
export type UpdateShiftInput = z.infer<typeof updateShiftSchema>
export type DeleteShiftInput = z.infer<typeof deleteShiftSchema>
