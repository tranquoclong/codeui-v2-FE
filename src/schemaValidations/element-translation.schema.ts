import { z } from 'zod'

export const ElementTranslationSchema = z.object({
    id: z.number(),
    elementId: z.number(),
    title: z.string().max(100),
    description: z.string().max(500),
    languageId: z.string(),

    createdById: z.number().nullable(),
    updatedById: z.number().nullable(),
    deletedById: z.number().nullable(),
    deletedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
})

export type ElementTranslationType = z.infer<typeof ElementTranslationSchema>
