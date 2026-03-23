'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useRouter } from '@/i18n/routing'

type Props = {
  open: boolean
  type: string
  tech: 'css' | 'tailwind'
  setOpen: (value: boolean) => void
  handleChangeType: (value: string) => void
  handleChangeTech: (value: 'css' | 'tailwind') => void
}

const TYPES = [
  {
    value: 'button',
    label: 'Button',
    icon: (
      <svg
        width={83}
        height={34}
        viewBox='0 0 83 34'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect width={83} height={34} rx={17} fill='currentColor' />
        <rect x={25} y={15} width={46} height={5} rx='2.5' fill='white' />
        <rect x={11} y={14} width={7} height={7} rx='3.5' fill='white' />
      </svg>
    )
  },
  {
    value: 'switch',
    label: 'Toggle switch',
    icon: (
      <svg
        width={54}
        height={28}
        viewBox='0 0 54 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect width={54} height={28} rx={14} fill='currentColor' />
        <circle cx={15} cy={14} r={8} fill='white' />
      </svg>
    )
  },
  {
    value: 'checkbox',
    label: 'Checkbox',
    icon: (
      <svg
        width={30}
        height={30}
        viewBox='0 0 30 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect width={30} height={30} rx={9} fill='currentColor' />
        <path
          d='M6 16.0481L12.375 22.1667L24.3005 9.99608L22.286 8L12.3396 18.1759L7.97625 14.0152L6 16.0481Z'
          fill='white'
        />
      </svg>
    )
  },
  {
    value: 'card',
    label: 'Card',
    icon: (
      <svg
        width={32}
        height={44}
        viewBox='0 0 32 44'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect x={32} width={44} height={32} rx={4} transform='rotate(90 32 0)' fill='currentColor' />
        <rect x={6} y={7} width={20} height={4} rx={2} fill='white' />
        <rect x={6} y={14} width={11} height={4} rx={2} fill='white' />
      </svg>
    )
  },
  {
    value: 'loader',
    label: 'Loader',
    icon: (
      <svg
        width={41}
        height={41}
        viewBox='0 0 41 41'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <path
          d='M20.5002 3.41675C20.9533 3.41675 21.3878 3.59673 21.7082 3.91711C22.0285 4.23748 22.2085 4.672 22.2085 5.12508V10.2501C22.2085 10.7032 22.0285 11.1377 21.7082 11.4581C21.3878 11.7784 20.9533 11.9584 20.5002 11.9584C20.0471 11.9584 19.6126 11.7784 19.2922 11.4581C18.9718 11.1377 18.7918 10.7032 18.7918 10.2501V5.12508C18.7918 4.672 18.9718 4.23748 19.2922 3.91711C19.6126 3.59673 20.0471 3.41675 20.5002 3.41675V3.41675ZM20.5002 29.0417C20.9533 29.0417 21.3878 29.2217 21.7082 29.5421C22.0285 29.8625 22.2085 30.297 22.2085 30.7501V35.8751C22.2085 36.3282 22.0285 36.7627 21.7082 37.0831C21.3878 37.4034 20.9533 37.5834 20.5002 37.5834C20.0471 37.5834 19.6126 37.4034 19.2922 37.0831C18.9718 36.7627 18.7918 36.3282 18.7918 35.8751V30.7501C18.7918 30.297 18.9718 29.8625 19.2922 29.5421C19.6126 29.2217 20.0471 29.0417 20.5002 29.0417V29.0417ZM35.2943 11.9584C35.5209 12.3508 35.5823 12.8171 35.465 13.2547C35.3478 13.6923 35.0615 14.0655 34.6691 14.292L30.2308 16.8545C30.0365 16.9684 29.8215 17.0428 29.5983 17.0733C29.3751 17.1039 29.148 17.0899 28.9302 17.0323C28.7124 16.9747 28.5081 16.8746 28.3292 16.7378C28.1502 16.6009 28.0001 16.43 27.8874 16.2349C27.7748 16.0398 27.7018 15.8244 27.6728 15.6009C27.6437 15.3775 27.6592 15.1506 27.7182 14.9331C27.7772 14.7157 27.8787 14.5121 28.0167 14.3341C28.1548 14.156 28.3267 14.007 28.5225 13.8957L32.9608 11.3332C33.3531 11.1066 33.8194 11.0452 34.257 11.1625C34.6947 11.2798 35.0678 11.5661 35.2943 11.9584V11.9584ZM13.1031 24.7709C13.3296 25.1633 13.391 25.6296 13.2738 26.0672C13.1565 26.5048 12.8702 26.878 12.4778 27.1045L8.0396 29.667C7.84524 29.7809 7.63026 29.8553 7.40705 29.8858C7.18383 29.9164 6.95678 29.9024 6.73897 29.8448C6.52115 29.7872 6.31688 29.6871 6.13792 29.5503C5.95895 29.4134 5.80882 29.2425 5.69617 29.0474C5.58352 28.8523 5.51057 28.6369 5.48154 28.4134C5.4525 28.19 5.46794 27.9631 5.52697 27.7457C5.58599 27.5282 5.68745 27.3246 5.82548 27.1466C5.96352 26.9685 6.13541 26.8195 6.33127 26.7082L10.7695 24.1457C11.1619 23.9191 11.6282 23.8577 12.0658 23.975C12.5034 24.0923 12.8766 24.3786 13.1031 24.7709ZM35.2943 29.0417C35.0678 29.4341 34.6947 29.7204 34.257 29.8377C33.8194 29.9549 33.3531 29.8935 32.9608 29.667L28.5225 27.1045C28.1333 26.8763 27.8502 26.5035 27.7349 26.0674C27.6196 25.6313 27.6815 25.1672 27.907 24.7766C28.1326 24.3859 28.5035 24.1003 28.9389 23.9821C29.3743 23.8639 29.8387 23.9227 30.2308 24.1457L34.6691 26.7082C35.0615 26.9347 35.3478 27.3078 35.465 27.7455C35.5823 28.1831 35.5209 28.6494 35.2943 29.0417ZM13.1031 16.2292C12.8766 16.6216 12.5034 16.9079 12.0658 17.0252C11.6282 17.1424 11.1619 17.081 10.7695 16.8545L6.33127 14.292C6.13541 14.1806 5.96352 14.0317 5.82548 13.8536C5.68745 13.6755 5.58599 13.4719 5.52697 13.2545C5.46794 13.0371 5.4525 12.8101 5.48154 12.5867C5.51057 12.3633 5.58352 12.1478 5.69617 11.9527C5.80882 11.7576 5.95895 11.5867 6.13792 11.4499C6.31688 11.313 6.52115 11.2129 6.73897 11.1553C6.95678 11.0977 7.18383 11.0838 7.40705 11.1143C7.63026 11.1449 7.84524 11.2192 8.0396 11.3332L12.4778 13.8957C12.8702 14.1222 13.1565 14.4953 13.2738 14.933C13.391 15.3706 13.3296 15.8369 13.1031 16.2292Z'
          fill='currentColor'
        />
      </svg>
    )
  },
  {
    value: 'input',
    label: 'Input',
    icon: (
      <svg
        width={76}
        height={30}
        viewBox='0 0 76 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect x='1.5' y='1.5' width={73} height={27} rx='7.5' stroke='currentColor' strokeWidth={3} />
        <rect x={10} y={15} width={7} height={7} rx='3.5' fill='currentColor' />
        <rect x={19} y={15} width={7} height={7} rx='3.5' fill='currentColor' />
        <rect x={28} y={15} width={7} height={7} rx='3.5' fill='currentColor' />
      </svg>
    )
  },
  {
    value: 'form',
    label: 'Form',
    icon: (
      <svg
        width={60}
        height={60}
        viewBox='0 0 97 97'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect x={18} y={42} width={62} height={12} rx={6} fill='currentColor' />
        <rect x={18} y={22} width={62} height={12} rx={6} fill='currentColor' />
        <rect x={45} y={62} width={35} height={13} rx='6.5' fill='currentColor' />
      </svg>
    )
  },
  {
    value: 'pattern',
    label: 'Pattern',
    icon: (
      <svg
        width={60}
        viewBox='0 0 38 37'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect y='14.1421' width={20} height={4} rx={2} transform='rotate(-45 0 14.1421)' fill='currentColor' />
        <rect
          x='1.66541'
          y='22.4767'
          width='29.4315'
          height={4}
          rx={2}
          transform='rotate(-45 1.66541 22.4767)'
          fill='currentColor'
        />
        <rect
          x='2.99329'
          y='32.1488'
          width='42.6463'
          height={4}
          rx={2}
          transform='rotate(-45 2.99329 32.1488)'
          fill='currentColor'
        />
        <rect
          x='12.0931'
          y='33.049'
          width='31.0501'
          height={4}
          rx={2}
          transform='rotate(-45 12.0931 33.049)'
          fill='currentColor'
        />
        <rect x={21} y='34.1421' width={20} height={4} rx={2} transform='rotate(-45 21 34.1421)' fill='currentColor' />
      </svg>
    )
  },
  {
    value: 'radio',
    label: 'Radio buttons',
    icon: (
      <svg
        width={70}
        viewBox='0 0 80 70'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <circle cx='40.2632' cy={35} r={10} fill='currentColor' />
        <circle cx='65.5263' cy={35} r={10} fill='currentColor' />
        <circle cx={15} cy={35} r={10} fill='currentColor' />
        <circle cx={15} cy={35} r='5.78947' fill='#F6F6F6' />
      </svg>
    )
  },
  {
    value: 'tooltip',
    label: 'Tooltips',
    icon: (
      <svg
        height={60}
        viewBox='0 0 56 21'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <path
          d='M5 0C2.23858 0 0 2.23858 0 5V12C0 14.7614 2.23858 17 5 17H23.8508L27.3231 20.4723C27.8503 20.9996 28.7051 20.9996 29.2323 20.4723L32.7047 17H51C53.7614 17 56 14.7614 56 12V5C56 2.23858 53.7614 0 51 0H5Z'
          fill='currentColor'
        />
        <path
          d='M8 8.5C8 7.67157 8.67157 7 9.5 7H46.5C47.3284 7 48 7.67157 48 8.5C48 9.32843 47.3284 10 46.5 10H9.5C8.67157 10 8 9.32843 8 8.5Z'
          fill='white'
        />
      </svg>
    )
  }
]
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
            const isActive = type === item.value
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
                  onChange={() => handleChangeType(item.value)}
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
