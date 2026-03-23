import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import AccountTable from '@/app/[locale]/manage/accounts/account-table'
import { Suspense } from 'react'
import envConfig, { Locale } from '@/config'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import { Main } from '@/components/layout/main'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'ManageAccounts'
  })

  const url = envConfig.NEXT_PUBLIC_URL + `/${params.locale}/manage/accounts`

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
  const cookieStore = await cookies()
  return (
    <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Tài khoản</h2>
          <p className='text-muted-foreground'>Quản lý tài khoản nhân viên</p>
        </div>
        {/* <UsersPrimaryButtons /> */}
      </div>
      <Suspense>
        <AccountTable />
      </Suspense>
      {/* <div className='space-y-2'>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardHeader>
            <CardTitle>Tài khoản</CardTitle>
            <CardDescription>Quản lý tài khoản nhân viên</CardDescription>
          </CardHeader>
          <Suspense>
            <AccountTable />
          </Suspense>
        </Card>
      </div> */}
    </div>
  )
}
