'use client'

import { useAppStore } from '@/components/app-provider'
import { toast } from '@/components/ui/use-toast'
import { decodeToken, generateSocketInstance } from '@/lib/utils'
import { useRouter } from '@/i18n/routing'
import { useSetTokenToCookieMutation } from '@/queries/useAuth'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function OauthForm() {
  const { mutateAsync } = useSetTokenToCookieMutation()
  const router = useRouter()
  const count = useRef(0)
  const setSocket = useAppStore((state) => state.setSocket)
  const setRole = useAppStore((state) => state.setRole)

  const searchParams = useSearchParams()
  const rawData = searchParams.get('data')
  useEffect(() => {
    if (!rawData || count.current > 0) return
    try {
      const parsed = JSON.parse(decodeURIComponent(rawData))
      mutateAsync({
        accessToken: parsed.accessToken,
        refreshToken: parsed.refreshToken
      })
        .then(() => {
          setRole(parsed?.account?.roleName)
          // setSocket(generateSocketInstance(accessToken))
          router.replace('/')
        })
        .catch((e) => {
          toast({ description: e.message || 'Có lỗi xảy ra' })
        })
      count.current++
    } catch (err) {
      toast({ description: 'Parse data lỗi' })
      count.current++
    }
  }, [rawData, setRole, router, setSocket, mutateAsync])
  return null
}
