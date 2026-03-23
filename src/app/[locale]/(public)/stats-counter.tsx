import { Component, Users, ShoppingBag } from 'lucide-react'

interface StatsCounterProps {
  dishCount: number
  orderCount: number
  guestCount: number
}

export default function StatsCounter({ dishCount, orderCount, guestCount }: StatsCounterProps) {
  const stats = [
    { icon: Component, value: dishCount, label: 'Community-made UI elements' },
    { icon: ShoppingBag, value: orderCount, label: 'Free for personal and commercial use' },
    { icon: Users, value: guestCount, label: 'Contributors to the community' }
  ]

  return (
    <section className='py-16 px-4 md:px-8'>
      <div className='max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8'>
        {stats.map((stat) => (
          <div key={stat.label} className='flex flex-col items-center text-center'>
            <div className='w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-3'>
              <stat.icon className='h-14 w-14 text-primary' />
            </div>
            <span className='text-3xl md:text-4xl font-bold'>{stat.value.toLocaleString('vi-VN')}</span>
            <span className='text-xl mt-2 font-semibold text-gray-400'>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

