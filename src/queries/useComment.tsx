import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { CreateCommentBodyType, UpdateCommentBodyType } from '@/schemaValidations/comment.schema'
import commentApiRequest from '@/apiRequests/comment'
import { PaginationQueryType } from '@/schemaValidations/request.schema'

export const useCommentListQuery = (elementId: number, limit: number) => {
  return useInfiniteQuery({
    queryKey: queryKeys.comments.lists(elementId, { limit }),
    queryFn: ({ pageParam = 1 }) => commentApiRequest.list(elementId, { page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload
      return page < totalPages ? page + 1 : undefined
    },
    initialPageParam: 1
  })
}

export const useReplyListQuery = (commentId: number, limit: number) => {
  return useInfiniteQuery({
    queryKey: queryKeys.comments.replies(commentId, { limit }),
    queryFn: ({ pageParam = 1 }) => commentApiRequest.listById(commentId, { page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload
      return page < totalPages ? page + 1 : undefined
    },
    initialPageParam: 1
  })
}

export const useAddCommentMutation = (pagination: PaginationQueryType) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateCommentBodyType) => commentApiRequest.create(body),
    onSuccess: (_, variables) => {
      // const { elementId, replyCommentId } = variables
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.all
      })
      // if (replyCommentId) {
      //   queryClient.invalidateQueries({
      //     queryKey: queryKeys.comments.replies(replyCommentId, pagination)
      //   })
      // }
    }
  })
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateCommentBodyType & { id: number }) => commentApiRequest.update(id, body),
    onSuccess: (updatedComment, { id }) => {
      queryClient.setQueryData(queryKeys.comments.detail(id), updatedComment)
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.all,
        predicate: (query) =>
          query.queryKey[0] === 'comments' && (query.queryKey[1] === 'lists' || query.queryKey[1] === 'replies')
      })
    }
  })
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: number) => commentApiRequest.delete(commentId),
    onSuccess: (_, commentId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.all
      })
    }
  })
}
