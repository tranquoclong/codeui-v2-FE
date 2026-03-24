'use client'

import { Link } from '@/i18n/routing'
import CodePreview from './codePreview'
import { useGetElementCodeQuery } from '@/queries/useElement'
import { ElementType } from '@/schemaValidations/element.schema'

type Props = {
  showInfor?: boolean
  element: ElementType
}
const Element = ({ element, showInfor = true }: Props) => {
  const elementCodeQuery = useGetElementCodeQuery({ id: element.id, enabled: Boolean(element.id) })
  const elementCode = elementCodeQuery.data?.payload ?? { html: '', css: '' }
  return (
    <article
      className='transition-opacity duration-300 relative overflow-hidden text-[var(--maindark)] rounded-lg dark-background z-10 flex h-full flex-col text-black'
      style={{ opacity: 1, willChange: 'auto', transform: 'none' }}
    >
      {elementCode ? (
        <>
          <div className='group relative overflow-hidden h-[250px] bg-[var(--dark)] rounded-lg min-h-[420px] grow'>
            {element.isTailwind && (
              <div className='absolute left-3 top-3 z-10 flex items-center gap-2'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 54 33' className='h-5 w-5'>
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
                </svg>
              </div>
            )}
            <div className='opacity-0 group-hover:opacity-100 transition-opacity absolute right-3 bottom-3 z-10 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-sm:opacity-100'>
              <Link
                href={`/elements/${element.id}`}
                className='hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 flex cursor-pointer items-center gap-[5px] rounded px-2 py-1 text-[15px] font-semibold'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='h-[20px] w-[20px]'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                >
                  <path d='M17 18a28.201 28.201 0 0 0 4.848-5.49.93.93 0 0 0 0-1.02A28.201 28.201 0 0 0 17 6M7.004 18a28.2 28.2 0 0 1-4.848-5.49.93.93 0 0 1 0-1.02A28.2 28.2 0 0 1 7.004 6m7-1.999-4 16' />
                </svg>{' '}
                Get code
              </Link>
            </div>
            <div className='absolute top-[6px] left-1.5 z-20 flex items-center gap-0.5' />
            <CodePreview isTailwind={element.isTailwind} html={elementCode.html} css={elementCode.css} />
          </div>
          {showInfor && (
            <div className='flex items-center justify-between pr-[2px] pl-[4px] mt-[2px] text-sm h-[28px] px-1'>
              <div className=''>
                <Link href={`/profile/${element.title}`}>
                  <div className='block truncate select-none pr-[5px] text-gray-200 flex items-center gap-1.5'>
                    {element.title}
                  </div>
                </Link>
              </div>
              <div className='flex items-center gap-2'>
                <span className='flex items-center gap-1 text-sm text-gray-400' data-state='closed'>
                  10K views
                </span>
                <form>
                  <input type='hidden' name='postId' defaultValue='596d9a7c-85c8-49dc-a087-d4fe6fa1d416' />
                  <input type='hidden' name='action' defaultValue='save' />
                  <button
                    type='submit'
                    className='hover:bg-dark-500 0 flex cursor-pointer items-center gap-0.5 overflow-hidden rounded-lg border-none bg-transparent p-1 font-sans text-sm font-semibold text-gray-300 transition-colors'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      className='h-4 w-4 text-gray-300'
                    >
                      <path d='M5 9c0-1.861 0-2.792.245-3.545a5 5 0 0 1 3.21-3.21C9.208 2 10.139 2 12 2s2.792 0 3.545.245a5 5 0 0 1 3.21 3.21C19 6.208 19 7.139 19 9v13l-1.794-1.537c-1.848-1.584-2.771-2.376-3.808-2.678a5 5 0 0 0-2.796 0c-1.037.302-1.96 1.094-3.808 2.678L5 22V9Z' />
                    </svg>
                    1K
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        'not found'
      )}
    </article>
  )
}

export default Element
