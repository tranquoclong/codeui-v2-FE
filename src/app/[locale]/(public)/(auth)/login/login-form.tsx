'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { LoginBody, LoginBodyType, RegisterBodyType, RegisterBodySchema } from '@/schemaValidations/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation, useRegisterMutation, useOtpMutation, useLoginWithGoogleMutation } from '@/queries/useAuth'
import { toast } from '@/components/ui/use-toast'
import { generateSocketInstance, handleErrorApi } from '@/lib/utils'
import { useRouter } from '@/i18n/routing'
import { useEffect, useState, useRef } from 'react'
import { useAppStore } from '@/components/app-provider'
import { useTranslations } from 'next-intl'
import SearchParamsLoader, { useSearchParamsLoader } from '@/components/search-params-loader'
import { LoaderCircle } from 'lucide-react'

function LoginWithGoogle() {
  const t = useTranslations('Login')
  const googleLoginMutation = useLoginWithGoogleMutation()
  const handleLoginGoogle = async () => {
    if (googleLoginMutation.isPending) return

    try {
      const res = await googleLoginMutation.mutateAsync()
      const url = res.payload?.url
      if (!url) throw new Error('No redirect URL')
      window.location.href = url
    } catch (err) {
      console.error(err)
      toast({
        description: 'Login Google failed'
      })
    }
  }
  return (
    <Button
      type='button'
      onClick={handleLoginGoogle}
      disabled={googleLoginMutation.isPending}
      className='inline-flex items-center gap-2 justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-neutral-800 text-secondary-foreground hover:bg-neutral-700 h-11 rounded-md px-8 w-full'
    >
      <svg viewBox='0 0 24 24' className='w-5 h-5'>
        <path
          d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
          fill='#4285F4'
        />
        <path
          d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
          fill='#34A853'
        />
        <path
          d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
          fill='#FBBC05'
        />
        <path
          d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
          fill='#EA4335'
        />
        <path d='M1 1h22v22H1z' fill='none' />
      </svg>
      {t('loginWithGoogle')}
    </Button>
  )
}

export function Forms() {
  const t = useTranslations('Login')
  const errorMessageT = useTranslations('ErrorMessage')
  const loginMutation = useLoginMutation()
  const setSocket = useAppStore((state) => state.setSocket)
  const setRole = useAppStore((state) => state.setRole)

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody) as any,
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const router = useRouter()

  const onSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return
    try {
      const result = await loginMutation.mutateAsync(data)
      toast({
        description: 'đăng nhập thành công'
      })
      setRole(result.payload.account.roleName)
      router.push('/')
      // setSocket(generateSocketInstance(result.payload.accessToken))
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
        noValidate
        onSubmit={form.handleSubmit(onSubmit, (err) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Form validation errors:', err)
          }
        })}
      >
        <div className='grid gap-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field, formState: { errors } }) => (
              <FormItem>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' type='email' placeholder='m@example.com' required {...field} />
                  <FormMessage>
                    {Boolean(errors.email?.message) && errorMessageT(errors.email?.message as any)}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field, formState: { errors } }) => (
              <FormItem>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                  </div>
                  <Input id='password' type='password' required {...field} />
                  <FormMessage>
                    {Boolean(errors.password?.message) && errorMessageT(errors.password?.message as any)}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            {loginMutation.isPending && <LoaderCircle className='w-5 h-5 mr-2 animate-spin' />}
            {t('buttonLogin')}
          </Button>
          <LoginWithGoogle />
        </div>
      </form>
    </Form>
  )
}

export function RegisterForm() {
  const t = useTranslations('Register')
  const errorMessageT = useTranslations('ErrorMessage')

  const registerMutation = useRegisterMutation()
  const otpMutation = useOtpMutation()

  const setRole = useAppStore((state) => state.setRole)
  const router = useRouter()

  const [countdown, setCountdown] = useState(0)
  const otpRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBodySchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      code: ''
    }
  })

  const emailValue = form.watch('email')

  useEffect(() => {
    form.setValue('code', '')
  }, [form, emailValue])

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSendOtp = async () => {
    const email = form.getValues('email')
    if (!isValidEmail(email)) {
      toast({ description: 'Email không hợp lệ' })
      return
    }
    if (otpMutation.isPending || countdown > 0) return
    try {
      await otpMutation.mutateAsync({
        email,
        type: 'REGISTER'
      })
      toast({
        description: 'OTP đã gửi, check email nhé'
      })
      setCountdown(60)
      setTimeout(() => {
        otpRef.current?.focus()
      }, 100)
    } catch {
      toast({
        description: 'Gửi OTP thất bại'
      })
    }
  }

  const onSubmit = async (data: RegisterBodyType) => {
    if (registerMutation.isPending) return
    try {
      const result = await registerMutation.mutateAsync(data)
      toast({ description: 'Đăng ký thành công' })
      setRole(result.payload.account.roleName)
      router.push('/')
      // setSocket(generateSocketInstance(result.payload.accessToken))
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  return (
    <Form {...form}>
      <form className='space-y-3 max-w-[600px] w-full' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <Label>Name</Label>
              <Input {...field} />
              <FormMessage>{errors.name?.message && errorMessageT(errors.name.message as any)}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <Label>Email</Label>
              <Input {...field} />
              <FormMessage>{errors.email?.message && errorMessageT(errors.email.message as any)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <Label>Phone</Label>
              <Input {...field} />
              <FormMessage>
                {errors.phoneNumber?.message && errorMessageT(errors.phoneNumber.message as any)}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <Label>Password</Label>
              <Input type='password' {...field} />
              <FormMessage>{errors.password?.message && errorMessageT(errors.password.message as any)}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <Label>Confirm Password</Label>
              <Input type='password' {...field} />
              <FormMessage>
                {errors.confirmPassword?.message && errorMessageT(errors.confirmPassword.message as any)}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='code'
            render={({ field, formState: { errors } }) => (
              <FormItem className='flex-1'>
                <Label>OTP</Label>
                <Input {...field} ref={otpRef} />
                <FormMessage>{errors.code?.message && errorMessageT(errors.code.message as any)}</FormMessage>
              </FormItem>
            )}
          />

          <Button
            type='button'
            onClick={handleSendOtp}
            disabled={!isValidEmail(emailValue) || countdown > 0}
            className='mt-6'
          >
            {countdown > 0 ? `Gửi lại (${countdown}s)` : 'Gửi OTP'}
          </Button>
        </div>
        <Button type='submit' className='w-full'>
          {registerMutation.isPending && <LoaderCircle className='w-5 h-5 mr-2 animate-spin' />}
          {t('buttonRegister')}
        </Button>

        <LoginWithGoogle />
      </form>
    </Form>
  )
}

export default function LoginForm() {
  const t = useTranslations('Login')
  const { searchParams, setSearchParams } = useSearchParamsLoader()
  const clearTokens = searchParams?.get('clearTokens')
  const setRole = useAppStore((state) => state.setRole)
  useEffect(() => {
    if (clearTokens) {
      setRole()
    }
  }, [clearTokens, setRole])
  return (
    <Card className='mx-auto max-w-sm'>
      <SearchParamsLoader onParamsReceived={setSearchParams} />
      <CardHeader>
        <CardTitle className='text-2xl'>{t('title')}</CardTitle>
        <CardDescription>{t('cardDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Forms />
      </CardContent>
    </Card>
  )
}
