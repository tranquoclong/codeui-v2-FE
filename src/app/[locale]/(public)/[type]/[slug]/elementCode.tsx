'use client'

import { useState, useEffect } from 'react'
import { Link, useRouter } from '@/i18n/routing'
import EditorElement from '../../create/editor'
import { useGetElementQuery } from '@/queries/useElement'

interface Props {
  id: number
}
export default function ElementCode({ id }: Props) {
  const router = useRouter()
  const elementQuery = useGetElementQuery({ id, enabled: Boolean(id) })
  const element = elementQuery.data?.payload
  const [theme, setTheme] = useState<'DARK' | 'LIGHT'>(element?.theme || 'DARK')
  const [color, setColor] = useState<'#212121' | '#e8e8e8'>( '#212121')
  const [htmlText, setHtmlText] = useState(element?.elementCode.html || '')
  const [cssText, setCssText] = useState(element?.elementCode.css || '')
  useEffect(() => {
    if (element) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(element.theme || 'DARK')
      setHtmlText(element.elementCode?.html || '')
      setCssText(element.elementCode?.css || '')
    }
  }, [element])
  return (
    <div className='w-full min-w-0 z-10'>
      <main className='mx-auto mb-40 border-none wrapper'>
        <div className='flex flex-wrap items-center justify-between gap-3 mb-1 pr-2'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => router.back()}
              className='inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-700 h-10 px-4 py-2'
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
          </div>
          <div className='flex gap-5'>
            <h1 className='flex items-center gap-2 text-base text-gray-400'>
              Input by{' '}
              <Link
                href='#'
                className='flex items-center gap-3 p-1 pr-2 font-semibold transition-colors rounded text-offwhite hover:bg-neutral-800'
              >
                <span className='relative flex shrink-0 overflow-hidden rounded bg-black w-6 h-6'>
                  <img
                    className='aspect-square h-full w-full m-0'
                    alt='Yaseen549'
                    src='https://avatars.githubusercontent.com/u/43935210?v=4&s=24'
                  />
                </span>
                Yaseen549
              </Link>
            </h1>
            <div className='flex items-center gap-3 text-gray-400'>
              <div className='flex items-center gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-4 w-4'
                  strokeWidth={2}
                >
                  <path d='M3 14c0-2.188 2.7-7 9-7s9 4.813 9 7m-6 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                </svg>
                30K
              </div>
              <div className='flex items-center gap-1'>
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
                  <path d='M5 9c0-1.861 0-2.792.245-3.545a5 5 0 0 1 3.21-3.21C9.208 2 10.139 2 12 2s2.792 0 3.545.245a5 5 0 0 1 3.21 3.21C19 6.208 19 7.139 19 9v13l-1.794-1.537c-1.848-1.584-2.771-2.376-3.808-2.678a5 5 0 0 0-2.796 0c-1.037.302-1.96 1.094-3.808 2.678L5 22V9Z' />
                </svg>
                514
              </div>
            </div>
          </div>
        </div>
        <EditorElement
          tech={element?.isTailwind ? 'tailwind' : 'css'}
          htmlText={htmlText}
          cssText={cssText}
          theme={theme}
          color={color}
          onChangeHtml={setHtmlText}
          onChangeCss={setCssText}
          setTheme={setTheme}
          setColor={setColor}
        />
        <div className='items-stretch hidden p-2 mt-4 col-span-full bg-neutral-700 rounded-xl md:block'>
          <div className='flex flex-col md:flex-row items-stretch justify-between gap-2 h-full flex-wrap min-h-[40px]'>
            <div className='flex items-stretch gap-2 left w-full'>
              <div className='items-stretch hidden col-span-full rounded-xl md:block w-full'>
                <div className='flex flex-col md:flex-row items-stretch justify-between gap-2 h-full flex-wrap min-h-[40px] w-full'>
                  <div className='flex items-stretch gap-2'>
                    <form method='post' action='/favorites' className='flex h-full'>
                      <input type='hidden' name='postId' defaultValue='2c7df4fd-e2fb-4ff2-bf45-d8acc04c3e1c' />
                      <input type='hidden' name='action' defaultValue='save' />
                      <button
                        className='inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-800 h-10 px-4 py-2 max-md:w-full max-md:h-[40px] max-md:bg-neutral-800 text-white'
                        type='submit'
                      >
                        <div className='flex gap-1.5 items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            className='w-5 h-5'
                          >
                            <path d='M5 9c0-1.861 0-2.792.245-3.545a5 5 0 0 1 3.21-3.21C9.208 2 10.139 2 12 2s2.792 0 3.545.245a5 5 0 0 1 3.21 3.21C19 6.208 19 7.139 19 9v13l-1.794-1.537c-1.848-1.584-2.771-2.376-3.808-2.678a5 5 0 0 0-2.796 0c-1.037.302-1.96 1.094-3.808 2.678L5 22V9Z' />
                          </svg>
                        </div>
                        <div className='flex items-center'>Save to favorites</div>
                      </button>
                    </form>
                    <div className='w-[2px] h-full bg-neutral-500' />
                    <div className='relative z-30'>
                      <form method='post' action='/resource/posts/get-figma'>
                        <input type='hidden' name='postId' defaultValue='2c7df4fd-e2fb-4ff2-bf45-d8acc04c3e1c' />
                        <button className='bg-transparent relative overflow-hidden z-[1] px-4 py-2.5 font-semibold font-sans flex items-center gap-2 text-sm hover:bg-neutral-800 max-md:bg-neutral-800 text-offwhite border-none rounded-lg'>
                          <div className='flex items-center gap-1.5' style={{ willChange: 'auto', opacity: 1 }}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              id='Layer_1'
                              viewBox='0 0 200 300'
                              className='h-5 w-5'
                            >
                              <path
                                id='path0_fill'
                                fill='#0acf83'
                                d='M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z'
                              />
                              <path
                                id='path1_fill'
                                fill='#a259ff'
                                d='M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z'
                              />
                              <path
                                id='path1_fill_1_'
                                fill='#f24e1e'
                                d='M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z'
                              />
                              <path
                                id='path2_fill'
                                fill='#ff7262'
                                d='M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z'
                              />
                              <path
                                id='path3_fill'
                                fill='#1abcfe'
                                d='M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z'
                              />
                            </svg>
                            Copy to Figma
                          </div>
                          <div
                            className='absolute -z-10'
                            style={{
                              left: '50%',
                              willChange: 'auto',
                              opacity: 0,
                              transform: 'translateX(calc(-50%)) translateY(200px)'
                            }}
                          >
                            <div className='w-[100px] h-[100px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg transition-colors opacity-100' />
                            <div className='absolute -top-[8px] left-1/2 -translate-x-1/2'>
                              <svg
                                width={41}
                                height={41}
                                viewBox='0 0 41 41'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-5 h-5 animate-spin text-white'
                              >
                                <path
                                  d='M20.5002 3.41675C20.9533 3.41675 21.3878 3.59673 21.7082 3.91711C22.0285 4.23748 22.2085 4.672 22.2085 5.12508V10.2501C22.2085 10.7032 22.0285 11.1377 21.7082 11.4581C21.3878 11.7784 20.9533 11.9584 20.5002 11.9584C20.0471 11.9584 19.6126 11.7784 19.2922 11.4581C18.9718 11.1377 18.7918 10.7032 18.7918 10.2501V5.12508C18.7918 4.672 18.9718 4.23748 19.2922 3.91711C19.6126 3.59673 20.0471 3.41675 20.5002 3.41675V3.41675ZM20.5002 29.0417C20.9533 29.0417 21.3878 29.2217 21.7082 29.5421C22.0285 29.8625 22.2085 30.297 22.2085 30.7501V35.8751C22.2085 36.3282 22.0285 36.7627 21.7082 37.0831C21.3878 37.4034 20.9533 37.5834 20.5002 37.5834C20.0471 37.5834 19.6126 37.4034 19.2922 37.0831C18.9718 36.7627 18.7918 36.3282 18.7918 35.8751V30.7501C18.7918 30.297 18.9718 29.8625 19.2922 29.5421C19.6126 29.2217 20.0471 29.0417 20.5002 29.0417V29.0417ZM35.2943 11.9584C35.5209 12.3508 35.5823 12.8171 35.465 13.2547C35.3478 13.6923 35.0615 14.0655 34.6691 14.292L30.2308 16.8545C30.0365 16.9684 29.8215 17.0428 29.5983 17.0733C29.3751 17.1039 29.148 17.0899 28.9302 17.0323C28.7124 16.9747 28.5081 16.8746 28.3292 16.7378C28.1502 16.6009 28.0001 16.43 27.8874 16.2349C27.7748 16.0398 27.7018 15.8244 27.6728 15.6009C27.6437 15.3775 27.6592 15.1506 27.7182 14.9331C27.7772 14.7157 27.8787 14.5121 28.0167 14.3341C28.1548 14.156 28.3267 14.007 28.5225 13.8957L32.9608 11.3332C33.3531 11.1066 33.8194 11.0452 34.257 11.1625C34.6947 11.2798 35.0678 11.5661 35.2943 11.9584V11.9584ZM13.1031 24.7709C13.3296 25.1633 13.391 25.6296 13.2738 26.0672C13.1565 26.5048 12.8702 26.878 12.4778 27.1045L8.0396 29.667C7.84524 29.7809 7.63026 29.8553 7.40705 29.8858C7.18383 29.9164 6.95678 29.9024 6.73897 29.8448C6.52115 29.7872 6.31688 29.6871 6.13792 29.5503C5.95895 29.4134 5.80882 29.2425 5.69617 29.0474C5.58352 28.8523 5.51057 28.6369 5.48154 28.4134C5.4525 28.19 5.46794 27.9631 5.52697 27.7457C5.58599 27.5282 5.68745 27.3246 5.82548 27.1466C5.96352 26.9685 6.13541 26.8195 6.33127 26.7082L10.7695 24.1457C11.1619 23.9191 11.6282 23.8577 12.0658 23.975C12.5034 24.0923 12.8766 24.3786 13.1031 24.7709ZM35.2943 29.0417C35.0678 29.4341 34.6947 29.7204 34.257 29.8377C33.8194 29.9549 33.3531 29.8935 32.9608 29.667L28.5225 27.1045C28.1333 26.8763 27.8502 26.5035 27.7349 26.0674C27.6196 25.6313 27.6815 25.1672 27.907 24.7766C28.1326 24.3859 28.5035 24.1003 28.9389 23.9821C29.3743 23.8639 29.8387 23.9227 30.2308 24.1457L34.6691 26.7082C35.0615 26.9347 35.3478 27.3078 35.465 27.7455C35.5823 28.1831 35.5209 28.6494 35.2943 29.0417ZM13.1031 16.2292C12.8766 16.6216 12.5034 16.9079 12.0658 17.0252C11.6282 17.1424 11.1619 17.081 10.7695 16.8545L6.33127 14.292C6.13541 14.1806 5.96352 14.0317 5.82548 13.8536C5.68745 13.6755 5.58599 13.4719 5.52697 13.2545C5.46794 13.0371 5.4525 12.8101 5.48154 12.5867C5.51057 12.3633 5.58352 12.1478 5.69617 11.9527C5.80882 11.7576 5.95895 11.5867 6.13792 11.4499C6.31688 11.313 6.52115 11.2129 6.73897 11.1553C6.95678 11.0977 7.18383 11.0838 7.40705 11.1143C7.63026 11.1449 7.84524 11.2192 8.0396 11.3332L12.4778 13.8957C12.8702 14.1222 13.1565 14.4953 13.2738 14.933C13.391 15.3706 13.3296 15.8369 13.1031 16.2292Z'
                                  fill='currentColor'
                                />
                              </svg>
                            </div>
                            <div className='text-white absolute font-semibold top-[40px] left-1/2 -translate-x-1/2 z-[10]'>
                              Copied!
                            </div>
                          </div>
                        </button>
                      </form>
                    </div>
                    <div className='flex flex-row'>
                      <div className='flex'>
                        <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-neutral-800 text-secondary-foreground h-10 px-4 py-2 relative rounded-r-none pr-2 pl-3 gap-2 hover:bg-neutral-800'>
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 196.32 170.02' className='h-5 w-5'>
                            <path fill='#42b883' d='M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z' />
                            <path fill='#35495e' d='M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z' />
                          </svg>
                          Export
                        </button>
                        <button
                          className='justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-neutral-800 text-secondary-foreground h-10 px-4 py-2 rounded-l-none pl-2 pr-2 flex items-center gap-1 hover:bg-neutral-800'
                          type='button'
                          id='radix-:rbp:'
                          aria-haspopup='menu'
                          aria-expanded='false'
                          data-state='closed'
                        >
                          Vue
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            width={24}
                            height={24}
                            className='h-4 w-4'
                          >
                            <path fill='none' d='M0 0h24v24H0z' />
                            <path
                              fill='currentColor'
                              d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-stretch gap-2'>
                    <form method='post' action='/resource/posts/save-variation' data-discover='true'>
                      <input type='hidden' name='postId' defaultValue='2c7df4fd-e2fb-4ff2-bf45-d8acc04c3e1c' />
                      <input type='hidden' name='css' defaultValue='' />
                      <input type='hidden' name='html' defaultValue='long' />
                      <button className='inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 max-md:hidden whitespace-nowrap'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                        >
                          <path d='M16.902 16.902c.235-.035.445-.082.643-.147a5 5 0 0 0 3.21-3.21C21 12.792 21 11.861 21 10s0-2.792-.245-3.545a5 5 0 0 0-3.21-3.21C16.792 3 15.861 3 14 3s-2.792 0-3.545.245a5 5 0 0 0-3.21 3.21 3.921 3.921 0 0 0-.147.643m9.804 9.804C17 16.239 17 15.372 17 14c0-1.861 0-2.792-.245-3.545a5 5 0 0 0-3.21-3.21C12.792 7 11.861 7 10 7c-1.373 0-2.24 0-2.902.098m9.804 9.804a3.923 3.923 0 0 1-.147.643 5 5 0 0 1-3.21 3.21C12.792 21 11.861 21 10 21s-2.792 0-3.545-.245a5 5 0 0 1-3.21-3.21C3 16.792 3 15.861 3 14s0-2.792.245-3.545a5 5 0 0 1 3.21-3.21c.198-.065.407-.112.643-.147' />
                        </svg>{' '}
                        Save as a new variation
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 mt-10 items-start'>
          <div className='flex gap-10 flex-col'>
            <div className='space-y-4'>
              <section className=''>
                <div className='mb-4 flex items-center gap-3'>
                  <h3 className='font-body text-gray-400'>Comments</h3>
                  <span className='text-dark-100 text-sm font-semibold'>2 </span>
                </div>
                <div className='flex gap-4 mb-4'>
                  <form
                    method='post'
                    action='/resource/comments/add'
                    className='relative p-4 w-full bg-neutral-800 flex items-start gap-3 rounded-xl overflow-hidden false'
                  >
                    <span className='relative shrink-0 overflow-hidden rounded bg-black w-10 h-10 hidden sm:block'>
                      <img
                        className='aspect-square h-full w-full m-0'
                        alt='long_9040'
                        src='https://lh3.googleusercontent.com/a/ACg8ocLUSliDLLtgf7gmYOzm1j0ZB35sdDyIuD0fg8Z4L1pLQ2m1BLHH=s96-c'
                      />
                    </span>
                    <input type='hidden' name='postId' defaultValue='2c7df4fd-e2fb-4ff2-bf45-d8acc04c3e1c' />
                    <input type='hidden' name='commentType' defaultValue='general' />
                    <textarea
                      className='flex w-full rounded-md border-2 px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[40px] resize-none flex-1 bg-neutral-700 text-gray-200 placeholder:text-gray-400 border-dark-300 focus:border-gray-700'
                      name='content'
                      id='content'
                      rows={1}
                      placeholder='Add a comment...'
                      style={{ height: 37 }}
                      defaultValue={''}
                    />
                    <div className='flex flex-col items-center'>
                      <button
                        className='inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-8'
                        type='submit'
                      >
                        Send
                      </button>
                      <p className='text-xs text-dark-100 transition duration-300 pointer-events-none transform absolute opacity-0 translate-y-0'>
                        <span className='text-white'>0</span>/244
                      </p>
                    </div>
                  </form>
                </div>
                <div className='grid grid-cols-1 gap-3'>
                  <div
                    className='flex relative gap-4 lg:gap-6 bg-neutral-800 py-4 px-4 lg:px-6 rounded-xl overflow-hidden '
                    style={{ wordBreak: 'break-word' }}
                  >
                    <form
                      method='post'
                      action='/resource/comments/vote'
                      className='false flex flex-col items-center gap-1 min-w-[44px] max-h-[100px] justify-center  rounded-lg overflow-hidden transition bg-gradient-to-t from-dark-500 via-transparent to-dark-500 false '
                    >
                      <input type='hidden' name='commentId' defaultValue={853} />
                      <input type='hidden' name='postId' defaultValue='2c7df4fd-e2fb-4ff2-bf45-d8acc04c3e1c' />
                      <button
                        className='px-3 py-2 transition hover:bg-neutral-700 cursor-pointer bg-opacity-30 bg-transparent border-none'
                        name='value'
                        value={1}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5 text-gray-400 block'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                        >
                          <path d='M12 19v-7m0 0V5m0 7H5m7 0h7' />
                        </svg>
                      </button>
                      <div className='text-sm font-semibold relative text-gray-400'>
                        <div className='h-[20px] w-[44px] relative overflow-hidden'>
                          <div className='flex flex-col gap-2 w-full h-[20px] absolute items-center justify-center text-center pointer-events-none transition transform false false'>
                            <div className='w-12'>3</div>
                            <div className='w-12'>2</div>
                            <div className='w-12'>1</div>
                          </div>
                        </div>
                      </div>
                      <button
                        className='px-3 py-2 transition hover:bg-neutral-700 cursor-pointer bg-opacity-30 bg-transparent border-none'
                        name='value'
                        value={-1}
                      >
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5 text-gray-400 block'
                        >
                          <path
                            d='M5 12H19'
                            stroke='currentColor'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </form>
                    <div>
                      <div className='flex mb-3 items-center'>
                        <Link href='#'>
                          <span className='relative flex shrink-0 overflow-hidden rounded bg-black w-[50px] h-[50px] lg:w-[40px] lg:h-[40px] mr-3'>
                            <img
                              className='aspect-square h-full w-full m-0'
                              alt='shibalSaekiya'
                              src='https://avatars.githubusercontent.com/u/166676474?v=4&s=48'
                            />
                          </span>
                        </Link>
                        <div className='flex flex-col items-start'>
                          <div className='font-bold text-gray-200 text-base leading-2 flex items-center gap-4'>
                            <Link href='#' className='block'>
                              shibalSaekiya
                            </Link>
                          </div>
                        </div>
                        <div className='flex items-center gap-3 ml-3'>
                          <span className=' text-gray-400 block text-sm'>Jul 12, 2024</span>
                        </div>
                      </div>
                      <p className='text-gray-200 text-base block'> thanks </p>
                      <div className='lg:absolute top-3 right-4 mt-6 lg:mt-0 font-semibold flex items-center gap-2 -ml-2 lg:ml-0'>
                        <button className='flex items-center gap-2 text-gray-400 font-sans cursor-pointer bg-transparent hover:bg-neutral-700 px-2 py-2 rounded border-none '>
                          <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-4 h-4'>
                            <path
                              d='M8.03089 4C6.57669 5.05865 5.2706 6.29537 4.14485 7.67887C4.04828 7.79755 4 7.94044 4 8.08333M8.03089 12.1667C6.57669 11.108 5.2706 9.8713 4.14485 8.4878C4.04828 8.36912 4 8.22623 4 8.08333M4 8.08333H14.963C17.7448 8.08333 20 10.3033 20 13.0417C20 15.7801 17.7448 18 14.963 18H12'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='w-full relative flex mb-2'>
                    <div className='w-12 lg:w-24 h-full py-2 flex justify-center'>
                      <button className='h-full border-none bg-white transition opacity-30 w-1 rounded-full' />
                    </div>
                    <div className='flex flex-col w-full gap-3'>
                      <div
                        className='flex relative gap-4 lg:gap-6 bg-neutral-800 py-4 px-4 lg:px-6 rounded-xl overflow-hidden '
                        style={{ wordBreak: 'break-word' }}
                      >
                        <form
                          method='post'
                          action='/resource/comments/vote'
                          className='false flex flex-col items-center gap-1 min-w-[44px] max-h-[100px] justify-center  rounded-lg overflow-hidden transition bg-gradient-to-t from-dark-500 via-transparent to-dark-500 false '
                        >
                          <input type='hidden' name='commentId' defaultValue={23084} />
                          <input type='hidden' name='postId' defaultValue='2c7df4fd-e2fb-4ff2-bf45-d8acc04c3e1c' />
                          <button
                            className='px-3 py-2 transition hover:bg-neutral-700 cursor-pointer bg-opacity-30 bg-transparent border-none'
                            name='value'
                            value={1}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-5 h-5 text-gray-400 block'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                            >
                              <path d='M12 19v-7m0 0V5m0 7H5m7 0h7' />
                            </svg>
                          </button>
                          <div className='text-sm font-semibold relative text-gray-400'>
                            <div className='h-[20px] w-[44px] relative overflow-hidden'>
                              <div className='flex flex-col gap-2 w-full h-[20px] absolute items-center justify-center text-center pointer-events-none transition transform false false'>
                                <div className='w-12'>2</div>
                                <div className='w-12'>1</div>
                                <div className='w-12'>0</div>
                              </div>
                            </div>
                          </div>
                          <button
                            className='px-3 py-2 transition hover:bg-neutral-700 cursor-pointer bg-opacity-30 bg-transparent border-none'
                            name='value'
                            value={-1}
                          >
                            <svg
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-5 h-5 text-gray-400 block'
                            >
                              <path
                                d='M5 12H19'
                                stroke='currentColor'
                                strokeWidth={2}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          </button>
                        </form>
                        <div>
                          <div className='flex mb-3 items-center'>
                            <Link href='#'>
                              <span className='relative flex shrink-0 overflow-hidden rounded bg-black w-[50px] h-[50px] lg:w-[40px] lg:h-[40px] mr-3'>
                                <img
                                  className='aspect-square h-full w-full m-0'
                                  alt='Yaseen549'
                                  src='https://avatars.githubusercontent.com/u/43935210?v=4&s=48'
                                />
                              </span>
                            </Link>
                            <div className='flex flex-col items-start'>
                              <div className='font-bold text-gray-200 text-base leading-2 flex items-center gap-4'>
                                <Link href='#' className='block'>
                                  Yaseen549
                                </Link>
                              </div>
                            </div>
                            <div className='flex items-center gap-3 ml-3'>
                              <span className=' text-gray-400 block text-sm'>Sep 12, 2025</span>
                            </div>
                          </div>
                          <p className='text-gray-200 text-base block'>
                            <span className='font-semibold text-gray-50'>@shibalSaekiya</span> You are welcome
                          </p>
                          <div className='lg:absolute top-3 right-4 mt-6 lg:mt-0 font-semibold flex items-center gap-2 -ml-2 lg:ml-0' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <section>
              <div>
                <Link
                  href='#'
                  className='relative h-[200px] flex items-center justify-center cursor-pointer w-full border-2 border-gray-600 bg-transparent border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <span className='flex items-center gap-3 mt-2 font-sans font-semibold text-gray-600 text-md'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6 mx-auto text-gray-600'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                    >
                      <path d='M12 19v-7m0 0V5m0 7H5m7 0h7' />
                    </svg>
                    No variations yet, create one!
                  </span>
                </Link>
              </div>
            </section>
          </div>
          <aside className='space-y-4'>
            <div className=''>
              <h2 className='mb-2 text-2xl font-bold text-gray-100 font-display capitalize max-w-[300px]'>input</h2>
              <div
                className='flex flex-wrap gap-y-0 gap-x-2 text-gray-300 max-w-[300px]'
                style={{ color: 'rgb(232, 232, 232)' }}
              />
              <div className='flex items-center gap-2 mt-2' />
              <div className='flex flex-wrap items-center justify-between gap-3 mt-4'>
                <div className='flex items-center gap-3 font-normal text-gray-400'>
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
                    <path d='M8 2v2.128M8 6V4.128M16 2v2.128M16 6V4.128M20.96 10c.04.788.04 1.755.04 3 0 2.796 0 4.194-.457 5.296a6 6 0 0 1-3.247 3.247C16.194 22 14.796 22 12 22c-2.796 0-4.193 0-5.296-.457a6 6 0 0 1-3.247-3.247C3 17.194 3 15.796 3 13c0-1.245 0-2.212.04-3m17.92 0c-.05-.982-.163-1.684-.417-2.296a6 6 0 0 0-3.247-3.247A5.136 5.136 0 0 0 16 4.127M20.96 10H3.04m0 0c.05-.982.163-1.684.417-2.296a6 6 0 0 1 3.247-3.247A5.135 5.135 0 0 1 8 4.127m0 0C8.941 4 10.172 4 12 4c1.828 0 3.059 0 4 .128' />
                  </svg>{' '}
                  Jun 9, 2022
                </div>
                <button className='px-4 py-2.5 font-sans flex items-center gap-2 border-none rounded-lg text-base font-semibold transition-colors duration-200 bg-transparent hover:bg-neutral-800 max-md:bg-neutral-800 text-offwhite cursor-pointer group'>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 text-red-400 opacity-70 group-hover:opacity-100'
                  >
                    <path
                      d='M12 13V8.93768M12 16V15.999M13.2355 4.2522C12.4454 3.91593 11.5546 3.91593 10.7645 4.2522C8.40767 5.25526 2.84035 14.1527 3.00351 16.5308C3.06747 17.463 3.5294 18.3211 4.26914 18.8819C6.23598 20.3727 17.764 20.3727 19.7309 18.8819C20.4706 18.3211 20.9325 17.463 20.9965 16.5308C21.1596 14.1527 15.5923 5.25526 13.2355 4.2522Z'
                      stroke='currentColor'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>{' '}
                  <span className='text-gray-400 group-hover:text-gray-200'>Report</span>
                </button>
              </div>
              <div className='w-full h-[2px] bg-neutral-700 mb-6 mt-4' />
            </div>
            <section className='rounded-xl md:pr-8 max-w-full md:w-[300px] xl:w-[350px] mb-6'>
              <div className='grid grid-cols-[48px_1fr] gap-4 content-start'>
                <Link href='#'>
                  <span className='relative flex shrink-0 overflow-hidden rounded bg-black w-12 h-12'>
                    <img
                      className='aspect-square h-full w-full m-0'
                      alt='Yaseen549'
                      src='https://avatars.githubusercontent.com/u/43935210?v=4&s=48'
                    />
                  </span>
                </Link>
                <div className='max-w-full overflow-hidden'>
                  <Link href='#' className='block text-xl font-semibold text-gray-200 truncate overflow-hidden'>
                    Yaseen549
                  </Link>
                  <p className='block text-gray-400'>Yaseen</p>
                </div>
                <p className='block text-gray-200 col-span-full text-base'>
                  Multi-stack Developer | MERN Stack | Coding enthusiast | Teaching Students to Code
                </p>
              </div>
            </section>
            <div className='w-full max-w-[300px]'>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '\n          @media only screen and (min-width: 0px) and (min-height: 0px) {\n            div[id^="bsa-zone_1773913105696-5_123456"] {\n              min-width: 300px;\n              min-height: 250px;\n            }\n          }\n        '
                }}
              />
              <div id='bsa-zone_1773913105696-5_123456' className='overflow-hidden rounded-lg' />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
