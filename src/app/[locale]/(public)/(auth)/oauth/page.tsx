import OauthForm from '@/app/[locale]/(public)/(auth)/oauth/oauth-form'
import envConfig, { Locale } from '@/config'

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>
}) {
  const params = await props.params
  const { locale } = params
  const url = envConfig.NEXT_PUBLIC_URL + `/${locale}/oauth`

  return {
    title: 'Google Login Redirect',
    description: 'Google Login Redirect',
    alternates: {
      canonical: url
    }
  }
}

export default async function OAuth(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params

  const { locale } = params
  return <OauthForm/>
}
