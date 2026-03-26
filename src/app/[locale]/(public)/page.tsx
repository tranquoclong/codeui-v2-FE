import dishApiRequest from '@/apiRequests/dish'
import indicatorApiRequest from '@/apiRequests/indicator'
import { wrapServerApi } from '@/lib/utils'
import { DishListResType } from '@/schemaValidations/dish.schema'
import { DashboardIndicatorResType } from '@/schemaValidations/indicator.schema'
import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import envConfig, { Locale } from '@/config'
import { htmlToTextForDescription } from '@/lib/server-utils'
import DishFilter from '@/app/[locale]/(public)/dish-filter'
import FeaturedDishes from '@/app/[locale]/(public)/featured-dishes'
import StatsCounter from '@/app/[locale]/(public)/stats-counter'
import AboutTeaser from '@/app/[locale]/(public)/about-teaser'
import ScrollAnimate from '@/components/scroll-animate'
import { Link } from '@/i18n/routing'
import { startOfMonth, endOfDay } from 'date-fns'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import { Marquee } from '@/components/magicui/marquee'
import { cn } from '@/lib/utils'
import Element from '@/components/element'
import elementApiRequest from '@/apiRequests/element'
import { ElementListResType } from '@/schemaValidations/element.schema'

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params

  const { locale } = params

  const t = await getTranslations({ locale, namespace: 'HomePage' })
  const url = envConfig.NEXT_PUBLIC_URL + `/${locale}`

  return {
    title: t('title'),
    description: htmlToTextForDescription(t('description')),
    alternates: {
      canonical: url
    }
  }
}
const tags = [
  {
    tagName: 'button',
    highlight: true
  },
  {
    tagName: 'galaxy',
    highlight: false
  },
  {
    tagName: 'animated',
    highlight: false
  },
  {
    tagName: 'simple',
    highlight: false
  },
  {
    tagName: 'rounded',
    highlight: false
  },
  {
    tagName: 'loader',
    highlight: true
  },
  {
    tagName: 'icon',
    highlight: false
  },
  {
    tagName: 'glow',
    highlight: false
  },
  {
    tagName: 'dark',
    highlight: false
  },
  {
    tagName: 'neumorphism',
    highlight: false
  },
  {
    tagName: 'input',
    highlight: true
  },
  {
    tagName: 'circle',
    highlight: false
  },
  {
    tagName: 'label',
    highlight: false
  },
  {
    tagName: 'toggle',
    highlight: false
  },
  {
    tagName: 'interactive',
    highlight: false
  }
]
const TagsCard = ({ tagName, highlight }: { tagName: string; highlight: boolean }) => {
  return (
    <figure
      className={cn(
        'relative h-full cursor-pointer overflow-hidden rounded border p-2',
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <blockquote className={cn(' text-xl font-bold text-sm text-gray-400', highlight && 'text-indigo-400')}>
        {tagName}
      </blockquote>
    </figure>
  )
}

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params

  const { locale } = params

  setRequestLocale(locale)
  const t = await getTranslations('HomePage')

  const now = new Date()
  const [elementResult] = await Promise.allSettled([
    wrapServerApi(() =>
      elementApiRequest.list({
        page: 1,
        limit: 10,
        sortBy: 'randomized',
        orderBy: 'desc'
        // theme: 'all',
        // t: 'all'
      })
    )
  ])

  const elementList: ElementListResType['data'] = elementResult.status === 'fulfilled' ? (elementResult.value?.payload.data ?? []) : []

  return (
    <div className='w-full space-y-0'>
      <div className='relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden'>
        <div className='mt-20 mb-5 w-full'>
          <h2 className=' relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100'>
            The Largest Library of Open-Source UI
          </h2>
          <p className='relative font-semibold z-10 mx-auto mt-4 max-w-md text-center text-neutral-800 dark:text-neutral-500'>
            Community-built library of UI elements. Copy as HTML/CSS, Tailwind, React and Figma.
          </p>
          <div className='flex mt-4 w-full flex-col gap-4 gap-y-2 md:mx-auto md:max-w-xs md:flex-row md:justify-center'>
            <RainbowButton>Get Elements</RainbowButton>
            <RainbowButton variant='outline'>Get Products</RainbowButton>
          </div>
        </div>
        <section className='relative z-10 flex flex-col gap-4 px-4 mx-auto sm:container sm:px-0'>
          <div className='mx-5 overflow-hidden border-2 bg-dark-800 rounded-3xl border-dark-600/80'>
            <div className='p-5 pb-0 relative'>
              <div
                className='absolute left-1/2 top-[80%] z-0 -translate-x-1/2 w-[100%] h-full bg-gradient-to-br from-gray-500 to-gray-700 rounded-full opacity-20 blur-3xl '
                aria-hidden='true'
              />
              <div className='grid gap-y-5 gap-x-3.5 content-stretch items-stretch w-full max-xs:grid-cols-1 max-xs:gap-2.5 grid-cols-[repeat(auto-fill,minmax(294px,1fr))]'>
                {elementList.slice(1, 5).map((element, index) => (
                  <Element element={element} showInfor={false} key={index} />
                ))}
              </div>
              {/* <h2 className='mb-12 text-3xl font-bold font-display text-gray-100 text-center relative z-10'>
                Elements
              </h2> */}
              <div className='m-auto py-5 gap-3 max-w-[530px] w-full'>
                <div className='flex w-full relative z-[21] p-1 mx-auto  hover:scale-105 bg-gray-300 shadow-lg overflow-visible [&:has(:focus-visible)]:ring-4 rounded-2xl transition-transform [&:has(:focus-visible)]:ring-indigo-400 [&:has(:focus-visible)]:border-indigo-400'>
                  <input
                    type='text'
                    placeholder='Search for components, styles, creators...'
                    className='block w-full px-6 pl-12 py-4 pr-2 mr-px font-sans ouline-gray-200 font-normal outline-none rounded-xl text-base border-none focus:ring-0 bg-gray-300 text-gray-900 placeholder:text-gray-500 shadow-sm'
                    defaultValue=''
                  />
                  <svg
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 text-gray-600 absolute left-6 top-1/2 -translate-y-1/2'
                  >
                    <path
                      d='M21 21L14.9497 14.9497M14.9497 14.9497C16.2165 13.683 17 11.933 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C11.933 17 13.683 16.2165 14.9497 14.9497Z'
                      stroke='currentColor'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <button
                    className='flex items-center px-8 py-1.5 text-base gap-1.5 font-sans font-semibold transition-colors bg-indigo-600 hover:bg-indigo-700 text-offwhite group border-none cursor-pointer rounded-xl pointer'
                  >
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ScrollAnimate delay={100}>
        <StatsCounter dishCount={0} orderCount={0} guestCount={0} />
      </ScrollAnimate>
      <section className='relative z-10 flex flex-col gap-4 px-4 mx-auto mb-24 sm:container sm:px-0'>
        <div className='mx-5 overflow-hidden border-2 bg-dark-800 rounded-3xl border-dark-600/80'>
          <div className='pt-10 pb-0 relative'>
            <div
              className='absolute left-1/2 top-[80%] z-0 -translate-x-1/2 w-[100%] h-full bg-gradient-to-br from-gray-500 to-gray-700 rounded-full opacity-20 blur-3xl '
              aria-hidden='true'
            />
            <div className='flex flex-col gap-[10px] mt-auto pb-6'>
              <Marquee pauseOnHover className='[--duration:40s]'>
                {tags.slice(0, tags.length / 2).map((tag) => (
                  <TagsCard key={tag.tagName} {...tag} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className='[--duration:40s]'>
                {tags.slice(tags.length / 2).map((tag) => (
                  <TagsCard key={tag.tagName} {...tag} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className='[--duration:40s]'>
                {tags.slice(0, tags.length / 2).map((tag) => (
                  <TagsCard key={tag.tagName} {...tag} />
                ))}
              </Marquee>
            </div>
            <h2 className='mb-12 text-3xl font-bold font-display text-gray-100 text-center relative z-10'>
              Browse by Tags
            </h2>
          </div>
        </div>

        <div className='flex flex-wrap gap-4 mx-5'>
          <div className='bg-dark-800 min-w-[300px] w-full min-h-[300px] flex-1 rounded-3xl overflow-hidden border-dark-600/80 border-2'>
            <section className='relative z-10 w-full h-full px-10 py-24 overflow-hidden '>
              <p className='relative flex items-center gap-4 mb-4 text-green-400 max-w-fit'>
                <span className='relative flex w-3 h-3'>
                  <span className='absolute inline-flex w-full h-full bg-green-400 rounded-full animate-ping opacity-30' />
                  <span className='relative inline-flex w-3 h-3 bg-green-500 rounded-full' />
                </span>{' '}
                1000 online
              </p>
              <h2 className='text-xl font-bold sm:text-3xl font-display'>Join the Discord community!</h2>
              <p className='text-lg max-w-[290px] md:max-w-full text-gray-400'>
                An open space for UI designers and developers
              </p>
              <Link
                href='#'
                className='px-4 py-2.5 font-sans font-semibold transition-colors duration-200 flex items-center gap-2.5 border-none max-w-fit rounded-lg bg-[#5865f2] mt-10'
              >
                <svg
                  width={33}
                  height={27}
                  className='w-5 h-5'
                  viewBox='0 0 33 27'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M27.9541 2.81323C25.818 1.81378 23.5339 1.08742 21.146 0.673828C20.8527 1.20404 20.5101 1.91719 20.2739 2.4845C17.7354 2.10275 15.2203 2.10275 12.7286 2.4845C12.4924 1.91719 12.142 1.20404 11.8461 0.673828C9.45561 1.08742 7.16891 1.81645 5.03277 2.81853C0.724134 9.32943 -0.443865 15.6786 0.140135 21.9377C2.99785 24.0717 5.76731 25.3681 8.49004 26.2164C9.1623 25.2912 9.76186 24.3077 10.2784 23.2711C9.29466 22.8973 8.35248 22.4361 7.46223 21.9006C7.69841 21.7256 7.92943 21.5426 8.15262 21.3544C13.5825 23.8941 19.4822 23.8941 24.8473 21.3544C25.0731 21.5426 25.3041 21.7256 25.5377 21.9006C24.6448 22.4387 23.7 22.9 22.7163 23.2738C23.2328 24.3077 23.8298 25.2939 24.5046 26.219C27.23 25.3707 30.002 24.0744 32.8597 21.9377C33.545 14.6818 31.6892 8.39096 27.9541 2.81323ZM11.0181 18.0884C9.38812 18.0884 8.05138 16.5667 8.05138 14.7136C8.05138 12.8606 9.35957 11.3363 11.0181 11.3363C12.6767 11.3363 14.0134 12.8579 13.9848 14.7136C13.9874 16.5667 12.6767 18.0884 11.0181 18.0884ZM21.9818 18.0884C20.3518 18.0884 19.015 16.5667 19.015 14.7136C19.015 12.8606 20.3232 11.3363 21.9818 11.3363C23.6403 11.3363 24.977 12.8579 24.9485 14.7136C24.9485 16.5667 23.6403 18.0884 21.9818 18.0884Z'
                    fill='currentColor'
                  />
                </svg>
                Join Discord
              </Link>
              <div
                className='absolute left-[-200px] top-[-200px] -z-10 w-[800px] h-[450px] bg-gradient-to-br from-gray-500 to-gray-700 rounded-full opacity-10 blur-3xl '
                aria-hidden='true'
              />
            </section>
          </div>
          <div className='bg-dark-800 min-h-[440px] md:min-h-[300px] min-w-[300px] w-full flex-1 rounded-3xl max-w-[700px] overflow-hidden border-dark-600/80 border-2'>
            <section className='relative z-10 flex items-end w-full h-full px-10 py-10 overflow-hidden '>
              <div className='relative z-10 flex flex-wrap items-center gap-4'>
                <svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' viewBox='0 0 200 300' className='h-12 w-12'>
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
                  <path id='path2_fill' fill='#ff7262' d='M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z' />
                  <path
                    id='path3_fill'
                    fill='#1abcfe'
                    d='M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z'
                  />
                </svg>
                <div>
                  <h2 className='text-xl font-bold sm:text-3xl font-display'>Use in Figma</h2>
                  <p className='text-lg text-gray-400'>Copy and paste to Figma from any element page</p>
                </div>
              </div>
              <Link
                href='#'
                className='w-[400px] md:w-full absolute top-0 border-dark-600/80 border-2 sm:-right-26 md:-top-10 md:right-0 max-w-[500px] overflow-hidden rounded-bl-3xl'
              >
                <img src='https://uiverse.io/assets/figma-CmpLUCXr.png' alt='Figma' className='w-full' />
              </Link>
              <div
                className='absolute right-[-590px] md:right-[-400px] top-0 md:top-[-200px] -z-10 w-[1000px] h-[450px] bg-gradient-to-br from-[#f24e1e] to-[#1abcfe] rounded-full opacity-30 blur-3xl '
                aria-hidden='true'
              />
            </section>
          </div>
        </div>
        <div className=' mx-5 grid gap-4 grid-cols-1 lg:grid-cols-[auto_1fr]'>
          <div className='min-h-[200px] py-8 bg-dark-800 border-dark-600/80 border-2 px-14 content-center lg:w-[360px] flex sm:justify-between gap-4 flex-wrap items-center relative overflow-hidden rounded-3xl'>
            <div className='relative z-10 flex flex-wrap items-center gap-5'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24} className='h-16 w-16'>
                <path fill='none' d='M0 0h24v24H0z' />
                <path
                  fill='currentColor'
                  d='M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588-.094-.117.34.427.433.539.19.227.33.365.44.438.204.137.587.196 1.15.14.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308 1.477-.933 2.613-1.226 3.422-1.096.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19.691.936 1.058 2.045 1.058 3.293 0 3.757-1.674 5.665-4.642 6.392.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716 1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446.005-.705c.005-.708.007-1.338.007-1.998 0-.697-.183-1.152-.425-1.36-.661-.57-.326-1.655.54-1.752 2.967-.333 4.337-1.482 4.337-4.66 0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66.865.097 1.201 1.177.544 1.748-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z'
                />
              </svg>
              <div>
                <h2 className='mb-1 text-xl font-bold sm:text-3xl font-display'>
                  CODEUI{' '}
                  <span className='inline-block text-transparent bg-gradient-to-br from-indigo-500 via-fuchisa-500 to-fuchsia-400 bg-clip-text'>
                    Galaxy
                  </span>
                </h2>
                <p className='text-lg text-gray-400'>The largest Open-Source UI Library, available on GitHub!</p>
                <Link href='#' className='font-mono text-sm text-gray-500 underline underline-offset-2'>
                  codeui/galaxy
                </Link>
              </div>
            </div>
            <Link
              href='#'
              className='px-4 py-2.5 font-sans flex items-center gap-2 border-none rounded-lg text-base font-semibold transition-colors duration-200 bg-dark-600 hover:bg-dark-500 text-offwhite cursor-pointer relative z-[1]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-5 h-5 text-yellow-500'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
              >
                <path d='M9.15 6.247c.841-1.764 1.262-2.646 1.811-2.967a2.063 2.063 0 0 1 2.078 0c.549.32.97 1.203 1.812 2.967.25.523.374.785.553.993.21.244.473.436.77.56.253.105.54.143 1.115.219 1.938.255 2.908.383 3.382.807.554.495.799 1.249.642 1.975-.135.621-.844 1.294-2.262 2.64-.42.4-.63.599-.773.833a2.062 2.062 0 0 0-.294.906c-.023.273.03.558.136 1.128.356 1.922.534 2.884.277 3.465-.3.68-.94 1.146-1.68 1.221-.633.064-1.492-.402-3.21-1.335-.51-.276-.764-.414-1.03-.478a2.062 2.062 0 0 0-.953 0c-.267.064-.522.202-1.03.478-1.72.933-2.578 1.4-3.211 1.335a2.063 2.063 0 0 1-1.68-1.22c-.257-.582-.079-1.544.277-3.466.106-.57.159-.855.136-1.128a2.063 2.063 0 0 0-.294-.906c-.143-.234-.353-.434-.773-.832-1.418-1.347-2.127-2.02-2.262-2.641a2.063 2.063 0 0 1 .642-1.975c.474-.424 1.444-.552 3.382-.807.574-.076.861-.114 1.114-.22.298-.123.562-.315.771-.56.179-.207.304-.469.553-.992Z' />
              </svg>{' '}
              Star on GitHub
            </Link>
            <div
              className='hidden absolute left-1/2 top-full z-0 -translate-x-1/2 w-[100%] h-[150px] bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-full opacity-20 blur-3xl '
              aria-hidden='true'
            />
            <div
              className='hidden absolute right-0 top-[-200px] z-0 w-[800px] h-[450px] bg-gradient-to-br from-gray-500 to-gray-700 rounded-full opacity-10 blur-3xl '
              aria-hidden='true'
            />
            <div
              className='absolute left-1/2 bottom-[80%] z-0 -translate-x-1/2 w-[100%] h-full bg-gradient-to-br from-gray-500 to-gray-700 rounded-full opacity-20 blur-3xl '
              aria-hidden='true'
            />
            <div className='hidden absolute right-[-7%] bottom-0 h-[300px] w-[100%] bg-gradient-to-r from-transparent via-indigo-500 to-fuchsia-400 z-0 transform-gpu opacity-20 blur-3xl' />
          </div>
          <div className='flex-1 bg-dark-800 rounded-3xl overflow-hidden border-dark-600/80 border-2 relative max-h-[320px] md:max-h-[380px] lg:max-h-[440px] sm:min-w-[600px]'>
            <div className='p-8 relative z-10'>
              <h2 className='text-2xl lg:text-4xl font-bold font-display mb-8 text-center mt-6'>Latest from Blog</h2>
              <div className='flex justify-center items-start lg:gap-6 w-full '>
                <article className='relative flex flex-col min-h-[300px] lg:min-h-[400px] bg-dark-800 border-dark-600/80 overflow-hidden rounded-lg border-2 group w-[270px] transition-all duration-300 ease-out translate-y-[10px] hover:-translate-y-2 rotate-[-5deg] translate-y-[40px] hover:rotate-0 hover:translate-y-0'>
                  <Link href='#' className='relative w-full mb-2'>
                    <img
                      src='https://imagedelivery.net/KMb5EadhEKC1gAE0LkjL1g/ffb34cd8-1ce7-4e2d-0620-a88cd2572300/public'
                      alt=''
                      className='aspect-[16/9] w-full bg-gray-700 object-cover'
                    />
                  </Link>
                  <div className='hidden items-center justify-between w-full mt-3 text-xs gap-x-4 px-5 lg:flex'>
                    <div className='flex flex-wrap gap-2'>
                      <Link
                        href='#'
                        className='relative z-10 rounded-lg bg-dark-600 px-3 py-1.5 font-medium text-gray-300 hover:bg-dark-500'
                      >
                        UI UX
                      </Link>
                    </div>
                  </div>
                  <h3 className='mt-2 text-xs lg:text-base font-semibold px-5 leading-normal text-gray-200 group-hover:text-gray-300'>
                    <Link href='#' className='line-clamp-2'>
                      10 tiny UI fixes that make a big difference
                    </Link>
                  </h3>
                  <p className='mt-2 px-5 text-sm text-gray-400 line-clamp-3'>
                    You don’t always need a massive redesign to make your product feel better. In fact, most of the
                    time, the biggest wins in user experience come from small, almost invisible changes.
                  </p>
                </article>
                <article className='relative flex flex-col min-h-[300px] lg:min-h-[400px] bg-dark-800 border-dark-600/80 overflow-hidden rounded-lg border-2 group w-[270px] transition-all duration-300 ease-out translate-y-[10px] hover:-translate-y-2 '>
                  <Link href='#' className='relative w-full mb-2'>
                    <img
                      src='https://imagedelivery.net/KMb5EadhEKC1gAE0LkjL1g/cec8b3a8-abf9-40fd-f1d3-263f9e80cb00/public'
                      alt=''
                      className='aspect-[16/9] w-full bg-gray-700 object-cover'
                    />
                  </Link>
                  <div className='hidden items-center justify-between w-full mt-3 text-xs gap-x-4 px-5 lg:flex'>
                    <div className='flex flex-wrap gap-2'>
                      <Link
                        href='#'
                        className='relative z-10 rounded-lg bg-dark-600 px-3 py-1.5 font-medium text-gray-300 hover:bg-dark-500'
                      >
                        Web Development
                      </Link>
                    </div>
                  </div>
                  <h3 className='mt-2 text-xs lg:text-base font-semibold px-5 leading-normal text-gray-200 group-hover:text-gray-300'>
                    <Link href='#' className='line-clamp-2'>
                      How Open-Source UI Libraries Are Changing Frontend Development
                    </Link>
                  </h3>
                  <p className='mt-2 px-5 text-sm text-gray-400 line-clamp-3'>
                    Why does frontend development feel simpler today than it did a few years ago? Why can teams build
                    landing pages, full websites, apps, and even internal tools faster without feeling buried in
                    complexity?
                  </p>
                </article>
                <article className='relative flex flex-col min-h-[300px] lg:min-h-[400px] bg-dark-800 border-dark-600/80 overflow-hidden rounded-lg border-2 group w-[270px] transition-all duration-300 ease-out translate-y-[10px] hover:-translate-y-2 rotate-[5deg] translate-y-[40px] hover:rotate-0 hover:translate-y-0'>
                  <Link href='#' className='relative w-full mb-2'>
                    <img
                      src='https://imagedelivery.net/KMb5EadhEKC1gAE0LkjL1g/244253b4-c86a-473a-afa2-d823355ee800/public'
                      alt=''
                      className='aspect-[16/9] w-full bg-gray-700 object-cover'
                    />
                  </Link>
                  <div className='hidden items-center justify-between w-full mt-3 text-xs gap-x-4 px-5 lg:flex'>
                    <div className='flex flex-wrap gap-2'>
                      <Link
                        href='#'
                        className='relative z-10 rounded-lg bg-dark-600 px-3 py-1.5 font-medium text-gray-300 hover:bg-dark-500'
                      >
                        CSS
                      </Link>
                    </div>
                  </div>
                  <h3 className='mt-2 text-xs lg:text-base font-semibold px-5 leading-normal text-gray-200 group-hover:text-gray-300'>
                    <Link href='#' className='line-clamp-2'>
                      Tailwind CSS: The Framework That Changed How I Write CSS
                    </Link>
                  </h3>
                  <p className='mt-2 px-5 text-sm text-gray-400 line-clamp-3'>
                    I used to hate writing CSS. There, I said it.
                  </p>
                </article>
              </div>
            </div>
            <div
              className='absolute left-1/2 top-[60%] z-0 -translate-x-1/2 w-[90%] h-full bg-gradient-to-br from-gray-500 to-gray-700 rounded-full opacity-20 blur-3xl '
              aria-hidden='true'
            />
          </div>
        </div>
      </section>

      {/* <ScrollAnimate>
        <section id='dish-listing' className='space-y-10 py-16 px-4 md:px-8'>
          <h2 className='text-center text-2xl font-bold'>{t('h2')}</h2>
          <DishFilter dishes={dishList} dishIndicator={dishIndicator} />
        </section>
      </ScrollAnimate> */}
      <div className='before:animate-rainbow pointer-events-none absolute inset-0 h-24 w-full before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-4/5 before:w-3/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-size-[200%] before:opacity-20 before:filter-[blur(calc(4*1rem))]'></div>
      <div className='before:animate-rainbow pointer-events-none absolute bottom-0 h-24 w-full before:absolute before:top-[-50%] before:left-1/2 before:z-0 before:h-4/5 before:w-3/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-size-[200%] before:opacity-20 before:filter-[blur(calc(4*1rem))]'></div>
    </div>
  )
}
