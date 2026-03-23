'use client'

import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Trash2, UserPen, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import EditElement from '@/app/[locale]/manage/elements/edit-element'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  AlertDialog,
} from '@/components/ui/alert-dialog'
import { useSearchParams } from 'next/navigation'
import AutoPagination from '@/components/auto-pagination'
import { useDeleteElementMutation, useManageElementListQuery } from '@/queries/useElement'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { callTypes, tech } from './data/data'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { DataTableBulkActions } from './data-table-bulk-actions'
import { DataTableColumnHeader } from '@/components/data-table'
import { ElementListResType, ElementType } from '@/schemaValidations/element.schema'
import { Badge } from '@/components/ui/badge'
import { endOfDay, format, startOfDay, subDays, startOfMonth } from 'date-fns'

type ElementItem = ElementListResType['data'][0]

const ElementTableContext = createContext<{
  setElementIdEdit: (value: number) => void
  elementIdEdit: number | undefined
  elementDelete: ElementItem | null
  setElementDelete: (value: ElementItem | null) => void
}>({
  setElementIdEdit: (value: number | undefined) => {},
  elementIdEdit: undefined,
  elementDelete: null,
  setElementDelete: (value: ElementItem | null) => {}
})

export const dateRangeFilterFn = (row: any, columnId: string, value: [string, string]) => {
  const rowDate = new Date(row.getValue(columnId))
  const [from, to] = value || []

  if (from && rowDate < new Date(from)) return false
  if (to && rowDate > new Date(to)) return false

  return true
}

export const columns: ColumnDef<ElementType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn('max-md:sticky start-0 z-10 rounded-tl-[inherit]')
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('title')}</div>
  },
  {
    id: 'brandName',
    header: 'Type',
    accessorFn: (row) => row.brand?.name,
    cell: ({ getValue }) => <div className='capitalize'>{getValue<string>()}</div>
  },
  {
    accessorKey: 'theme',
    header: 'Theme',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('theme')}</div>
  },
  {
    accessorKey: 'isTailwind',
    header: 'Tech',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('isTailwind') ? 'Tailwind' : 'CSS'}</div>
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = callTypes.get(status)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('status')}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false
  },
    {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>())
      return (
        <div>
          {date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
      )
    },
    sortingFn: 'datetime',
    filterFn: dateRangeFilterFn
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setElementIdEdit, setElementDelete } = useContext(ElementTableContext)
      const openEditElement = () => {
        setElementIdEdit(row.original.id)
      }

      const openDeleteElement = () => {
        setElementDelete(row.original)
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-[160px]'>
            <DropdownMenuItem onClick={openEditElement}>
              Edit
              <DropdownMenuShortcut>
                <UserPen size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openDeleteElement} className='text-red-500!'>
              Delete
              <DropdownMenuShortcut>
                <Trash2 size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

function AlertDialogDeleteElement({
  elementDelete,
  setElementDelete
}: {
  elementDelete: ElementItem | null
  setElementDelete: (value: ElementItem | null) => void
}) {
  const { mutateAsync } = useDeleteElementMutation()
  const [value, setValue] = useState('')

  const deleteElement = async () => {
    if (value.trim() !== elementDelete?.title) return
    if (elementDelete) {
      try {
        const result = await mutateAsync(elementDelete.id)
        setElementDelete(null)
        toast({
          title: 'thanh cong'
        })
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }
  }
  return (
    <AlertDialog
      open={Boolean(elementDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setElementDelete(null)
        }
      }}
    >
      <ConfirmDialog
        open={Boolean(elementDelete)}
        onOpenChange={(value) => {
          if (!value) {
            setElementDelete(null)
          }
        }}
        handleConfirm={deleteElement}
        disabled={value.trim() !== elementDelete?.brand.name}
        title={
          <span className='text-destructive'>
            <AlertTriangle className='me-1 inline-block stroke-destructive' size={18} /> Delete User
          </span>
        }
        desc={
          <div className='space-y-4'>
            <p className='mb-2'>
              Are you sure you want to delete <span className='font-bold'>{elementDelete?.brand.name}</span>?
              <br />
              This action will permanently remove the user with the role of <span className='font-bold'>
                Element
              </span>{' '}
              from the system. This cannot be undone.
            </p>

            <Label className='my-2'>
              Type Element:
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Enter Type Element to confirm deletion.'
              />
            </Label>

            <Alert variant='destructive'>
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>Please be careful, this operation can not be rolled back.</AlertDescription>
            </Alert>
          </div>
        }
        confirmText='Delete'
        destructive
      />
    </AlertDialog>
  )
}

const PAGE_SIZE = 10

const initFromDate = startOfDay(new Date())
const initToDate = endOfDay(new Date())
type DatePreset = 'today' | '7d' | '30d' | 'month' | null

