import { Role } from '@/constants/type'
import z from 'zod'

export const LoginBody = z
  .object({
    email: z.string().min(1, { message: 'required' }).email({
      message: 'invalidEmail'
    }),
    password: z.string().min(6, 'minmaxPassword').max(100, 'minmaxPassword')
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  account: z.object({
    name: z.string(),
    email: z.string(),
    roleName: z.enum([Role.Admin, Role.Moderator]),
    avatar: z.string().nullable()
  })
})

export type LoginResType = z.TypeOf<typeof LoginRes>

export const RefreshTokenBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>

export const RefreshTokenRes = z.object({
  accessToken: z.string(),
  refreshToken: z.string()
})

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>

export const LogoutBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type LogoutBodyType = z.TypeOf<typeof LogoutBody>

export const LoginGoogleQuery = z.object({
  code: z.string()
})

export type LoginGoogleQueryType = z.TypeOf<typeof LoginGoogleQuery>
