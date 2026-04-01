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
import { ElementListResType, ElementResType } from '@/schemaValidations/element.schema'
import { Badge } from '@/components/ui/badge'
import { usePathname, useRouter } from '@/i18n/routing'
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

export const columns: ColumnDef<ElementResType>[] = [
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
    id: 'brand',
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
        // disabled={value.trim() !== elementDelete?.brand.name}
        title={
          <span className='text-destructive'>
            <AlertTriangle className='me-1 inline-block stroke-destructive' size={18} /> Delete User
          </span>
        }
        desc={
          <div className='space-y-4'>
            <p className='mb-2'>
              {/* Are you sure you want to delete <span className='font-bold'>{elementDelete?.brand.name}</span>? */}
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
const brand = [
  { id: undefined, href: '/elements' },
  { id: 1, href: '/buttons' },
  { id: 2, href: '/switches' },
  { id: 3, href: '/checkboxes' },
  { id: 4, href: '/cards' },
  { id: 5, href: '/loaders' },
  { id: 6, href: '/inputs' },
  { id: 7, href: '/forms' },
  { id: 8, href: '/patterns' },
  { id: 9, href: '/radio-buttons' },
  { id: 10, href: '/tooltips' }
]
const PAGE_SIZE = 10
export default function ElementTable() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 100)
  const pageIndex = Number(page) - 1
  const sortBy = (searchParams.get('sortBy') as 'randomized' | 'favorites' | 'recent') || 'randomized'
  const brandMap = Object.fromEntries(brand.map((item) => [item.href, item.id]))
  const brandIds = brandMap[pathname]
  const orderBy = (searchParams.get('orderBy') as 'asc' | 'desc') || 'desc'
  const theme = ['DARK', 'LIGHT'].includes(searchParams.get('theme') || '')
    ? (searchParams.get('theme') as 'DARK' | 'LIGHT')
    : undefined
          const status = ['APPROVED', 'REVIEW', 'REJECTED', 'DRAFT'].includes(searchParams.get('status') || '')
            ? (searchParams.get('status') as 'APPROVED' | 'REVIEW' | 'REJECTED' | 'DRAFT')
            : undefined
  const t = searchParams.get('t') || undefined
    const paramss = useMemo(
      () => ({
        page,
        limit,
        sortBy,
        orderBy,
        theme,
        t,
        brandIds: brandIds ? [brandIds] : undefined,
        status
      }),
      [page, limit, sortBy, orderBy, theme, t, brandIds, status]
    )
  const [elementIdEdit, setElementIdEdit] = useState<number>(0)
  const [elementDelete, setElementDelete] = useState<ElementItem | null>(null)
  const elementListQuery = useManageElementListQuery(paramss, {
    enabled: true
  })
  const data = elementListQuery.data?.payload.data ?? []
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize: PAGE_SIZE 
  })
  const updateQueryParams = (updates: Record<string, string | null | undefined>, options?: { resetPage?: boolean }) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '' || value === 'ALL') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    if (options?.resetPage) {
      params.set('page', '1')
    }
    router.replace(`${pathname}?${params.toString()}`)
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
        <EditElement id={elementIdEdit} setId={setElementIdEdit} paramss={paramss} />
        <AlertDialogDeleteElement elementDelete={elementDelete} setElementDelete={setElementDelete} />
        <DataTableToolbar
          table={table}
          searchPlaceholder='Filter elements...'
          searchKey='title'
          filters={[
            {
              columnId: 'brand',
              title: 'Type',
              options: [
                { label: 'buttons', value: 'button' },
                { label: 'switches', value: 'switch' },
                { label: 'checkboxes', value: 'checkbox' },
                { label: 'cards', value: 'card' },
                { label: 'loaders', value: 'loader' },
                { label: 'inputs', value: 'input' },
                { label: 'forms', value: 'form' },
                { label: 'patterns', value: 'pattern' },
                { label: 'radio-buttons', value: 'radio-button' },
                { label: 'tooltips', value: 'tooltip' }
              ]
            },
            {
              columnId: 'status',
              title: 'Status',
              options: [
                { label: 'Approved', value: 'APPROVED' },
                { label: 'Review', value: 'REVIEW' },
                { label: 'Rejected', value: 'REJECTED' },
                { label: 'Draft', value: 'DRAFT' }
              ]
            }
          ]}
        />
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
        {/* <div className='flex items-center justify-end space-x-2 py-4'>
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
        </div> */}
      </div>
    </ElementTableContext.Provider>
  )
}
