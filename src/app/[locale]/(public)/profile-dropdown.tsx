'use client'

import { useAppStore } from '@/components/app-provider'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Link } from '@/i18n/routing'

export default function ProfileLoginDropdown() {
  const role = useAppStore((state) => state.role)
  return (
    <>
      {role ? (
        <ProfileDropdown />
      ) : (
        <Link href='/login' className='text-muted-foreground transition-colors hover:text-foreground'>
          Login
        </Link>
      )}
    </>
  )
}
