'use client'

import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import Element from '@/components/element'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { useSearchParams, useParams } from 'next/navigation'
import { useElementListQuery } from '@/queries/useElement'
import ElementFilter from './element-filter'
import ElementNav from './element-nav'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState(searchParams.get('search') || '')
    // const page = searchParams.get('page') || '1'
    // const limit = searchParams.get('limit') || '12'
    // const orderBy = searchParams.get('orderBy') || 'randomized'
    // const theme = searchParams.get('theme') || 'all'
    // const t = searchParams.get('t') || 'all'
const page = Number(searchParams.get('page') || 1)
const limit = Number(searchParams.get('limit') || 12)

const sortBy = (searchParams.get('sortBy') as 'randomized' | 'favorites' | 'recent') || 'randomized'

const orderBy = (searchParams.get('orderBy') as 'asc' | 'desc') || 'desc'

const theme = ['DARK', 'LIGHT'].includes(searchParams.get('theme') || '')
  ? (searchParams.get('theme') as 'DARK' | 'LIGHT')
  : undefined
const tParam = searchParams.get('t')
const t = tParam === 'tailwind' ? true : tParam === 'css' ? false : undefined
  const paramss = useMemo(
    () => ({
      page,
      limit,
      sortBy,
      orderBy,
      theme,
      t
    }),
    [page, limit, sortBy, orderBy, theme, t]
  )
const createPageURL = useCallback(
  (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    if (search) params.set('search', search)
    return `${pathname}?${params.toString()}`
  },
  [searchParams, pathname, search]
)
  const elementListQuery = useElementListQuery(paramss)
  const refetchElementList = elementListQuery.refetch
  const isFetching = elementListQuery.isFetching
  const elementList = elementListQuery.data?.payload?.data ?? []
  const currentPage = Number(page) || 1
  const totalPages = elementListQuery.data?.payload?.totalPages || 1
  const totalItems = elementListQuery.data?.payload?.totalItems || 0
  return (
    <div className="px-5 py-0 data-[path='/']:px-0 root-container relative flex">
      <ElementNav />
      <div className='w-full min-w-0 z-10'>
        <main className='w-full'>
          <ElementFilter sortBy={sortBy} theme={theme} t={t} search={search} setSearch={setSearch} />
          <section className='grid gap-y-5 gap-x-3.5 content-stretch items-stretch w-full mb-24 max-xs:grid-cols-1 max-xs:gap-2.5 [grid-template-columns:repeat(auto-fill,minmax(294px,1fr))]'>
            {elementList.map((element) => (
              <Element element={element} key={element.id} />
            ))}
            <div className='grid col-span-full gap-3.5 grid-cols-2'>
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    router.push(createPageURL(currentPage - 1))
                  }
                }}
                disabled={isFetching || currentPage <= 1}
                className={`flex items-center justify-start p-5 bg-[#252525] rounded-lg text-[20px] font-semibold text-lg button--left max-[600px]:p-3.5 max-[600px]:text-[16px] max-[450px]:p-2.5 max-[450px]:text-[14px] transition-all ${
                  currentPage <= 1
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:text-white hover:bg-[#333]'
                }`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  className='w-6 h-6 text-inherit mr-5 max-[600px]:w-7 max-[600px]:h-7 max-[600px]:mr-2.5 max-[450px]:w-5 max-[450px]:h-5'
                >
                  <path d='M8.83 6a30.23 30.23 0 0 0-5.62 5.406A.949.949 0 0 0 3 12m5.83 6a30.233 30.233 0 0 1-5.62-5.406A.949.949 0 0 1 3 12m0 0h18' />
                </svg>
                Previous page
              </button>
              <button
                onClick={() => {
                  if (currentPage < totalPages) {
                    router.push(createPageURL(currentPage + 1))
                  }
                }}
                disabled={isFetching || currentPage >= totalPages}
                className={`flex items-center justify-end p-5 bg-[#252525] rounded-lg text-[20px] font-semibold text-lg button--right col-start-2 max-[600px]:p-3.5 max-[600px]:text-[16px] max-[450px]:p-2.5 max-[450px]:text-[14px] transition-all ${
                  currentPage >= totalPages
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:text-white hover:bg-[#333]'
                }`}
              >
                Next page
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='w-6 h-6 text-inherit mr-0 ml-5 max-[600px]:ml-2.5'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                >
                  <path d='M15.17 6a30.23 30.23 0 0 1 5.62 5.406c.14.174.21.384.21.594m-5.83 6a30.232 30.232 0 0 0 5.62-5.406A.949.949 0 0 0 21 12m0 0H3' />
                </svg>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
