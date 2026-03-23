'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import Element from '@/components/element'
import { Link } from '@/i18n/routing'
import { useSearchParams, useParams } from 'next/navigation'
import { useElementListQuery } from '@/queries/useElement'
import ElementFilter from './element-filter'
import ElementNav from './element-nav'
const codePreviews = [
  {
    html: '<button class="btn">codeui</button>',
    css: '.btn { padding: 10px 20px; border: none; font-size: 17px; color: #fff; border-radius: 7px; letter-spacing: 4px; font-weight: 700; text-transform: uppercase; transition: 0.5s; transition-property: box-shadow; background: rgb(0,140,255); box-shadow: 0 0 25px rgb(0,140,255); }'
  },
  {
    html: '<button class="btn">codeui</button>',
    css: '.btn { padding: 10px 20px; border: none; font-size: 17px; color: #fff; border-radius: 7px; letter-spacing: 4px; font-weight: 700; text-transform: uppercase; transition: 0.5s; transition-property: box-shadow; background: rgb(0,140,255); box-shadow: 0 0 25px rgb(0,140,255); }'
  },
  {
    html: '<button class="btn">codeui</button>',
    css: '.btn { padding: 10px 20px; border: none; font-size: 17px; color: #fff; border-radius: 7px; letter-spacing: 4px; font-weight: 700; text-transform: uppercase; transition: 0.5s; transition-property: box-shadow; background: rgb(0,140,255); box-shadow: 0 0 25px rgb(0,140,255); }'
  },
  {
    html: '<button>Click me</button>',
    css: 'button { color: #090909; padding: 0.7em 1.7em; font-size: 18px; border-radius: 0.5em; background: #e8e8e8; cursor: pointer; border: 1px solid #e8e8e8; transition: all 0.3s; box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff; } button:active { color: #666; box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff; }'
  }
]

export default function Page() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const orderBy = searchParams.get('orderBy') || 'randomized'
    const theme = searchParams.get('theme') || 'all'
    const t = searchParams.get('t') || 'all'

  const paramss = useMemo(() => ({ page, limit, orderBy, theme, t }), [page, limit, orderBy, theme, t])

  const elementListQuery = useElementListQuery(paramss)
  const refetchElementList = elementListQuery.refetch
  const elementList = elementListQuery.data?.payload?.data ?? []
  return (
    <div className="px-5 py-0 data-[path='/']:px-0 root-container relative flex mb-12">
      <ElementNav />
      <div className='w-full min-w-0 z-10'>
        <main className='w-full'>
          <ElementFilter orderBy={orderBy} theme={theme} t={t} search={search} setSearch={setSearch} />
          <section className='grid gap-y-5 gap-x-3.5 content-stretch items-stretch w-full mb-24 max-xs:grid-cols-1 max-xs:gap-2.5 [grid-template-columns:repeat(auto-fill,minmax(294px,1fr))]'>
            {elementList.map((element) => (
              <Element element={element} key={element.id} />
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
