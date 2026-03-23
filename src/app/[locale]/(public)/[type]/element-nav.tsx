'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

const Array = [
  {
    href: 'elements',
    name: 'All',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='M12 5.066V21.5m0-16.434c3.025-1.1 7.005-1.71 10 0v15.5c-3.197-1.37-7.063-.401-10 .934m0-16.434c-3.025-1.1-7.005-1.71-10 0v15.5c3.197-1.37 7.063-.401 10 .934' />
      </svg>
    )
  },
  {
    href: 'buttons',
    name: 'Buttons',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='M3 12c0-2.796 0-4.193.457-5.296a6 6 0 0 1 3.247-3.247C7.807 3 9.204 3 12 3c2.796 0 4.194 0 5.296.457a6 6 0 0 1 3.247 3.247C21 7.807 21 9.204 21 12c0 2.796 0 4.194-.457 5.296a6 6 0 0 1-3.247 3.247C16.194 21 14.796 21 12 21c-2.796 0-4.193 0-5.296-.457a6 6 0 0 1-3.247-3.247C3 16.194 3 14.796 3 12Z' />
        <path d='M9.5 11.896c0-1.432 0-2.148.3-2.547a1.5 1.5 0 0 1 1.093-.598c.498-.035 1.1.352 2.305 1.126l.162.104c1.045.672 1.567 1.008 1.748 1.435a1.5 1.5 0 0 1 0 1.168c-.18.427-.703.763-1.748 1.435l-.162.104c-1.205.774-1.807 1.161-2.305 1.126A1.5 1.5 0 0 1 9.8 14.65c-.299-.4-.299-1.115-.299-2.547v-.208Z' />
      </svg>
    )
  },
  {
    href: 'checkboxes',
    name: 'Checkboxes',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='m8.5 12.512 2.341 2.339A14.985 14.985 0 0 1 15.4 9.915l.101-.069M12 21c-2.796 0-4.193 0-5.296-.457a6 6 0 0 1-3.247-3.247C3 16.194 3 14.796 3 12c0-2.796 0-4.193.457-5.296a6 6 0 0 1 3.247-3.247C7.807 3 9.204 3 12 3c2.796 0 4.194 0 5.296.457a6 6 0 0 1 3.247 3.247C21 7.807 21 9.204 21 12c0 2.796 0 4.194-.457 5.296a6 6 0 0 1-3.247 3.247C16.194 21 14.796 21 12 21Z' />
      </svg>
    )
  },
  {
    href: 'switches',
    name: 'Toggle switches',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='M6.887 12a20.152 20.152 0 0 0-3.747 3.604A.632.632 0 0 0 3 16m3.887 4a20.152 20.152 0 0 1-3.747-3.604A.632.632 0 0 1 3 16m0 0h14m.113-12a20.155 20.155 0 0 1 3.747 3.604c.093.116.14.256.14.396m-3.887 4a20.153 20.153 0 0 0 3.747-3.604A.633.633 0 0 0 21 8m0 0H7' />
      </svg>
    )
  },
  {
    href: 'cards',
    name: 'Cards',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='M20 11a3 3 0 0 0-3-3h-.6c-.372 0-.557 0-.713-.025a2 2 0 0 1-1.662-1.662C14 6.157 14 5.972 14 5.6V5a3 3 0 0 0-3-3m9 8v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h4a8 8 0 0 1 8 8Z' />
      </svg>
    )
  },
  {
    href: 'loaders',
    name: 'Loaders',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='M12 2v4m0 12v4M6 12H2m20 0h-4m1.078 7.078L16.25 16.25M19.078 5 16.25 7.828M4.922 19.078 7.75 16.25M4.922 5 7.75 7.828' />
      </svg>
    )
  },
  {
    href: 'inputs',
    name: 'Inputs',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='M17 17H7c-.93 0-1.394 0-1.78-.077a4 4 0 0 1-3.143-3.143C2 13.394 2 12.93 2 12s0-1.394.077-1.78A4 4 0 0 1 5.22 7.077C5.606 7 6.07 7 7 7h10m0 10V7m0 10c0 .93 0 1.395-.102 1.776a3 3 0 0 1-2.121 2.122C14.395 21 13.93 21 13 21m4-4c0 .93 0 1.395.102 1.776a3 3 0 0 0 2.122 2.122C19.605 21 20.07 21 21 21M17 7c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.121-2.122C14.395 3 13.93 3 13 3m4 4c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.122-2.122C19.605 3 20.07 3 21 3m-1 4.536a4 4 0 0 1 1.923 2.684c.077.386.077.85.077 1.78s0 1.394-.077 1.78A4 4 0 0 1 20 16.464M7 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z' />
      </svg>
    )
  },
  {
    href: 'radio-buttons',
    name: 'Radio buttons',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='M2.85 12a9.15 9.15 0 1 0 18.3 0 9.15 9.15 0 0 0-18.3 0Z' />
        <path d='M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' />
      </svg>
    )
  },
  {
    href: 'forms',
    name: 'Forms',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='M16 4.038V4c0-.465 0-.697-.051-.888a1.5 1.5 0 0 0-1.06-1.06C14.697 2 14.464 2 14 2h-4c-.465 0-.697 0-.888.051a1.5 1.5 0 0 0-1.06 1.06C8 3.304 8 3.536 8 4v.038m8 0c0 .44-.001.665-.051.85a1.5 1.5 0 0 1-1.06 1.06C14.697 6 14.464 6 14 6h-4c-.465 0-.697 0-.888-.051a1.5 1.5 0 0 1-1.06-1.06C8.001 4.702 8 4.477 8 4.038m8 0c.784.047 1.34.155 1.816.397a4 4 0 0 1 1.748 1.748C20 7.04 20 8.16 20 10.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C16.96 22 15.84 22 13.6 22h-3.2c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C4 18.96 4 17.84 4 15.6v-5.2c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748c.475-.242 1.032-.35 1.816-.398M8 11h.001M8 16h.001M11 11h5m-5 5h5' />
      </svg>
    )
  },
  {
    href: 'patterns',
    name: 'Patterns',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='M3 10.293C6.588 7.09 12.05 4.308 17.514 3.03c1.118-.261 1.753 1.234.789 1.858-3.946 2.55-8.186 5.744-11.089 9.453-.352.338.061.903.49.67 3.588-1.944 7.48-4.187 11.694-3.926.543.034.7.76.218 1.014-3.495 1.726-6.256 3.63-8.45 6.17-.718.636-.026 1.794.873 1.462 1.802-.713 6.623-3.832 7.82-.878' />
      </svg>
    )
  },
  {
    href: 'tooltips',
    name: 'Tooltips',
    icon: (
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={24}
        height={24}
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      >
        <path d='M9.281 9.719A2.719 2.719 0 1 1 13.478 12c-.724.47-1.478 1.137-1.478 2m0 3h.001M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
      </svg>
    )
  },
  {
    href: 'my-favorites',
    name: 'My favorites',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        className='w-5 h-5'
      >
        <path d='M5 9c0-1.861 0-2.792.245-3.545a5 5 0 0 1 3.21-3.21C9.208 2 10.139 2 12 2s2.792 0 3.545.245a5 5 0 0 1 3.21 3.21C19 6.208 19 7.139 19 9v13l-1.794-1.537c-1.848-1.584-2.771-2.376-3.808-2.678a5 5 0 0 0-2.796 0c-1.037.302-1.96 1.094-3.808 2.678L5 22V9Z' />
      </svg>
    )
  }
]
export default function ElementNav() {

  return (
    <div className='z-0 h-[calc(100vh_-_66px)] mr-4 sticky -top-3 pt-7 pb-4 hidden xl:block'>
      <div className='w-[200px] flex flex-col h-full'>
        <ScrollArea className='relative h-full overflow-hidden'>
          <nav className='h-full overflow-auto custom-scrollbar-transparent'>
            {Array.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  item.href === 'css' && 'bg-neutral-800',
                  'hover:bg-neutral-800 transition-colors tracking-wide flex items-center gap-2 font-normal text-sm px-4 pl-3 mb-1 mr-3 py-2.5 rounded-lg tab--elements'
                )}
              >
                <div className='flex items-center gap-2 '>
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className='flex-shrink-0 h-[240px] pt-2 pb-2 mb-2' />
      </div>
    </div>
  )
}
