import http from '@/lib/http'
import { CreateCommentBodyType, CreateCommentResType, GetCommentsType, UpdateCommentBodyType, UpdateCommentResType } from '@/schemaValidations/comment.schema'
import { PaginationQueryType } from '@/schemaValidations/request.schema'
import queryString from 'query-string'

const prefix = '/comments'
const commentApiRequest = {
    list: (elementId: number, pagination: PaginationQueryType) => {
        const query = queryString.stringify(pagination, {
            skipNull: true,
            skipEmptyString: true,
        })
        return http.get<GetCommentsType>(`${prefix}/elements/${elementId}?${query}`, {
            next: { tags: ['listcomments'] }
        })
    },
    listById: (commentId: number, pagination: PaginationQueryType) => {
        const query = queryString.stringify(pagination, {
            skipNull: true,
            skipEmptyString: true,
        })
        return http.get<GetCommentsType>(`${prefix}/${commentId}?${query}`, {
            next: { tags: ['replies'] }
        })
    },
    create: (body: CreateCommentBodyType) => http.post<CreateCommentResType>(`${prefix}`, body),
    update: (commentId: number, body: UpdateCommentBodyType) => http.put<CreateCommentResType>(`${prefix}/${commentId}`, body),
    delete: (commentId: number) => http.delete<UpdateCommentResType>(`${prefix}/${commentId}`)
}

export default commentApiRequest
