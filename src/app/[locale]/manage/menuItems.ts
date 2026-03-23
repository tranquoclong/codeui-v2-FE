import { Role } from '@/constants/type'
import { Home, ShoppingCart, Users2, Salad, Table, Users } from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    Icon: Home,
    href: '/manage/dashboard',
    roles: [Role.Admin, Role.Moderator]
  },
  {
    title: 'Elements',
    Icon: Home,
    href: '/manage/elements',
    roles: [Role.Admin, Role.Moderator]
  },
  {
    title: 'Đơn hàng',
    Icon: ShoppingCart,
    href: '/manage/orders',
    roles: [Role.Admin, Role.Moderator]
  },
  {
    title: 'Bàn ăn',
    Icon: Table,
    href: '/manage/tables',
    roles: [Role.Admin, Role.Moderator]
  },
  {
    title: 'Món ăn',
    Icon: Salad,
    href: '/manage/dishes',
    roles: [Role.Admin, Role.Moderator]
  },
  {
    title: 'Khách hàng',
    Icon: Users,
    href: '/manage/guests',
    roles: [Role.Admin, Role.Moderator]
  },
  {
    title: 'Nhân viên',
    Icon: Users2,
    href: '/manage/accounts',
    roles: [Role.Admin]
  }
]

export default menuItems
