'use client'

import { useEffect, useRef } from 'react'

type Props = {
  isTailwind: boolean
  html: string
  css: string
}

export default function CodePreview({ isTailwind, html, css }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (isTailwind) {
      const iframe = iframeRef.current
      if (!iframe) return

      const doc = iframe.contentDocument
      if (!doc) return

      doc.open()
      doc.write(`
        <!DOCTYPE html>
        <html style="height:100%; background: transparent;">
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              html, body {
                background: transparent !important;   /* ← chỉ transparent, không color */
              }
              ${css}
            </style>
          </head>
          <body style="display:flex;align-items:center;justify-content:center;height:100%;">
            ${html}
          </body>
        </html>
      `)
      doc.close()
    } else {
      if (!hostRef.current) return

      let shadowRoot = hostRef.current.shadowRoot

      if (!shadowRoot) {
        shadowRoot = hostRef.current.attachShadow({ mode: 'open' })
      }

      shadowRoot.innerHTML = `
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          ${css}
        </style>
        ${html}
      `
    }
  }, [html, css, isTailwind])

  return (
    <div className='flex h-full w-full text-black relative z-[1]'>
      {isTailwind ? (
        <iframe
          ref={iframeRef}
          title='Preview Content'
          src='about:blank'
          sandbox='allow-scripts allow-same-origin allow-modals'
          width='100%'
          height='100%'
          style={{
            border: 'none',
            background: 'transparent',
            colorScheme: 'normal',
            display: 'block'
          }}
        />
      ) : (
        <div
          ref={hostRef}
          className='w-full h-full  relative flex items-center justify-center cursor-pointer z-[1]'
          style={{ contain: 'content', contentVisibility: 'auto' }}
        />
      )}
    </div>
  )
}
