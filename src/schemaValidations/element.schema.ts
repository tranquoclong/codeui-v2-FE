import { ElementStatusValues, ThemeElement, OrderBy,OrderElementBy,ThemeElementStatusValues, ElementStatus } from '@/constants/type'
import z from 'zod'
import { AccountSchema } from './account.schema'
import { BrandSchema } from './brand.schema'
import { CategorySchema } from './category.schema'
import { ElementTranslationSchema } from './element-translation.schema'
import { ElementCodeSchema } from './element-code.schema'
import { UserSchema } from './user.schema'

export const ElementSchema = z.object({
  id: z.number(),
  publishedAt: z.iso.datetime().nullable(),
  title: z.string().trim().max(100),
  description: z.string().trim().max(500),
  brandId: z.number().positive(),
  status: z.enum(ElementStatusValues),
  theme: z.enum(ThemeElementStatusValues).nullable(),
  isTailwind: z.boolean().nullable(),
  backgroundColor: z.string().nullable(),
  elementOriginalId: z.number().nullable(),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const GetElementsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  title: z.string().optional(),
  brandIds: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        return [Number(value)]
      }
      return value
    }, z.array(z.coerce.number().int().positive()))
    .optional(),
  categories: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        return [Number(value)]
      }
      return value
    }, z.array(z.coerce.number().int().positive()))
    .optional(),
  createdById: z.coerce.number().int().positive().optional(),
  sortBy: z.enum([OrderElementBy.Randomized, OrderElementBy.Favorites, OrderElementBy.Recent]).default(OrderElementBy.Recent),
  orderBy: z.enum([OrderBy.Asc, OrderBy.Desc]).default(OrderBy.Desc),
  theme: z.enum(ThemeElementStatusValues).optional(),
  t: z.boolean().optional(),
})

export const GetManageElementsQuerySchema = GetElementsQuerySchema.extend({
  status: z.enum(ElementStatusValues).optional(),
})

export const GetElementDetailResSchema = ElementSchema.extend({
  elementTranslations: z.array(ElementTranslationSchema),
  categories: z.array(CategorySchema),
  brand: BrandSchema,
  elementCode: ElementCodeSchema,
  createdBy: UserSchema.pick({
    name: true,
    email: true,
    avatar: true,
  }),
})


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


export const UpdateManageElementBody = CreateElementBody.omit({
  brandId: true,
  elementOriginalId: true,
  isTailwind: true,
}).extend({
  status: z.enum([ElementStatus.DRAFT, ElementStatus.REVIEW, ElementStatus.APPROVED, ElementStatus.REJECTED]),
  html: z.string().optional(),
  css: z.string().optional(),
})

export type CreateElementBodyType = z.TypeOf<typeof CreateElementBody>

// export const ElementSchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   description: z.string(),
//   backgroundColor: z.string(),
//   isTailwind: z.boolean(),
//   brandId: z.number(),
//   brand: z.object({ name: z.string() }),
//   elementCode: z.object({ html: z.string(), css: z.string() }),
//   elementOriginalId: z.number().nullable(),
//   createdById: z.number().nullable(),
//   status: z.enum(ElementStatusValues),
//   theme: z.enum(ThemeElementStatusValues),
//   createdAt: z.date(),
//   updatedAt: z.date()
// })

const elementStatusSchema = z.union([
  z.literal(ElementStatus.APPROVED),
  z.literal(ElementStatus.DRAFT),
  z.literal(ElementStatus.REVIEW),
  z.literal(ElementStatus.REJECTED),
])
export type ElementStatus = z.infer<typeof elementStatusSchema>

export const ElementRes = ElementSchema.extend({
  createdBy: AccountSchema.pick({
    name: true,
  }),
})

export const ElementListRes = z.object({
  data: z.array(
    ElementSchema.extend({
      createdBy: AccountSchema.pick({
        name: true,
      }),
    }),
  ),
  limit: z.number(),
  page: z.number(),
  totalItems: z.number(),
  totalPages: z.number()
})

export const ElementCodeRes = z.object({
  elementId: z.number(),
  html: z.string(),
  css: z.string()
})


export const UpdateElementBody = CreateElementBody
export type UpdateElementBodyType = CreateElementBodyType
export type UpdateManageElementBodyType = z.TypeOf<typeof UpdateManageElementBody>
export const ElementParams = z.object({
  id: z.coerce.number()
})
export type ElementParamsType = z.TypeOf<typeof ElementParams>

// export type ElementType = z.TypeOf<typeof ElementSchema>
// export type ElementResType = z.TypeOf<typeof ElementSchema>
export type ElementResType = z.TypeOf<typeof ElementRes>
export type ElementType = z.infer<typeof ElementSchema>
export type GetElementsQueryType = z.infer<typeof GetElementsQuerySchema>
export type GetManageElementsQueryType = z.infer<typeof GetManageElementsQuerySchema>
export type GetElementDetailResType = z.infer<typeof GetElementDetailResSchema>
export type ElementCodeResType = z.TypeOf<typeof ElementCodeRes>
export type ElementListResType = z.TypeOf<typeof ElementListRes>