'use client'

import { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Check, Copy } from 'lucide-react'
import CodePreview from '@/components/codePreview'

type Props = {
  type: string
  tech: 'css' | 'tailwind'
  htmlText: string
  cssText: string
  color: '#212121' | '#e8e8e8'
  theme: 'DARK' | 'LIGHT'
  onChangeHtml: (v: string) => void
  onChangeCss: (v: string) => void
  setTheme: (v: 'DARK' | 'LIGHT') => void
  setColor: (v: '#212121' | '#e8e8e8') => void
}

export default function EditorElement({
  type,
  tech,
  htmlText,
  cssText,
  color,
  theme,
  onChangeHtml,
  onChangeCss,
  setTheme,
  setColor
}: Props) {
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html')
  const [copied, setCopied] = useState(false)

  const currentCode = activeTab === 'html' ? htmlText : cssText

  const handleChange = (value: string | undefined) => {
    if (activeTab === 'html') {
      onChangeHtml(value ?? '')
    } else {
      onChangeCss(value ?? '')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (err) {
      console.error('Copy failed', err)
    }
  }

  const isTailwind = tech === 'tailwind'

  return (
    <div className='block md:flex md:min-h-[200px] rounded-xl overflow-hidden md:resize-y max-w-full md:flex-row md:h-[calc(100vh-220px)]'>
      <div className='flex relative md:min-w-[330px] w-1/2 max-md:min-h-[450px] max-md:w-full h-[calc(100vh-140px)] md:h-auto min-h-0'>
        <div
          className='flex flex-1 absolute w-full left-0 top-0 py-10 h-full font-sans border-none'
          style={{ background: color }}
        >
          <div className='flex h-full w-full text-black border-none preview-container'>
            <div
              className='flex items-center justify-center h-full w-full relative z-[1] transform-cpu overflow-hidden'
              id='shadow-root-div-ready'
            >
              <CodePreview html={htmlText} css={cssText} />
            </div>
          </div>
          <div className='p-4 flex items-center border-none gap-3 absolute top-0 right-0 z-10'>
            <span
              className='font-semibold border-none'
              style={{
                color: theme === 'DARK' ? '#e8e8e8' : '#212121'
              }}
            >
              {theme === 'DARK' ? '#212121' : '#e8e8e8'}
            </span>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only peer'
                checked={theme === 'DARK'}
                onChange={(e) => {
                  setTheme(e.target.checked ? 'DARK' : 'LIGHT')
                  setColor(e.target.checked ? '#212121' : '#e8e8e8')
                }}
              />
              <div className="group peer ring-0 bg-neutral-700  rounded-full outline-none duration-300 after:duration-300 w-16 h-8  shadow-md peer-checked:bg-neutral-400  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95">
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute  top-1.5 left-10 stroke-gray-900 w-5 h-5'
                >
                  <path
                    d='M12 23V22M4.22183 19.7782L4.92893 19.0711M1 12H2M4.22183 4.22183L4.92893 4.92893M12 2V1M19.0711 4.92893L19.7782 4.22183M22 12H23M19.0711 19.0711L19.7782 19.7782M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute top-1.5 left-1 stroke-gray-900  w-5 h-5'
                >
                  <path
                    d='M21 13.9066C19.805 14.6253 18.4055 15.0386 16.9095 15.0386C12.5198 15.0386 8.9612 11.4801 8.9612 7.09034C8.9612 5.59439 9.37447 4.19496 10.0931 3C6.03221 3.91866 3 7.5491 3 11.8878C3 16.9203 7.07968 21 12.1122 21C16.451 21 20.0815 17.9676 21 13.9066Z'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </label>

            <label
              htmlFor='color5123123'
              className='border-gray-300 border-[3px] border-solid w-[30px] h-[30px] rounded-md block  cursor-pointer'
              style={{ backgroundColor: 'rgb(232, 232, 232)' }}
            >
              <input
                type='color'
                name='color'
                id='color5123123'
                className='w-0 h-0 opacity-0 translate-y-6 border-none'
                defaultValue='#e8e8e8'
              />
            </label>
          </div>
        </div>
      </div>
      <div className='relative max-w-full overflow-hidden flex flex-col md:h-full h-[600px]' style={{ flex: '1 1 0%' }}>
        <div className='flex items-center justify-between px-4 py-1 bg-neutral-800 border-b border-neutral-700'>
          <div className='flex items-center gap-1'>
            <button
              onClick={() => setActiveTab('html')}
              className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${
                activeTab === 'html'
                  ? 'bg-red-500/30 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-red-500/30'
              }
            `}
            >
              <svg className='w-5 h-5 text-red-500' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 18.178l4.62-1.256.623-6.778H9.026L8.822 7.89h8.626l.227-2.211H6.325l.636 6.678h7.82l-.261 2.866-2.52.667-2.52-.667-.158-1.844h-2.27l.329 3.544L12 18.178zM3 2h18l-1.623 18L12 22l-7.377-2L3 2z' />
              </svg>
              HTML
            </button>

            {!isTailwind && (
              <button
                onClick={() => setActiveTab('css')}
                className={`
                flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${
                  activeTab === 'css'
                    ? 'bg-blue-800/50 text-white'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-blue-800/50'
                }
              `}
              >
                <svg className='w-5 h-5 text-blue-500' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.85l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21L21.94 3z' />
                </svg>
                CSS
              </button>
            )}
          </div>
          <button
            onClick={handleCopy}
            className='flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 hover:text-white bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors'
            title='Copy code'
          >
            {copied ? (
              <>
                <Check size={16} className='text-green-400' />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className='flex-1 overflow-hidden bg-neutral-800'>
          <Editor
            height='100%'
            language={activeTab}
            theme='vs-dark'
            value={currentCode}
            onChange={handleChange}
            options={{
              fontSize: 15,
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              formatOnPaste: true,
              formatOnType: true
            }}
          />
        </div>
      </div>
    </div>
  )
}
