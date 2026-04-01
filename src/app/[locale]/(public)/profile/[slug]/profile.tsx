'use client'

import { useMemo } from 'react'
import { Link, useRouter, usePathname } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAccountMe, useGetProfile } from '@/queries/useAccount'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import Image from 'next/image'
import { useElementListQuery, useManageElementListQuery } from '@/queries/useElement'
import { SkeletonElement } from '@/components/ui/skeletonElement'
import Element from '@/components/element'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAppStore } from '@/components/app-provider'

interface Props {
  id: number
}
export default function Profile({ id }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const isAuth = useAppStore((state) => state.isAuth)
  const accountMe = useAccountMe(isAuth)
  const account = accountMe.data?.payload

  const profileQuery = useGetProfile({ id, enabled: Boolean(id) })
  const profile = profileQuery.data?.payload
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 100)
  const sortBy = (searchParams.get('sortBy') as 'randomized' | 'favorites' | 'recent') || 'randomized'

  const orderBy = (searchParams.get('orderBy') as 'asc' | 'desc') || 'desc'

  const theme = ['DARK', 'LIGHT', 'ALL'].includes(searchParams.get('theme') || '')
    ? (searchParams.get('theme') as 'DARK' | 'LIGHT' | 'ALL')
    : 'ALL'
      const status = ['APPROVED', 'REVIEW', 'REJECTED', 'DRAFT'].includes(searchParams.get('status') || '')
        ? (searchParams.get('status') as 'APPROVED' | 'REVIEW' | 'REJECTED' | 'DRAFT')
        : 'APPROVED'
  const t = searchParams.get('t') || undefined
  const paramss = useMemo(
    () => ({
      page,
      limit,
      sortBy,
      orderBy,
      theme: theme === 'ALL' ? undefined : theme,
      status,
      t
    }),
    [page, limit, sortBy, orderBy, theme, status, t]
  )
    const updateQueryParams = (
      updates: Record<string, string | null | undefined>,
      options?: { resetPage?: boolean }
    ) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '' || value === 'ALL') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })
      if (options?.resetPage) {
        params.set('page', '1')
      }
      router.replace(`${pathname}?${params.toString()}`)
    }
  const isOwner = !!account?.id && !!profile?.id && account.id === profile.id
  const elementListQuery = useElementListQuery(paramss, {
    enabled: !isOwner
  })

  const manageElementListQuery = useManageElementListQuery(paramss, {
    enabled: isOwner
  })

  const query = isOwner ? manageElementListQuery : elementListQuery
  const elementList = query.data?.payload?.data ?? []
  const currentPage = Number(page) || 1
  const totalPages = query.data?.payload?.totalPages || 1
  const totalItems = query.data?.payload?.totalItems || 0
  
  return (
    <div className='w-full min-w-0 z-10'>
      <main className='min-h-screen pt-7 pb-24 max-[700px]:pt-0'>
        <section className='relative group'>
          <div className='flex justify-between text-base items-center mb-2 flex-wrap'>
            <button
              onClick={() => router.back()}
              className='inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-10 px-4 py-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                className='h-4 w-4'
              >
                <path d='M8.83 6a30.23 30.23 0 0 0-5.62 5.406A.949.949 0 0 0 3 12m5.83 6a30.233 30.233 0 0 1-5.62-5.406A.949.949 0 0 1 3 12m0 0h18' />
              </svg>{' '}
              Go back
            </button>
            <div className='flex gap-4 items-center flex-wrap gap-y-1'>
              <div className='whitespace-nowrap'>0 posts</div>
              <div className='flex items-center gap-1.5 whitespace-nowrap'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-4 h-4 text-gray-400'
                  strokeWidth={2}
                >
                  <path d='M3 14c0-2.188 2.7-7 9-7s9 4.813 9 7m-6 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                </svg>{' '}
                0
              </div>
              <div className='flex items-center gap-1.5 whitespace-nowrap'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  className='w-4 h-4 text-indigo-400'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862ZM4.10784 14.7235V9.2763C4.10784 8.20928 4.6955 7.21559 5.64066 6.68166L10.4676 3.95848C10.9398 3.69152 11.4701 3.55804 11.9996 3.55804C12.5291 3.55804 13.0594 3.69152 13.5324 3.95848L18.3593 6.68166C19.3045 7.21476 19.8922 8.20928 19.8922 9.2763V9.75997C19.1426 9.60836 18.377 9.53091 17.6022 9.53091C14.7929 9.53091 12.1041 10.5501 10.0309 12.3999C8.36735 13.8847 7.21142 15.8012 6.68783 17.9081L5.63981 17.3165C4.69466 16.7834 4.10699 15.7897 4.10699 14.7235H4.10784ZM10.4676 20.0413L8.60933 18.9924C8.94996 17.0479 9.94402 15.2665 11.4515 13.921C13.1353 12.4181 15.3198 11.5908 17.6022 11.5908C18.3804 11.5908 19.1477 11.6864 19.8922 11.8742V14.7235C19.8922 15.2278 19.7589 15.7254 19.5119 16.1662C18.7615 15.3596 17.6806 14.8528 16.4783 14.8528C14.2136 14.8528 12.3781 16.6466 12.3781 18.8598C12.3781 19.3937 12.4861 19.9021 12.68 20.3676C11.9347 20.5316 11.1396 20.4203 10.4684 20.0413H10.4676Z'
                    fill='currentColor'
                  />
                </svg>
                0
              </div>
            </div>
          </div>
          <div className='relative w-full h-[200px]  rounded-2xl overflow-hidden'>
            <div className='w-full h-full bg-gradient-to-b from-neutral-800 to-neutral-700' />
            <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 z-10'>
              <button className='inline-flex items-center gap-2 justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md h-8 px-3'>
                Customize
              </button>
            </div>
          </div>
          <div className='mx-4 md:mx-16 -mt-[90px] relative z-10 flex gap-16 justify-between items-start max-md:flex-wrap'>
            <div>
              <div className='flex gap-8 flex-col md:flex-row'>
                <span className='relative flex shrink-0 overflow-hidden bg-black w-44 h-44 rounded-2xl ring-4 ring-neutral-800'>
                  <Avatar className='aspect-square h-full w-full m-0'>
                    <AvatarImage src={profile?.avatar ?? undefined} alt={profile?.name} />
                    <AvatarFallback>{profile?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </span>
                <div className='md:mt-[110px]'>
                  <h1 className='relative flex items-center gap-3 text-3xl font-semibold font-display whitespace-nowrap'>
                    {profile?.name}
                  </h1>
                  <div className='flex gap-3 items-center mt-1'>
                    <h2 className='text-base font-normal text-gray-400 username'>{profile?.email}</h2>
                    <div className='flex items-center gap-1' />
                  </div>
                </div>
              </div>
              <div className='w-full mt-5'>
                <div className='font-normal max-w-[633px] leading-6' />
                <div className='flex gap-3 items-center mt-5'>
                  <Link
                    href='#'
                    className='inline-flex items-center gap-2 justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3'
                    data-discover='true'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' viewBox='0 0 24 24'>
                      <path
                        fill='currentColor'
                        d='M8.68735 4.00008L11.294 1.39348C11.6845 1.00295 12.3176 1.00295 12.7082 1.39348L15.3148 4.00008H19.0011C19.5533 4.00008 20.0011 4.4478 20.0011 5.00008V8.68637L22.6077 11.293C22.9982 11.6835 22.9982 12.3167 22.6077 12.7072L20.0011 15.3138V19.0001C20.0011 19.5524 19.5533 20.0001 19.0011 20.0001H15.3148L12.7082 22.6067C12.3176 22.9972 11.6845 22.9972 11.294 22.6067L8.68735 20.0001H5.00106C4.44877 20.0001 4.00106 19.5524 4.00106 19.0001V15.3138L1.39446 12.7072C1.00393 12.3167 1.00393 11.6835 1.39446 11.293L4.00106 8.68637V5.00008C4.00106 4.4478 4.44877 4.00008 5.00106 4.00008H8.68735ZM6.00106 6.00008V9.5148L3.51578 12.0001L6.00106 14.4854V18.0001H9.51578L12.0011 20.4854L14.4863 18.0001H18.0011V14.4854L20.4863 12.0001L18.0011 9.5148V6.00008H14.4863L12.0011 3.5148L9.51578 6.00008H6.00106ZM12.0011 16.0001C9.79192 16.0001 8.00106 14.2092 8.00106 12.0001C8.00106 9.79094 9.79192 8.00008 12.0011 8.00008C14.2102 8.00008 16.0011 9.79094 16.0011 12.0001C16.0011 14.2092 14.2102 16.0001 12.0011 16.0001ZM12.0011 14.0001C13.1056 14.0001 14.0011 13.1047 14.0011 12.0001C14.0011 10.8955 13.1056 10.0001 12.0011 10.0001C10.8965 10.0001 10.0011 10.8955 10.0011 12.0001C10.0011 13.1047 10.8965 14.0001 12.0011 14.0001Z'
                      />
                    </svg>{' '}
                    Settings
                  </Link>
                </div>
              </div>
            </div>
            <div className='mt-[120px] max-md:mt-0'>
              <div className='flex flex-wrap gap-5 justify-end max-md:justify-start' />
            </div>
          </div>
        </section>
        <div className='mt-10 mb-3'>
          <div className='flex-wrap justify-between hidden gap-1 sm:flex'>
            <Tabs
              value={status}
              onValueChange={(value: string) => {
                updateQueryParams({
                  status: value
                })
              }}
            >
              <TabsList>
                <TabsTrigger value='APPROVED'>Elements</TabsTrigger>
                {account?.id === profile?.id && (
                  <>
                    {/* <TabsTrigger value='variations'>Variations</TabsTrigger> */}
                    <TabsTrigger value='REVIEW'>Review</TabsTrigger>
                    <TabsTrigger value='REJECTED'>Rejected</TabsTrigger>
                    <TabsTrigger value='DRAFT'>Drafts</TabsTrigger>
                  </>
                )}
              </TabsList>
            </Tabs>
            <div className='flex flex-wrap items-center gap-1 gap-y-2 '>
              <RainbowButton onClick={() => router.push('/create')}>
                Create
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                >
                  <path d='M12 19v-7m0 0V5m0 7H5m7 0h7' />
                </svg>
              </RainbowButton>
              <div className='h-[30px] w-[2px] bg-neutral-800 mx-1 hidden lg:block' />
              <div className='items-center hidden gap-1 text-sm lg:flex'>
                <div
                  className={cn(
                    t === 'all' && 'bg-neutral-800',
                    'flex items-center cursor-pointer py-2 px-2.5 font-semibold gap-2 hover:bg-neutral-800 rounded-lg text-gray-200'
                  )}
                  onClick={() =>
                    updateQueryParams({
                      t: ''
                    })
                  }
                >
                  All
                </div>
                <div
                  className={cn(
                    t === 'tailwind' && 'bg-neutral-800',
                    'flex items-center cursor-pointer py-2 px-2.5 font-semibold gap-2 hover:bg-neutral-800 rounded-lg text-gray-200'
                  )}
                  onClick={() =>
                    updateQueryParams({
                      t: 'tailwind'
                    })
                  }
                >
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 54 33' className='h-5 w-5 mr-1'>
                    <g clipPath='url(#prefix__clip0)'>
                      <path
                        fill='#38bdf8'
                        fillRule='evenodd'
                        d='M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z'
                        clipRule='evenodd'
                      />
                    </g>
                    <defs>
                      <clipPath id='prefix__clip0'>
                        <path fill='#fff' d='M0 0h54v32.4H0z' />
                      </clipPath>
                    </defs>
                  </svg>{' '}
                  Tailwind
                </div>
                <div
                  className={cn(
                    t === 'css' && 'bg-neutral-800',
                    'flex items-center cursor-pointer py-2 px-2.5 font-semibold gap-2 hover:bg-neutral-800 rounded-lg text-gray-200'
                  )}
                  onClick={() =>
                    updateQueryParams({
                      t: 'css'
                    })
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width={24}
                    height={24}
                    className='text-blue-600 w-5 h-5'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.85l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21L21.94 3z'
                    />
                  </svg>{' '}
                  CSS
                </div>
              </div>
              <div className='h-[30px] w-[2px] bg-neutral-800 mx-1 hidden lg:block' />
              <Select
                value={orderBy}
                onValueChange={(value: string) => {
                  updateQueryParams({
                    orderBy: value
                    // page: '1'
                  })
                }}
              >
                <SelectTrigger className='w-auto justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-800 px-4 py-2 h-10 flex items-center gap-2 capitalize'>
                  <SelectValue>
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        className='h-4 w-4 mr-2'
                      >
                        <path d='M20 4H4v2.586a1 1 0 0 0 .293.707l5.414 5.414a1 1 0 0 1 .293.707V18l4 3v-7.586a1 1 0 0 1 .293-.707l5.414-5.414A1 1 0 0 0 20 6.586V4Z' />
                      </svg>
                      Sort: {orderBy || 'Randomized'}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='randomized'>Randomized</SelectItem>
                  <SelectItem value='favorites'>Favorites</SelectItem>
                  <SelectItem value='recent'>Recent</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={theme}
                onValueChange={(value: string) => {
                  updateQueryParams({
                    theme: value
                  })
                }}
              >
                <SelectTrigger className='w-auto justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-800 px-4 py-2 h-10 flex items-center gap-2 capitalize'>
                  <SelectValue>
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width={24}
                        height={24}
                        className='h-4 w-4 mr-2'
                      >
                        <path fill='none' d='M0 0h24v24H0z' />
                        <path
                          fill='currentColor'
                          d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-2V6a6 6 0 1 1 0 12z'
                        />
                      </svg>
                      Theme: {theme || 'All'}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='light'>Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <section className='grid gap-y-5 gap-x-3.5 content-stretch items-stretch w-full mb-24 max-xs:grid-cols-1 max-xs:gap-2.5 [grid-template-columns:repeat(auto-fill,minmax(294px,1fr))]'>
          {elementListQuery.isLoading ? (
            <SkeletonElement total={12} />
          ) : elementList.length > 0 ? (
            <>
              {elementList.map((element) => (
                <Element element={element} key={element.id} />
              ))}
            </>
          ) : (
            'khong tim thay'
          )}
        </section>
        <div className='relative mt-[10px] rounded-xl overflow-hidden border-2 border-neutral-700/80 '>
          <div className='relative flex items-center justify-center flex-col text-center h-full px-8 py-16 md:px-24'>
            <div className='relative w-32 h-32 mb-8'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-full h-full text-neutral-500'
              >
                <path
                  d='M9.33333 19.7435C7.75238 20.0082 6.15473 20.0683 4.58027 19.9226C4.44521 19.9101 4.32574 19.8519 4.23691 19.7631C4.14808 19.6743 4.08989 19.5548 4.0774 19.4197C3.93174 17.8453 3.99179 16.2476 4.25652 14.6667M14.6667 19.7435C16.2476 20.0082 17.8453 20.0683 19.4197 19.9226C19.5548 19.9101 19.6743 19.8519 19.7631 19.7631C19.8519 19.6743 19.9101 19.5548 19.9226 19.4197C20.0683 17.8453 20.0082 16.2476 19.7435 14.6667M4.25652 9.33333C3.99179 7.75238 3.93174 6.15473 4.0774 4.58027C4.08989 4.44521 4.14808 4.32574 4.23691 4.23691C4.32574 4.14808 4.44521 4.08989 4.58027 4.0774C6.15473 3.93174 7.75238 3.99179 9.33333 4.25652M14.6667 4.25652C16.2476 3.99179 17.8453 3.93174 19.4197 4.0774C19.5548 4.08989 19.6743 4.14808 19.7631 4.23691C19.8519 4.32574 19.9101 4.44521 19.9226 4.58027C20.0683 6.15473 20.0082 7.75238 19.7435 9.33333'
                  stroke='currentColor'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h2 className='font-display text-xl font-semibold mb-4 text-gray-100'>No Public Posts Yet</h2>
            <p className='text-gray-400 mb-8 max-w-lg'>
              Looks like you havent made any posts yet. Dont worry, just click the Create button and let the universe
              know youre out there.
            </p>
            <Link
              href='#'
              className='inline-flex items-center gap-2 justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-tl from-indigo-500 to-fuchsia-500 text-white h-11 rounded-md px-8 inline-flex items-center gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
              >
                <path d='M12 19v-7m0 0V5m0 7H5m7 0h7' />
              </svg>
              Create
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
