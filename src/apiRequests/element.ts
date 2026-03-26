import { ElementStatusType } from '@/constants/type'
import http from '@/lib/http'
import { GetElementCodeDetailResType } from '@/schemaValidations/element-code.schema'
import {
  CreateElementBodyType,
  ElementListResType,
  ElementResType,
  UpdateElementBodyType,
  ElementCodeResType,
  UpdateManageElementBodyType,
  GetElementsQueryType,
  GetManageElementsQueryType,
  GetElementDetailResType
} from '@/schemaValidations/element.schema'
// import { GetElementsQueryParamsType } from '@/schemaValidations/order.schema'
import queryString from 'query-string'

const elementApiRequest = {
  // list: (queryParams: GetElementsQueryType) => http.get<ElementListResType>('/elements?'+
  //         queryString.stringify({
  //           page: queryParams.page,
  //           limit: queryParams.limit,
  //           // languageId: I18nContext.current()?.lang as string,
  //           // status: ElementAndProductStatus.APPROVED,
  //           brandIds: queryParams.brandIds,
  //           categories: queryParams.categories,
  //           title: queryParams.title,
  //           createdById: queryParams.createdById,
  //           orderBy: queryParams.orderBy,
  //           sortBy: queryParams.sortBy,
  //           theme: queryParams.theme,
  //           t: queryParams.t,
  //         }, {
  //           skipNull: true,
  //           skipEmptyString: true
  //           arrayFormat: 'comma' --> brandIds=1,2
  //         }), { next: { tags: ['elements'] } }),
  list: (queryParams: GetElementsQueryType) => {
    const query = queryString.stringify(queryParams, {
      skipNull: true,
      skipEmptyString: true,
      // arrayFormat: 'comma'-- > brandIds=1,2
    })
    return http.get<ElementListResType>(`/elements?${query}`, {
      next: { tags: ['elements'] }
    })
  },
  listManage: (queryParams: GetManageElementsQueryType) => {
    const query = queryString.stringify(queryParams, {
      skipNull: true,
      skipEmptyString: true,
    })
    return http.get<ElementListResType>(`/manage-element/elements?${query}`, {
      next: { tags: ['manageElements'] }
    })
  },
  // listManage: (queryParams: GetManageElementsQueryType) => http.get<ElementListResType>('/manage-element/elements?' +
  //   queryString.stringify({
  //     page: queryParams.page,
  //     limit: queryParams.limit,
  //     orderBy: queryParams.orderBy,
  //     theme: queryParams.theme,
  //     search: queryParams.search,
  //     t: queryParams.t,
  //   }, {
  //     skipNull: true,
  //     skipEmptyString: true
  //   }), { next: { tags: ['manageElements'] } }),
  add: (body: CreateElementBodyType) => http.post<GetElementDetailResType>('/manage-element/elements', body),
  getElement: (id: number) => http.get<GetElementDetailResType>(`/elements/${id}`),
  getManagElement: (id: number) => http.get<GetElementDetailResType>(`/manage-element/elements/${id}`),
  getElementCode: (id: number) => http.get<GetElementCodeDetailResType>(`/element-codes/${id}`),
  updateElement: (id: number, body: UpdateElementBodyType) => http.put<GetElementDetailResType>(`/elements/${id}`, body),
  updateStatus: (id: number, body: ElementStatusType) => http.put<GetElementDetailResType>(`/manage-element/elements/${id}/status`, body),
  updateManageElement: (id: number, body: UpdateManageElementBodyType) => http.put<GetElementDetailResType>(`/manage-element/elements/${id}`, body),
  deleteElement: (id: number) => http.delete<ElementResType>(`/elements/${id}`)
}

export default elementApiRequest
