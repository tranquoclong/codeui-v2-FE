import { z } from 'zod'

export const BrandSchema = z.object({
    id: z.number(),
    name: z.string().max(500),
    logo: z.url().max(1000),

    createdById: z.number().nullable(),
    updatedById: z.number().nullable(),
    deletedById: z.number().nullable(),
    deletedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
})

export const BrandListRes = z.object({
  data: z.array(
      BrandSchema
  ),
  limit: z.number(),
  page: z.number(),
  totalItems: z.number(),
  totalPages: z.number()
})

export const CreateBrandBody = z.object({
  name: z.string().min(1).max(256),
    logo: z.string(),
})

export type CreateBrandBodyType = z.TypeOf<typeof CreateBrandBody>


export const BrandRes = BrandSchema

export type BrandResType = z.TypeOf<typeof BrandRes>

export const UpdateBrandBody = CreateBrandBody
export type UpdateBrandBodyType = CreateBrandBodyType
export const BrandParams = z.object({
  id: z.coerce.number()
})
export type BrandParamsType = z.TypeOf<typeof BrandParams>


export type BrandListResType = z.TypeOf<typeof BrandListRes>
