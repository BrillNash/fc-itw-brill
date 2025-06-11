import { z } from 'zod';

export const workerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export type WorkerDTO = z.infer<typeof workerSchema>;
