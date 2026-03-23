'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { useGetManageElementQuery, useUpdateManageElementMutation } from '@/queries/useElement'
import EditorElement from '../../(public)/create/editor'
import { toast } from '@/components/ui/use-toast'
import revalidateApiRequest from '@/apiRequests/revalidate'

export default function EditElement({ id, setId }: { id: number; setId: (value: number) => void }) {
  const updateManageElementMutation = useUpdateManageElementMutation()
  const elementQuery = useGetManageElementQuery({ id, enabled: Boolean(id) })
  const element = elementQuery.data?.payload
  const [theme, setTheme] = useState<'DARK' | 'LIGHT'>('DARK')
  const [color, setColor] = useState<'#212121' | '#e8e8e8'>('#212121')
  const [htmlText, setHtmlText] = useState('')
  const [cssText, setCssText] = useState('')

  useEffect(() => {
    if (element) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(element.theme || 'DARK')
      setHtmlText(element.elementCode?.html || '')
      setCssText(element.elementCode?.css || '')
    }
  }, [element])
  const onSubmit = async (status: 'APPROVED' | 'REVIEW' | 'REJECTED' | 'DRAFT') => {
    if (updateManageElementMutation.isPending) return
    try {
      let body = {
        id,
        title: element?.title || '',
        description: element?.description || '',
        categories: [1],
        status: status
      }
      await updateManageElementMutation.mutateAsync(body)
      await revalidateApiRequest('manageElements')
      toast({
        description: 'thanh cong'
      })
      reset()
    } catch (error) {
      toast({
        description: 'khong thanh cong'
      })
    }
  }
  const reset = () => {
    setId(0)
  }

  return (
    <Dialog
      open={Boolean(id)}
      onOpenChange={(value) => {
        if (!value) reset()
      }}
    >
      <DialogContent className='max-w-7xl max-h-screen overflow-auto'>
        <DialogHeader>
          <DialogTitle>Update element</DialogTitle>
        </DialogHeader>

        <EditorElement
          tech={element?.isTailwind ? 'tailwind' : 'css'}
          htmlText={htmlText}
          cssText={cssText}
          theme={theme}
          color={color}
          onChangeHtml={setHtmlText}
          onChangeCss={setCssText}
          setTheme={setTheme}
          setColor={setColor}
        />

        <DialogFooter>
          <Button onClick={() => onSubmit('APPROVED')}>Approved</Button>
          <Button onClick={() => onSubmit('REJECTED')}>Rejected</Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
