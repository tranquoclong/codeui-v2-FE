'use client'

import LoginForm, { Forms, RegisterForm } from '../../(auth)/login/login-form'
import { Link } from '@/i18n/routing'
import { useState } from 'react'

export default function Login() {
  const [active, setActive] = useState<boolean>(false)

  return (
    <div
      className='react-responsive-modal-modal relative max-w-[650px] w-full p-8 py-14 overflow-hidden md:p-12 md:py-16 min-h-[500px]'
      role='dialog'
      aria-modal='true'
      data-testid='modal'
      tabIndex={-1}
      style={{
        animation: '300ms ease 0s 1 normal none running react-responsive-modal-modal-in'
      }}
    >
      {active ? (
        <div className='font-semibold modal relative z-10'>
          <div className='mb-4 text-3xl font-bold text-center text-offwhite font-display'>Welcome Back</div>
          <div className='flex flex-col gap-4 mx-auto max-w-[280px] w-full false'>
            <Forms />
          </div>
          <div className='mt-4 text-center text-sm text-gray-400'>
            Dont have an account?{' '}
            <button className='text-indigo-400 hover:text-indigo-300' onClick={() => setActive(false)}>
              Sign up
            </button>
          </div>
        </div>
      ) : (
        <div className='font-semibold modal relative z-10'>
          <div className='mb-4 text-3xl font-bold text-center text-offwhite font-display'>Join the Community</div>
          <div className='flex flex-col gap-4 mx-auto max-w-[280px] w-full false'>
            <RegisterForm />
          </div>
          <div className='mt-4 text-center text-sm text-gray-400'>
            Already have an account?{' '}
            <button className='text-indigo-400 hover:text-indigo-300' onClick={() => setActive(true)}>
              Sign in
            </button>
          </div>
        </div>
      )}
      <div className='hidden md:block image-container w-36 h-36 rotate-[25deg] absolute -top-4 -left-10 ease-in transition-all hover:rotate-[15deg] hover:translate-x-3 hover:scale-105'>
        <img className='absolute' src='https://uiverse.io/assets/astronaut-LQ_BQU63.png' alt='' />
      </div>
      <div className='max-w-[1600px] w-full z-0 rounded-full h-[366px] bg-gradient-to-b from-transparent from-0% via-90% to-100% via-indigo-700 to-transparent absolute bg-opacity-30 left-1/2 -translate-x-1/2 top-[-300px] blur-[100px]' />
    </div>
  )
}
