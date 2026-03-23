import { ElementStatusValues, ThemeElement, ThemeElementStatusValues, ElementStatus } from '@/constants/type'
import z from 'zod'

export const CreateElementBody = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().max(500),
  brandId: z.number().positive(),
  // backgroundColor: z.string().nullable(),
  html: z.string(),
  css: z.string().optional(),
  isTailwind: z.boolean().optional(),
  theme: z.enum([ThemeElement.DARK, ThemeElement.LIGHT]).optional(),
  categories: z.array(z.coerce.number().int().positive()),
  elementOriginalId: z.coerce.number().int().positive().optional(),
  status: z.enum([ElementStatus.DRAFT, ElementStatus.REVIEW]),
})

export type CreateElementBodyType = z.TypeOf<typeof CreateElementBody>

export const ElementSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  backgroundColor: z.string(),
  isTailwind: z.boolean(),
  brandId: z.number(),
  brand: z.object({ name: z.string() }),
  elementCode: z.object({ html: z.string(), css: z.string() }),
  elementOriginalId: z.number().nullable(),
  status: z.enum(ElementStatusValues),
  theme: z.enum(ThemeElementStatusValues),
  createdAt: z.date(),
  updatedAt: z.date()
})

const elementStatusSchema = z.union([
  z.literal(ElementStatus.APPROVED),
  z.literal(ElementStatus.DRAFT),
  z.literal(ElementStatus.REVIEW),
  z.literal(ElementStatus.REJECTED),
])
export type ElementStatus = z.infer<typeof elementStatusSchema>

export const ElementRes = z.object({
  data: ElementSchema,
  message: z.string()
})

export const ElementListRes = z.object({
  data: ElementSchema.array(),
  limit: z.number(),
  page: z.number(),
  totalItems: z.number(),
  totalPages: z.number()
})


export type ElementResType = z.TypeOf<typeof ElementSchema>

export const ElementCodeRes = z.object({
  elementId: z.number(),
  html: z.string(),
  css: z.string()
})

export type ElementCodeResType = z.TypeOf<typeof ElementCodeRes>

export type ElementListResType = z.TypeOf<typeof ElementListRes>

export const UpdateElementBody = CreateElementBody
export type UpdateElementBodyType = CreateElementBodyType
export const ElementParams = z.object({
  id: z.coerce.number()
})
export type ElementParamsType = z.TypeOf<typeof ElementParams>

export type ElementType = z.TypeOf<typeof ElementSchema>
