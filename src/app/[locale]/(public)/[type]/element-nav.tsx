'use client'

import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  SquarePlay,
  BookOpen,
  ArrowRightLeft,
  CircleCheckBig,
  CardSim,
  Loader,
  TextCursorInput,
  CircleDot,
  Form,
  Wallpaper,
  Copy,
  Bookmark
} from 'lucide-react'

const Array = [
  {
    href: 'elements',
    name: 'All',
    icon: <BookOpen />
  },
  {
    href: 'buttons',
    name: 'Buttons',
    icon: <SquarePlay />
  },
  {
    href: 'checkboxes',
    name: 'Checkboxes',
    icon: <CircleCheckBig />
  },
  {
    href: 'switches',
    name: 'Toggle switches',
    icon: <ArrowRightLeft />
  },
  {
    href: 'cards',
    name: 'Cards',
    icon: <CardSim />
  },
  {
    href: 'loaders',
    name: 'Loaders',
    icon: <Loader />
  },
  {
    href: 'inputs',
    name: 'Inputs',
    icon: <TextCursorInput />
  },
  {
    href: 'radio-buttons',
    name: 'Radio buttons',
    icon: <CircleDot />
  },
  {
    href: 'forms',
    name: 'Forms',
    icon: <Form />
  },
  {
    href: 'patterns',
    name: 'Patterns',
    icon: <Wallpaper />
  },
  {
    href: 'tooltips',
    name: 'Tooltips',
    icon: <Copy />
  },
  {
    href: 'my-favorites',
    name: 'My favorites',
    icon: <Bookmark />
  }
]
export default function ElementNav() {
  const pathname = usePathname()
  return (
    <div className='z-0 h-[calc(100vh_-_66px)] mr-4 sticky top-10 pt-7 pb-4 hidden xl:block'>
      <div className='w-[200px] flex flex-col h-full'>
        <ScrollArea className='relative h-full overflow-hidden'>
          <nav className='h-full overflow-auto custom-scrollbar-transparent'>
            {Array.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  item.href === pathname.slice(1) && 'bg-neutral-800',
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
