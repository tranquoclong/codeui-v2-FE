'use client'

import { useState } from 'react'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import EditorElement from './editor'
import { useRouter } from '@/i18n/routing'
import ModalType from './modalType'
import CodePreview from '@/components/codePreview'
import { toast } from '@/components/ui/use-toast'
import { useAddElementMutation } from '@/queries/useElement'
import { CreateElementBodyType } from '@/schemaValidations/element.schema'
import { ElementStatus, ThemeElement } from '@/constants/type'
import { LoaderCircle } from 'lucide-react'
import { defaultCodes } from './data/data'
import AddElement from './AddElement'

export default function Create() {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(true)
  const [type, setType] = useState({ id: 1, value: 'button' })
  const [tech, setTech] = useState<'css' | 'tailwind'>('css')
  const [theme, setTheme] = useState<'DARK' | 'LIGHT'>('DARK')
  const [color, setColor] = useState<'#212121' | '#e8e8e8'>('#212121')
  const [htmlText, setHtmlText] = useState(defaultCodes[type.value].html)
  const [cssText, setCssText] = useState(tech === 'tailwind' ? '' : defaultCodes[type.value].css)
  const dddElementMutation = useAddElementMutation()
  const handleChangeType = (newType: { id: number; value: string }) => {
    setType(newType)
    const codeSet = defaultCodes[newType.value]
    setHtmlText(codeSet.html)
    setCssText(tech === 'tailwind' ? '' : codeSet.css)
  }

  const handleChangeTech = (newTech: 'css' | 'tailwind') => {
    setTech(newTech)
    const codeSet = defaultCodes[type.value]
    setCssText(newTech === 'tailwind' ? '' : codeSet.css)
  }

    const onSubmit = async (status: 'DRAFT' | 'REVIEW') => {
      if (dddElementMutation.isPending) return
      try {
        let body = {
          title: 'string',
          description: 'string',
          isTailwind: cssText === '',
          status: status,
          theme: ThemeElement.DARK,
          brandId: type.id,
          html: htmlText,
          css: cssText,
          categories: [1],
          elementOriginalId: undefined
        }
        await dddElementMutation.mutateAsync(body)
        toast({
          description: 'thanh cong'
        })
        router.push('/elements')
      } catch (error) {
        toast({
          description: 'khong thanh cong'
        })
      }
    }
  return (
    <>
      <div className="px-5 py-0 data-[path='/']:px-0 root-container relative mb-12 border-b-2 border-dark-300 shadow-[rgba(0,_0,_0,_0.1)_0px_20px_25px_-5px,_rgba(0,_0,_0,_0.04)_0px_10px_10px_-5px]">
        <div />
        <div className='outlet-wrapper z-10 w-full min-w-0'>
          <main className='mx-auto mb-40 wrapper'>
            <div className='flex flex-wrap items-center justify-between gap-3 mb-1 pr-2'>
              <div className='flex items-center gap-4' />
              <div className='flex gap-5' />
            </div>
            <EditorElement
              tech={tech}
              htmlText={htmlText}
              cssText={cssText}
              theme={theme}
              color={color}
              onChangeHtml={setHtmlText}
              onChangeCss={setCssText}
              setTheme={setTheme}
              setColor={setColor}
            />
            <div className='items-stretch hidden p-2 mt-4 col-span-full bg-neutral-800 rounded-xl md:block'>
              <div className='flex flex-col md:flex-row items-stretch justify-between gap-2 h-full flex-wrap min-h-[40px]'>
                <div className='flex items-stretch gap-2 left w-full'>
                  <div className='items-stretch hidden col-span-full rounded-xl md:block w-full'>
                    <div className='flex flex-col md:flex-row items-stretch justify-between gap-2 h-full flex-wrap min-h-[40px] w-full'>
                      <div className='flex items-stretch gap-2'>
                        <button
                          className='inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-700 h-10 px-4 py-2'
                          onClick={() => setOpenModal(true)}
                        >
                          <svg
                            width={20}
                            height={20}
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                          >
                            <g>
                              <path
                                d='M18.3333 7.09996V3.31663C18.3333 2.14163 17.8 1.66663 16.475 1.66663H13.1083C11.7833 1.66663 11.25 2.14163 11.25 3.31663V7.09163C11.25 8.27496 11.7833 8.74163 13.1083 8.74163H16.475C17.8 8.74996 18.3333 8.27496 18.3333 7.09996Z'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M18.3333 16.475V13.1083C18.3333 11.7833 17.8 11.25 16.475 11.25H13.1083C11.7833 11.25 11.25 11.7833 11.25 13.1083V16.475C11.25 17.8 11.7833 18.3333 13.1083 18.3333H16.475C17.8 18.3333 18.3333 17.8 18.3333 16.475Z'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M8.74999 7.09996V3.31663C8.74999 2.14163 8.21666 1.66663 6.89166 1.66663H3.52499C2.19999 1.66663 1.66666 2.14163 1.66666 3.31663V7.09163C1.66666 8.27496 2.19999 8.74163 3.52499 8.74163H6.89166C8.21666 8.74996 8.74999 8.27496 8.74999 7.09996Z'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M8.74999 16.475V13.1083C8.74999 11.7833 8.21666 11.25 6.89166 11.25H3.52499C2.19999 11.25 1.66666 11.7833 1.66666 13.1083V16.475C1.66666 17.8 2.19999 18.3333 3.52499 18.3333H6.89166C8.21666 18.3333 8.74999 17.8 8.74999 16.475Z'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </g>
                          </svg>{' '}
                          Change type
                        </button>
                      </div>
                      <AddElement brandId={type.id} html={htmlText} css={cssText} />
                      {/* <div className='flex items-stretch gap-2'>
                        <button
                          type='button'
                          className='inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-700 h-10 px-4 py-2 whitespace-nowrap'
                          onClick={() => onSubmit(ElementStatus.DRAFT)}
                          disabled={dddElementMutation.isPending}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-5 h-5'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                          >
                            <path d='M2 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C5.04 3 6.16 3 8.4 3h.316c.47 0 .704 0 .917.065a1.5 1.5 0 0 1 .517.276c.172.142.302.337.563.728l.575.862c.26.391.39.586.562.728a1.5 1.5 0 0 0 .517.276c.213.065.448.065.917.065H15.6c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C22 9.04 22 10.16 22 12.4v2.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C18.96 21 17.84 21 15.6 21H8.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C2 17.96 2 16.84 2 14.6V9.4Z' />
                          </svg>{' '}
                          {dddElementMutation.isPending && <LoaderCircle className='w-5 h-5 mr-2 animate-spin' />}
                          Save as a draft
                        </button>
                        <span className='inline-block' data-state='closed'>
                          <RainbowButton
                            type='button'
                            onClick={() => onSubmit(ElementStatus.REVIEW)}
                            disabled={dddElementMutation.isPending}
                          >
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-5 w-5'>
                              <path
                                d='M5.83087 18.1693L3.00261 20.9979M7.95219 20.2906L7.24508 20.9977M3.70955 16.0479L3.00244 16.755M11.3588 6.14844L6.98115 6.14844C6.65417 6.14844 6.43834 6.20823 6.15796 6.37645L4.34408 7.46478C3.91094 7.72466 3.69438 7.8546 3.63232 8.01389C3.5783 8.15256 3.58885 8.30808 3.66112 8.43818C3.74412 8.58763 3.97626 8.68711 4.44054 8.88609L7.91447 10.3749M11.3588 6.14844C10.7176 6.79012 10.1116 7.56433 9.18973 8.74215L8.32567 9.84608C8.16879 10.0465 8.0327 10.2204 7.91447 10.3749M11.3588 6.14844C11.6532 5.85384 11.955 5.58717 12.2982 5.32221C13.0456 4.7452 14.6119 3.90719 15.5067 3.6056C16.8125 3.16545 17.3933 3.12131 18.5548 3.03303C19.5534 2.95712 20.3717 3.01164 20.6801 3.32001C20.9885 3.62839 21.043 4.44669 20.9671 5.44536C20.8788 6.60685 20.8347 7.18759 20.3945 8.49341C20.0929 9.38818 19.2549 10.9545 18.6779 11.7019C18.413 12.0451 18.1463 12.3469 17.8517 12.6413M7.91447 10.3749C7.58676 10.8033 7.39618 11.0832 7.27999 11.3693C6.93821 12.2106 6.99595 13.1615 7.43702 13.9554C7.64105 14.3226 7.98047 14.662 8.6593 15.3408C9.33813 16.0197 9.67754 16.3591 10.0448 16.5631C10.8386 17.0042 11.7895 17.0619 12.6309 16.7201C12.9169 16.6039 13.1968 16.4134 13.6252 16.0857M13.6252 16.0857L15.114 19.5596C15.313 20.0239 15.4125 20.256 15.5619 20.339C15.692 20.4113 15.8476 20.4218 15.9862 20.3678C16.1455 20.3057 16.2755 20.0892 16.5353 19.656L17.6237 17.8422C17.7919 17.5618 17.8517 17.346 17.8517 17.019L17.8517 12.6413M13.6252 16.0857C13.7798 15.9674 13.9536 15.8313 14.154 15.6745L15.258 14.8104C16.4358 13.8885 17.21 13.2825 17.8517 12.6413'
                                stroke='currentColor'
                                fill='none'
                                strokeWidth={2}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>{' '}
                            {dddElementMutation.isPending && <LoaderCircle className='w-5 h-5 mr-2 animate-spin' />}
                            Submit for review
                          </RainbowButton>
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ModalType
        open={openModal}
        setOpen={setOpenModal}
        type={type}
        tech={tech}
        handleChangeType={handleChangeType}
        handleChangeTech={handleChangeTech}
      />
    </>
  )
}
