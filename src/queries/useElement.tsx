import elementApiRequest from '@/apiRequests/element'
import { GetElementsQueryType, GetManageElementsQueryType, UpdateElementBodyType, UpdateManageElementBodyType } from '@/schemaValidations/element.schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
// import { GetElementsQueryParamsType } from '@/schemaValidations/order.schema'

export const useElementListQuery = (queryParams: GetElementsQueryType) => {
  return useQuery({
    queryFn: () => elementApiRequest.list(queryParams),
    queryKey: queryKeys.elements.list(queryParams)
  })
}

export const useManageElementListQuery = (queryParams: GetManageElementsQueryType) => {
  return useQuery({
    queryFn: () => elementApiRequest.listManage(queryParams),
    queryKey: queryKeys.elements.listManage(queryParams)
  })
}

// export const useElementsInfiniteQuery = (params: GetElementsQueryParamsType) => {
//   return useInfiniteQuery({
//     queryKey: ['elements', params],
//     queryFn: ({ pageParam = 1 }) =>
//       elementApiRequest.getElementList({
//         ...params,
//         page: pageParam,
//         limit: 12
//       }),

//     getNextPageParam: (lastPage) => lastPage.payload.nextPage ?? undefined,

//     initialPageParam: 1,
//     staleTime: 1000 * 60 * 5
//   })
// }

export const useGetElementQuery = ({ id, enabled }: { id: number; enabled: boolean }) => {
  return useQuery({
    queryKey: queryKeys.elements.detail(id),
    queryFn: () => elementApiRequest.getElement(id),
    enabled
  })
}

export const useGetManageElementQuery = ({ id, enabled }: { id: number; enabled: boolean }) => {
  return useQuery({
    queryKey: queryKeys.elements.detailManage(id),
    queryFn: () => elementApiRequest.getManagElement(id),
    enabled
  })
}

export const useGetElementCodeQuery = ({ id, enabled }: { id: number; enabled: boolean }) => {
  return useQuery({
    queryKey: queryKeys.elements.code(id),
    queryFn: () => elementApiRequest.getElementCode(id),
    enabled
  })
}

export const useAddElementMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: elementApiRequest.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.elements.all
      })
    }
  })
}

export const useUpdateElementMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...body }: UpdateElementBodyType & { id: number }) => elementApiRequest.updateElement(id, body),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.elements.detail(variables.id), data)

      queryClient.invalidateQueries({
        queryKey: queryKeys.elements.all,
        predicate: (query) => query.queryKey.length === 1
      })
    }
  })
}

export const useUpdateManageElementMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...body }: UpdateManageElementBodyType & { id: number }) =>
      elementApiRequest.updateManageElement(id, body),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.elements.detailManage(variables.id), data)
      queryClient.invalidateQueries({
        queryKey: queryKeys.elements.allManage,
        exact: true
      })
    }
  })
}

export const useDeleteElementMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: elementApiRequest.deleteElement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.elements.all
      })
    }
  })
}
