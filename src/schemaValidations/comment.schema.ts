import { UserSchema } from './user.schema'
import { z } from 'zod'

export const CommentSchema = z.object({
    id: z.number().int(),
    content: z.string(),
    votes: z.number().int(),
    userId: z.number().int(),
    elementId: z.number().int(),
    replyCommentId: z.number().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
})

export const CreateCommentBodySchema = CommentSchema.pick({
    content: true,
    elementId: true,
    replyCommentId: true,
}).extend({
    replyCommentId: z.number().int().positive().nullable().optional(),
}).strict()

export const CreateCommentResSchema = CommentSchema.extend({
    user: UserSchema.pick({
        id: true,
        name: true,
        avatar: true,
    }),
})

export const UpdateCommentResSchema = CreateCommentResSchema

export const GetCommentsSchema = z.object({
    data: z.array(CreateCommentResSchema),
    totalItems: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
})

export const UpdateCommentBodySchema = CreateCommentBodySchema.pick({ content: true })

export const GetCommentsParamsSchema = z.object({
    elementId: z.coerce.number().int().positive(),
})

export const GetCommentDetailParamsSchema = z.object({
    commentId: z.coerce.number().int().positive(),
})

export type CommentType = z.infer<typeof CommentSchema>
export type CreateCommentBodyType = z.infer<typeof CreateCommentBodySchema>
export type UpdateCommentBodyType = z.infer<typeof UpdateCommentBodySchema>
export type CreateCommentResType = z.infer<typeof CreateCommentResSchema>
export type UpdateCommentResType = z.infer<typeof UpdateCommentResSchema>
export type GetCommentsType = z.infer<typeof GetCommentsSchema>
