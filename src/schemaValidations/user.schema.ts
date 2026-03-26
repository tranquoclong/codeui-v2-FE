import { OrderBy, SortUserBy, UserStatus } from '@/constants/type'
import { z } from 'zod'
import { RoleSchema } from './role.schema'

export const UserSchema = z.object({
    id: z.number(),
    email: z.email(),
    name: z.string().min(1).max(100),
    password: z.string().min(6).max(100),
    phoneNumber: z.string().min(9).max(15),
    avatar: z.string().nullable(),
    totpSecret: z.string().nullable(),
    status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BLOCKED]),
    roleId: z.number().positive(),
    createdById: z.number().nullable(),
    updatedById: z.number().nullable(),
    deletedById: z.number().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    deletedAt: z.iso.datetime().nullable(),
})

export const GetUsersResSchema = z.object({
    data: z.array(
        UserSchema.omit({ password: true, totpSecret: true }).extend({
            role: RoleSchema.pick({
                id: true,
                name: true,
            }),
            approvedCount: z.number(),
        }),
    ),
    totalItems: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
})

export const GetUsersQuerySchema = z
    .object({
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().default(10),
        sortBy: z.enum([SortUserBy.Elements]).optional(),
        orderBy: z.enum([OrderBy.Asc, OrderBy.Desc]).optional(),
    }).refine(
        (data) => {
            if (data.sortBy && !data.orderBy) return false
            return true
        },
        {
            message: 'orderBy is required when sortBy is provided',
            path: ['orderBy'],
        }
    )
    .strict()

export const GetUserParamsSchema = z
    .object({
        userId: z.coerce.number().int().positive(),
    })
    .strict()

export const CreateUserBodySchema = UserSchema.pick({
    email: true,
    name: true,
    phoneNumber: true,
    avatar: true,
    status: true,
    password: true,
    roleId: true,
}).strict()

export const UpdateUserBodySchema = CreateUserBodySchema

export type GetUsersResType = z.infer<typeof GetUsersResSchema>
export type GetUsersQueryType = z.infer<typeof GetUsersQuerySchema>
export type GetUserParamsType = z.infer<typeof GetUserParamsSchema>
export type CreateUserBodyType = z.infer<typeof CreateUserBodySchema>
export type UpdateUserBodyType = z.infer<typeof UpdateUserBodySchema>