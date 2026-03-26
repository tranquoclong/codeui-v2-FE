import { z } from 'zod'

export const ElementCodeSchema = z.object({
    id: z.number(),
    elementId: z.number(),
    html: z.string(),
    css: z.string().nullable(),

    deletedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
})

export const GetElementCodeParamsSchema = z.object({
    elementId: z.coerce.number().int().positive(),
})
export const GetElementCodeDetailResSchema = ElementCodeSchema

export const CreateElementCodeBodySchema = ElementCodeSchema.pick({
    elementId: true,
    html: true,
    css: true,
}).strict()

export const UpdateElementCodeBodySchema = CreateElementCodeBodySchema

export const DeleteElementCodeParamsSchema = GetElementCodeParamsSchema

export type ElementCodeType = z.infer<typeof ElementCodeSchema>
export type GetElementCodeParamsType = z.infer<typeof GetElementCodeParamsSchema>
export type GetElementCodeDetailResType = z.infer<typeof GetElementCodeDetailResSchema>
export type CreateElementCodeBodyType = z.infer<typeof CreateElementCodeBodySchema>
export type UpdateElementCodeBodyType = z.infer<typeof UpdateElementCodeBodySchema>
export type DeleteElementCodeParamsType = z.infer<typeof DeleteElementCodeParamsSchema>
