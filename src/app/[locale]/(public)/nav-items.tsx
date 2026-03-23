'use client'
import { useAppStore } from '@/components/app-provider'
import { Role } from '@/constants/type'
import { RoleType } from '@/types/jwt.types'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

const menuItems: {
  title: string
  href: string
  role?: RoleType[]
  hideWhenLogin?: boolean
}[] = [
  {
    title: 'home',
    href: '/'
  },
  {
    title: 'elements',
    href: '/elements'
  },
  {
    title: 'products',
    href: '/products'
  },
  {
    title: 'menu',
    href: '/guest/menu',
    role: [Role.Guest]
  },
  {
    title: 'orders',
    href: '/guest/orders',
    role: [Role.Guest]
  },
  // {
  //   title: 'login',
  //   href: '/login',
  //   hideWhenLogin: true
  // },
  {
    title: 'manage',
    href: '/manage/dashboard',
    role: [Role.Admin, Role.Moderator]
  }
]
export default function NavItems({ className }: { className?: string }) {
  const t = useTranslations('NavItem')
  const role = useAppStore((state) => state.role)
  return (
    <>
      {menuItems.map((item) => {
        const isAuth = item.role && role && item.role.includes(role)
        const canShow =
          (item.role === undefined && !item.hideWhenLogin) ||
          (!role && item.hideWhenLogin)
        if (isAuth || canShow) {
          return (
            <Link href={item.href} key={item.href} className={className}>
              {t(item.title as any)}
            </Link>
          )
        }
        return null
      })}
    </>
  )
}
