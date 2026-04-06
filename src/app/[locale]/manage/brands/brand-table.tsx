'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ColumnDef, flexRender } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import DOMPurify from 'dompurify'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createContext, useContext } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { formatCurrency, getVietnameseDishStatus, handleErrorApi } from '@/lib/utils'
import AutoPagination from '@/components/auto-pagination'
import AddDish from '@/app/[locale]/manage/brands/add-brand'
import { useDeleteDishMutation } from '@/queries/useDish'
import { toast } from '@/components/ui/use-toast'
import { useBrandTable } from '@/app/[locale]/manage/brands/use-brand-table'
import BrandCardMobile from '@/app/[locale]/manage/brands/brand-card-mobile'
import { BrandListResType } from '@/schemaValidations/brand.schema'
import EditBrand from '@/app/[locale]/manage/brands/edit-brand'

type BrandItem = BrandListResType['data'][0]

const BrandTableContext = createContext<{
  setBrandIdEdit: (value: number) => void
  brandIdEdit: number | undefined
  brandDelete: BrandItem | null
  setBrandDelete: (value: BrandItem | null) => void
}>({
  setBrandIdEdit: (value: number | undefined) => {},
  brandIdEdit: undefined,
  brandDelete: null,
  setBrandDelete: (value: BrandItem | null) => {}
})

export const columns: ColumnDef<BrandItem>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Tên',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setBrandIdEdit, setBrandDelete } = useContext(BrandTableContext)
      const openEditBrand = () => {
        setBrandIdEdit(row.original.id)
      }

      const openDeleteBrand = () => {
        setBrandDelete(row.original)
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openEditBrand}>Sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteBrand}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

function AlertDialogDeleteBrand({
  brandDelete,
  setBrandDelete
}: {
  brandDelete: BrandItem | null
  setBrandDelete: (value: BrandItem | null) => void
}) {
  const { mutateAsync } = useDeleteDishMutation()
  const deleteDish = async () => {
    if (brandDelete) {
      try {
        const result = await mutateAsync(brandDelete.id)
        setBrandDelete(null)
        toast({
          title: result.payload.message
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
      open={Boolean(brandDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setBrandDelete(null)
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa type?</AlertDialogTitle>
          <AlertDialogDescription>
            type <span className='bg-foreground text-primary-foreground rounded px-1'>{brandDelete?.name}</span> sẽ bị
            xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteDish}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default function BrandTable() {
  const { table, data, brandIdEdit, setBrandIdEdit, brandDelete, setBrandDelete } = useBrandTable(columns)

  return (
    <BrandTableContext.Provider value={{ brandIdEdit, setBrandIdEdit, brandDelete, setBrandDelete }}>
      <div className='w-full'>
        <EditBrand id={brandIdEdit} setId={setBrandIdEdit} />
        <AlertDialogDeleteBrand brandDelete={brandDelete} setBrandDelete={setBrandDelete} />
        <div className='flex items-center py-4'>
          <Input
            placeholder='Lọc tên'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
          <div className='ml-auto flex items-center gap-2'>
            <AddDish />
          </div>
        </div>
        {/* Mobile card view */}
        <div className='md:hidden space-y-2'>
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) => (
                <BrandCardMobile
                  key={row.id}
                  brand={row.original}
                  onEdit={() => setBrandIdEdit(row.original.id)}
                  onDelete={() => setBrandDelete(row.original)}
                />
              ))
          ) : (
            <p className='text-center text-muted-foreground py-8'>No results.</p>
          )}
        </div>
        {/* Desktop table view */}
        <div className='hidden md:block rounded-md border'>
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
        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='text-xs text-muted-foreground py-4 flex-1 '>
            Hiển thị <strong>{table.getPaginationRowModel().rows.length}</strong> trong <strong>{data.length}</strong>{' '}
            kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname='/manage/dishes'
            />
          </div>
        </div>
      </div>
    </BrandTableContext.Provider>
  )
}
