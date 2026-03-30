import Modal from './modal'
import { setRequestLocale } from 'next-intl/server'
import Logout from '../../(auth)/login/logout'
import Login from './login'

export default async function LoginPage(props: {
  params: Promise<{
    locale: string
  }>
}) {
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)

  return (
    <Modal>
      <Login/>
      <Logout />
    </Modal>
  )
}
