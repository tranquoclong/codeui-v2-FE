'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useRouter } from '@/i18n/routing'
import { TYPES } from './data/data'

type Props = {
  open: boolean
  type: { id: number; value: string }
  tech: 'css' | 'tailwind'
  setOpen: (value: boolean) => void
  handleChangeType: (value: { id: number; value: string }) => void
  handleChangeTech: (value: 'css' | 'tailwind') => void
}

export default function ModalType({ open, type, tech, setOpen, handleChangeType, handleChangeTech }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <DialogContent className='max-w-4xl max-h-full overflow-auto'>
        <DialogHeader>
          <DialogTitle>What are you making?</DialogTitle>
        </DialogHeader>
        <div className='self-stretch grid gap-2.5 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]'>
          {TYPES.map((item) => {
            const isActive = type.value === item.value
            return (
              <label
                key={item.value}
                className={`group h-[135px] rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer px-5 py-5 transition-all
            ${
              isActive
                ? 'border-indigo-500 bg-neutral-800/80 scale-95'
                : 'border-neutral-700 bg-neutral-800 hover:border-indigo-600'
            }`}
              >
                <input
                  type='radio'
                  name='option'
                  value={item.value}
                  checked={isActive}
                  onChange={() => handleChangeType({ id: item.id, value: item.value })}
                  className='hidden'
                />

                <div
                  className={`mb-2.5 transition-colors duration-300 ${isActive ? 'text-indigo-500 scale-105' : 'text-neutral-500 group-hover:text-indigo-400'}`}
                >
                  {item.icon}
                </div>

                <span className={`font-semibold ${isActive ? 'text-white' : 'text-neutral-400'}`}>{item.label}</span>
              </label>
            )
          })}
        </div>

        <DialogFooter>
          <div className='flex items-center justify-between mr-0 gap-3.5 flex-col lg:mr-5 lg:flex-row self-end lg:gap-0'>
            <div className='pr-4 font-semibold text-gray-200 text-right'>Technology</div>
            <div className='flex'>
              <button
                onClick={() => handleChangeTech('css')}
                className={`rounded-md inline-flex items-center gap-2 h-10 px-4 py-2 border-2 rounded-r-none transition-colors
    ${
      tech === 'css'
        ? 'border-indigo-500 bg-background text-white'
        : 'border-neutral-700 bg-neutral-800 hover:border-gray-400'
    }`}
              >
                <span className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width={24}
                    height={24}
                    className='w-6 h-6 text-blue-600'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.85l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21L21.94 3z'
                    />
                  </svg>{' '}
                  CSS
                </span>
              </button>
              <button
                onClick={() => handleChangeTech('tailwind')}
                className={`rounded-md inline-flex items-center gap-2 h-10 px-4 py-2 border-2 rounded-l-none transition-colors
    ${
      tech === 'tailwind'
        ? 'border-indigo-500 bg-background text-white'
        : 'border-neutral-700 bg-neutral-800 hover:border-gray-400'
    }`}
              >
                <span className='flex items-center gap-2'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 54 33' className='w-6 h-6'>
                    <g clipPath='url(#prefix__clip0)'>
                      <path
                        fill='#38bdf8'
                        fillRule='evenodd'
                        d='M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z'
                        clipRule='evenodd'
                      />
                    </g>
                    <defs>
                      <clipPath id='prefix__clip0'>
                        <path fill='#fff' d='M0 0h54v32.4H0z' />
                      </clipPath>
                    </defs>
                  </svg>{' '}
                  Tailwind CSS
                </span>
              </button>
            </div>
          </div>
          <button
            className='inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
            onClick={() => {
              setOpen(false)
            }}
          >
            Continue
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
