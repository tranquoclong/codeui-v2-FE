'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter, usePathname } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import { useAppStore } from '@/components/app-provider'

interface Props {
  sortBy: string
  theme: 'DARK' | 'LIGHT' | 'ALL'
  t: string | undefined
  search: string
  setSearch: (value: string) => void
}
export default function ElementFilter({ sortBy, theme, t, search, setSearch }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const isAuth = useAppStore((state) => state.isAuth)
  const updateQueryParams = (updates: Record<string, string | null | undefined>, options?: { resetPage?: boolean }) => {
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
  return (
    <div className='pt-3.5 pb-2.5 z-60 relative justify-between items-end flex-wrap'>
      <div className='w-full'>
        <div className='items-center justify-between hidden gap-2 filters max-lg:items-end lg:flex'>
          {/* <div className='text-gray-400 page text-sm whitespace-nowrap'>First page</div> */}
          <RainbowButton onClick={() => router.push(isAuth ? '/create' : '/login')}>
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
          <div className='flex items-center justify-end flex-wrap gap-1 gap-y-2 w-full'>
            <div className='h-[30px] w-[2px] bg-neutral-800 mx-1 hidden lg:block' />
            <div className='items-center hidden gap-1 text-sm lg:flex'>
              <div
                className={cn(
                  t === undefined && 'bg-neutral-800',
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
              value={sortBy}
              onValueChange={(value: string) => {
                updateQueryParams({
                  sortBy: value
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
                    Sort: {sortBy || 'Randomized'}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ALL'>Randomized</SelectItem>
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
                <SelectItem value='ALL'>All</SelectItem>
                <SelectItem value='DARK'>Dark</SelectItem>
                <SelectItem value='LIGHT'>Light</SelectItem>
              </SelectContent>
            </Select>
            <form
              className='flex ml-2 items-center relative max-w-[250px] w-full'
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                updateQueryParams({ search })
              }}
            >
              <svg
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2'
              >
                <path
                  d='M21 21L14.9497 14.9497M14.9497 14.9497C16.2165 13.683 17 11.933 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C11.933 17 13.683 16.2165 14.9497 14.9497Z'
                  stroke='currentColor'
                  strokeWidth={2}
                />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search tags, users, posts...'
                className='flex h-9 w-full rounded-md border-2 border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-10 pl-4 bg-neutral-800 border-none text-offwhite placeholder:text-gray-400 placeholder:text-sm focus:ring-indigo-500/80 focus:ring-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
