import http from '@/lib/http'
import { GetUsersQueryType, GetUsersResType } from '@/schemaValidations/user.schema'
import queryString from 'query-string'

const prefix = '/users'
const accountApiRequest = {
    list: (queryParams: GetUsersQueryType) => {
        const query = queryString.stringify(queryParams, {
            skipNull: true,
            skipEmptyString: true,
        })
        return http.get<GetUsersResType>(`${prefix}?${query}`, {
            next: { tags: ['user'] }
        })
    },
}

export default accountApiRequest
