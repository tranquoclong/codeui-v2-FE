import {
  Construction,
  LayoutDashboard,
  Monitor,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Bell,
  Package,
  Palette,
  ServerOff,
  Settings,
  Wrench,
  UserCog,
  UserX,
  Users,
  Component,
  ShieldCheck,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  CodeXml
} from 'lucide-react'
import { type SidebarData } from '../types'
import { Role } from '@/constants/type'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Codeui Admin',
      logo: CodeXml,
      plan: 'codeui - admin',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/manage/dashboard',
          icon: LayoutDashboard,
          roles: [Role.Admin, Role.Moderator]
        },
        {
          title: 'Tasks',
          url: '/manage/tasks',
          icon: ListTodo,
          roles: [Role.Admin, Role.Moderator]
        },
        {
          title: 'Products',
          url: '/manage/products',
          icon: Package,
          roles: [Role.Admin, Role.Moderator]
        },
        {
          title: 'Elements',
          url: '/manage/elements',
          // badge: '3',
          icon: Component,
          roles: [Role.Admin, Role.Moderator]
        },
        // {
        //   title: 'Type Element',
        //   url: '/manage/accounts',
        //   icon: Users,
        // },
        {
          title: 'Users',
          url: '/manage/accounts',
          icon: Users,
          roles: [Role.Admin, Role.Moderator]
        },
        // {
        //   title: 'Secured by Clerk',
        //   icon: 'ClerkLogo',
        //   items: [
        //     {
        //       title: 'Sign In',
        //       url: '/clerk/sign-in',
        //     },
        //     {
        //       title: 'Sign Up',
        //       url: '/clerk/sign-up',
        //     },
        //     {
        //       title: 'User Management',
        //       url: '/clerk/user-management',
        //     },
        //   ],
        // },
      ],
    },
    // {
    //   title: 'Pages',
    //   items: [
    //     {
    //       title: 'Auth',
    //       icon: ShieldCheck,
    //       items: [
    //         {
    //           title: 'Sign In',
    //           url: '/sign-in',
    //         },
    //         {
    //           title: 'Sign In (2 Col)',
    //           url: '/sign-in-2',
    //         },
    //         {
    //           title: 'Sign Up',
    //           url: '/sign-up',
    //         },
    //         {
    //           title: 'Forgot Password',
    //           url: '/forgot-password',
    //         },
    //         {
    //           title: 'OTP',
    //           url: '/otp',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Errors',
    //       icon: Bug,
    //       items: [
    //         {
    //           title: 'Unauthorized',
    //           url: '/errors/unauthorized',
    //           icon: Lock,
    //         },
    //         {
    //           title: 'Forbidden',
    //           url: '/errors/forbidden',
    //           icon: UserX,
    //         },
    //         {
    //           title: 'Not Found',
    //           url: '/errors/not-found',
    //           icon: FileX,
    //         },
    //         {
    //           title: 'Internal Server Error',
    //           url: '/errors/internal-server-error',
    //           icon: ServerOff,
    //         },
    //         {
    //           title: 'Maintenance Error',
    //           url: '/errors/maintenance-error',
    //           icon: Construction,
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/manage/setting',
              icon: UserCog,
              roles: [Role.Admin, Role.Moderator]
            },
            {
              title: 'Account',
              url: '#',
              icon: Wrench,
              roles: [Role.Admin, Role.Moderator]
            },
            {
              title: 'Appearance',
              url: '#',
              icon: Palette,
              roles: [Role.Admin, Role.Moderator]
            },
            {
              title: 'Notifications',
              url: '#',
              icon: Bell,
              roles: [Role.Admin, Role.Moderator]
            },
            {
              title: 'Display',
              url: '#',
              icon: Monitor,
              roles: [Role.Admin, Role.Moderator]
            },
          ],
          roles: [Role.Admin, Role.Moderator]
        },
        {
          title: 'Help Center',
          url: '/long',
          icon: HelpCircle,
          roles: [Role.Admin, Role.Moderator]
        },
      ],
    },
  ],
}
