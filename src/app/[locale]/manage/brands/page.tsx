import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import BrandTable from '@/app/[locale]/manage/brands/brand-table'
import { Suspense } from 'react'
import envConfig, { Locale } from '@/config'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ErrorBoundary } from '@/components/error-boundary'
type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'Brand'
  })

  const url = envConfig.NEXT_PUBLIC_URL + `/${params.locale}/manage/brands`

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

export default function BrandsPage() {
  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='space-y-2'>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardHeader>
            <CardTitle>Type</CardTitle>
            <CardDescription>Quản lý Type</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <ErrorBoundary>
                <BrandTable />
              </ErrorBoundary>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
