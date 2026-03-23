'use client'

import { useEffect, useRef } from 'react'

type Props = {
  html: string
  css: string
}

export default function CodePreview({ html, css }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hostRef.current) return

    let shadowRoot = hostRef.current.shadowRoot

    if (!shadowRoot) {
      shadowRoot = hostRef.current.attachShadow({ mode: 'open' })
    }

    shadowRoot.innerHTML = `
      <style>
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }
        ${css}
      </style>
      ${html}
    `
  }, [html, css])
  return (
    <div className='h-full overflow-hidden'>
      <div
        id='container'
        className='w-full h-full  relative flex items-center justify-center cursor-pointer z-[1]'
        style={{ contain: 'content', contentVisibility: 'auto' }}
        ref={hostRef}
      />
      {/* bg-[var(--dark)] */}
    </div>
  )
}