export default function ElementTable() {
  const searchParam = useSearchParams()
  // const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const page = searchParam.get('page') || '1'
  const limit = searchParam.get('limit') || '10'
  const orderBy = searchParam.get('orderBy') || 'randomized'
  const theme = searchParam.get('theme') || 'all'
  const t = searchParam.get('t') || 'all'
  const pageIndex = Number(page) - 1
  const paramss = useMemo(() => ({ page, limit, orderBy, theme, t }), [page, limit, orderBy, theme, t])
  // const params = Object.fromEntries(searchParam.entries())
  const [elementIdEdit, setElementIdEdit] = useState<number | undefined>()
  const [elementDelete, setElementDelete] = useState<ElementItem | null>(null)
  const elementListQuery = useManageElementListQuery(paramss)
  const data = elementListQuery.data?.payload.data ?? []
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize: PAGE_SIZE 
  })
  const [fromDate, setFromDate] = useState(initFromDate)
  const [toDate, setToDate] = useState(initToDate)
  const [activePreset, setActivePreset] = useState<DatePreset>(null)

  const handlePreset = (preset: DatePreset) => {
    const now = new Date()
    const end = endOfDay(now)
    let start: Date
    switch (preset) {
      case 'today':
        start = startOfDay(now)
        break
      case '7d':
        start = startOfDay(subDays(now, 7))
        break
      case '30d':
        start = startOfDay(subDays(now, 30))
        break
      case 'month':
        start = startOfMonth(now)
        break
      default:
        return
    }
    setFromDate(start)
    setToDate(end)
    setActivePreset(preset)
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    }
  })

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE
    })
  }, [table, pageIndex])

  return (
    <ElementTableContext.Provider
      value={{
        elementIdEdit,
        setElementIdEdit,
        elementDelete,
        setElementDelete
      }}
    >
      <div className={cn('max-sm:has-[div[role="toolbar"]]:mb-16', 'flex flex-1 flex-col gap-4')}>
        <EditElement
          id={elementIdEdit}
          setId={setElementIdEdit}
          // onSubmitSuccess={() => {}}
        />
        <AlertDialogDeleteElement elementDelete={elementDelete} setElementDelete={setElementDelete} />
        <DataTableToolbar
          table={table}
          searchPlaceholder='Filter elements...'
          searchKey='title'
          filters={[
            {
              columnId: 'status',
              title: 'Status',
              options: [
                { label: 'APPROVED', value: 'APPROVED' },
                { label: 'REVIEW', value: 'REVIEW' },
                { label: 'REJECTED', value: 'REJECTED' },
                { label: 'DRAFT', value: 'DRAFT' }
              ]
            }
            // {
            //   columnId: 'tech',
            //   title: 'Tech',
            //   options: tech.map((tech) => ({ ...tech }))
            // }
          ]}
        />
        <div className='flex gap-2'>
          <div className='flex flex-wrap gap-2'>
            <Button variant={activePreset === 'today' ? 'default' : 'outline'} onClick={() => handlePreset('today')}>
              Hôm nay
            </Button>
            <Button variant={activePreset === '7d' ? 'default' : 'outline'} onClick={() => handlePreset('7d')}>
              7 ngày
            </Button>
            <Button variant={activePreset === '30d' ? 'default' : 'outline'} onClick={() => handlePreset('30d')}>
              30 ngày
            </Button>
            <Button variant={activePreset === 'month' ? 'default' : 'outline'} onClick={() => handlePreset('month')}>
              Tháng này
            </Button>
          </div>
          <div className='flex gap-2 mb-4'>
            <div className='flex items-center'>
              <span className='mr-2'>Từ</span>
              <Input
                type='datetime-local'
                placeholder='Từ ngày'
                className='text-sm'
                value={format(fromDate, 'yyyy-MM-dd HH:mm').replace(' ', 'T')}
                onChange={(event) => {
                  setFromDate(new Date(event.target.value))
                  setActivePreset(null)
                }}
              />
            </div>
            <div className='flex items-center'>
              <span className='mr-2'>Đến</span>
              <Input
                type='datetime-local'
                placeholder='Đến ngày'
                value={format(toDate, 'yyyy-MM-dd HH:mm').replace(' ', 'T')}
                onChange={(event) => {
                  setToDate(new Date(event.target.value))
                  setActivePreset(null)
                }}
              />
            </div>
          </div>
        </div>
        <div className='overflow-hidden rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} className='mt-auto' />
        <DataTableBulkActions table={table} />
        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='text-xs text-muted-foreground py-4 flex-1 '>
            Hiển thị <strong>{table.getPaginationRowModel().rows.length}</strong> trong <strong>{data.length}</strong>{' '}
            kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname='/manage/elements'
            />
          </div>
        </div>
      </div>
    </ElementTableContext.Provider>
  )
}
