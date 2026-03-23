import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { AUTH_COOKIE_OPTIONS } from '@/constants/config'

const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7

interface DecodedTokenExpiry {
  exp: number
}

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()
  const decodedAccessToken = jwt.decode(accessToken) as DecodedTokenExpiry
  const decodedRefreshToken = jwt.decode(refreshToken) as DecodedTokenExpiry

  cookieStore.set('accessToken', accessToken, {
    ...AUTH_COOKIE_OPTIONS,
    expires: decodedAccessToken.exp * 1000
  })
  cookieStore.set('refreshToken', refreshToken, {
    ...AUTH_COOKIE_OPTIONS,
    expires: decodedRefreshToken.exp * 1000
  })
}

export async function clearAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
}

export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift()
    return cookieValue
  }
  return undefined
}

export function setCookie(
  name: string,
  value: string,
  maxAge: number = DEFAULT_MAX_AGE
): void {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`
}

export function removeCookie(name: string): void {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=; path=/; max-age=0`
}
