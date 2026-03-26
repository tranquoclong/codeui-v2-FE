import { z } from 'zod'

export const PaginationQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
})

export const ListRequestSchema = PaginationQuerySchema

export const EmptyBodySchema = z.object({}).strict()

export type EmptyBodyType = z.infer<typeof EmptyBodySchema>
export type PaginationQueryType = z.infer<typeof PaginationQuerySchema>
