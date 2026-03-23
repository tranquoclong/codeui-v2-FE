import ElementTable from '@/app/[locale]/manage/elements/element-table'
import { Suspense } from 'react'
import envConfig, { Locale } from '@/config'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'Elements'
  })

  const url = envConfig.NEXT_PUBLIC_URL + `/${params.locale}/manage/elements`

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url
    },
    robots: {
      index: false
    }
  }
}

export default async function AccountsPage() {
  return (
    <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Elements</h2>
          <p className='text-muted-foreground'>Quản lý Elements</p>
        </div>
      </div>
      <Suspense>
        <ElementTable />
      </Suspense>
    </div>
  )
}
