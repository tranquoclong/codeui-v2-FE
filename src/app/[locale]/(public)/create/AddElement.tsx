'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog'
import { useRouter } from '@/i18n/routing'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { handleErrorApi } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import revalidateApiRequest from '@/apiRequests/revalidate'
import { CreateElementHeadBody, CreateElementHeadBodyType } from '@/schemaValidations/element.schema'
import { useAddElementMutation } from '@/queries/useElement'
import { ThemeElement } from '@/constants/type'
import { RainbowButton } from '@/components/magicui/rainbow-button'

type Props = {
  brandId: number
  html: string
  css: string
}
export default function AddElement({ brandId, html, css }: Props) {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'DRAFT' | 'REVIEW'>('DRAFT')
  const dddElementMutation = useAddElementMutation()
  const form = useForm<CreateElementHeadBodyType>({
    resolver: zodResolver(CreateElementHeadBody) as any,
    defaultValues: {
      title: '',
      description: ''
    }
  })
  const reset = () => {
    form.reset()
    setFile(null)
  }
  const onSubmit = async (values: CreateElementHeadBodyType) => {
    if (dddElementMutation.isPending) return
    try {
      let body = {
        title: values.title,
        description: values.description,
        isTailwind: css === '',
        status: status,
        theme: ThemeElement.DARK,
        brandId,
        html,
        css,
        categories: [1],
        elementOriginalId: undefined
      }
      const result =  await dddElementMutation.mutateAsync(body)
      // await revalidateApiRequest('elements')
      toast({
        description: 'add element successfully'
      })
      router.push(`/profile/${result.payload.createdById}?status=${status}`)
      reset()
      setOpen(false)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }
  return (
    <Dialog
      onOpenChange={(value) => {
        if (!value) {
          reset()
        }
        setOpen(value)
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <div className='flex items-stretch gap-2'>
          <button
            type='button'
            className='inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-700 h-10 px-4 py-2 whitespace-nowrap'
            onClick={() => setStatus('DRAFT')}
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
            Save as a draft
          </button>
          <span className='inline-block' data-state='closed'>
            <RainbowButton type='button' onClick={() => setStatus('REVIEW')} disabled={dddElementMutation.isPending}>
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
              Submit for review
            </RainbowButton>
          </span>
        </div>
        {/* <Button size='sm' className='h-7 gap-1' onClick={() => setStatus('DRAFT')}>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Save as a draft</span>
        </Button>
        <Button size='sm' className='h-7 gap-1' onClick={() => setStatus('REVIEW')}>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Submit for review</span>
        </Button> */}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
        <DialogHeader>
          <DialogTitle>About your post</DialogTitle>
          <DialogDescription>You can give the viewers of your post a better idea of what it is and why it awesome.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            className='grid auto-rows-max items-start gap-4 md:gap-8'
            id='add-dish-form'
            onSubmit={form.handleSubmit(onSubmit, (e) => {
              console.log(e)
            })}
            onReset={reset}
          >
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                      <Label htmlFor='title'>Title</Label>
                      <div className='col-span-3 w-full space-y-2'>
                        <Input id='title' className='w-full' {...field} />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                      <Label htmlFor='description'>Description</Label>
                      <div className='col-span-3 w-full space-y-2'>
                        <Textarea id='description' className='w-full' {...field} />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='add-dish-form'>
            {dddElementMutation.isPending && <LoaderCircle className='w-5 h-5 mr-2 animate-spin' />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
