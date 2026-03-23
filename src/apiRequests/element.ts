import http from '@/lib/http'
import {
  CreateElementBodyType,
  ElementListResType,
  ElementResType,
  UpdateElementBodyType,
  ElementCodeResType,
  UpdateManageElementBodyType
} from '@/schemaValidations/element.schema'
import { GetElementsQueryParamsType } from '@/schemaValidations/order.schema'
import queryString from 'query-string'

const elementApiRequest = {
  list: (queryParams: GetElementsQueryParamsType) => http.get<ElementListResType>('/elements?'+
          queryString.stringify({
            page: queryParams.page,
            limit: queryParams.limit,
            orderBy: queryParams.orderBy,
            theme: queryParams.theme,
            search: queryParams.search,
            t: queryParams.t,
          }, {
            skipNull: true,
            skipEmptyString: true
          }), { next: { tags: ['elements'] } }),
  listManage: (queryParams: GetElementsQueryParamsType) => http.get<ElementListResType>('/manage-element/elements?' +
    queryString.stringify({
      page: queryParams.page,
      limit: queryParams.limit,
      orderBy: queryParams.orderBy,
      theme: queryParams.theme,
      search: queryParams.search,
      t: queryParams.t,
    }, {
      skipNull: true,
      skipEmptyString: true
    }), { next: { tags: ['manageElements'] } }),
  add: (body: CreateElementBodyType) => http.post<ElementResType>('/manage-element/elements', body),
  getElement: (id: number) => http.get<ElementResType>(`/elements/${id}`),
  getManagElement: (id: number) => http.get<ElementResType>(`/manage-element/elements/${id}`),
  getElementCode: (id: number) => http.get<ElementCodeResType>(`/element-codes/${id}`),
  updateElement: (id: number, body: UpdateElementBodyType) => http.put<ElementResType>(`/elements/${id}`, body),
  updateManageElement: (id: number, body: UpdateManageElementBodyType) => http.put<ElementResType>(`/manage-element/elements/${id}`, body),
  deleteElement: (id: number) => http.delete<ElementResType>(`/elements/${id}`)
}

export default elementApiRequest
