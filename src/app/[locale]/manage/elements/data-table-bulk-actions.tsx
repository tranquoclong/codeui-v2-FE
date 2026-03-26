import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, UserX, UserCheck, Mail } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type ElementResType } from '@/schemaValidations/element.schema'
import { ElementsMultiDeleteDialog } from './elements-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({ table }: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedUsers = selectedRows.map((row) => row.original as ElementResType)
    toast({
      description: `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}`
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedUsers = selectedRows.map((row) => row.original as ElementResType)
    toast({
      description: `Invited ${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}`
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='user'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invite selected useelementsrs'
              title='Invite selected elements'
            >
              <Mail />
              <span className='sr-only'>Invite selected elements</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected elements</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected elements'
              title='Activate selected elements'
            >
              <UserCheck />
              <span className='sr-only'>Activate selected elements</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected elements</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected elements'
              title='Deactivate selected elements'
            >
              <UserX />
              <span className='sr-only'>Deactivate selected elements</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected elements</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected elements'
              title='Delete selected elements'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected elements</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected elements</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <ElementsMultiDeleteDialog table={table} open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm} />
    </>
  )
}
