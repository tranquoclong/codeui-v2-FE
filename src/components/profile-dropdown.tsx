import useDialogState from '@/hooks/use-dialog-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SignOutDialog } from '@/components/sign-out-dialog'
import { useAccountMe } from '@/queries/useAccount'
import { Link } from '@/i18n/routing'

export function ProfileDropdown() {
  const [open, setOpen] = useDialogState()
  const accountMe = useAccountMe(true)
  const account = accountMe.data?.payload

  return (
    <>
      {false ? (
        <>
          <div className='flex flex-row gap-2'>
            <div className='animate-pulse bg-neutral-700 w-36 h-10 rounded-lg'></div>
            <div className='animate-pulse bg-neutral-700 w-14 h-10 rounded-lg'></div>
          </div>
        </>
      ) : (
        <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-10 w-38 rounded-lg'>
                <div className='flex items-center gap-2'>
                  <p className='text-sm leading-none font-medium'>{account?.name}</p>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={account?.avatar ?? undefined} alt={account?.name} />
                    <AvatarFallback>{account?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col gap-1.5'>
                  <p className='text-sm leading-none font-medium'>{account?.name}</p>
                  <p className='text-xs leading-none text-muted-foreground'>{account?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {account?.role.name === 'ADMIN' && (
                  <DropdownMenuItem asChild>
                    <Link href='/manage/dashboard'>Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href={`/profile/${account?.id}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='#'>Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/settings/profile'>Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant='destructive' onClick={() => setOpen(true)}>
                Sign out
                <DropdownMenuShortcut className='text-current'>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SignOutDialog open={!!open} onOpenChange={setOpen} />
        </>
      )}
    </>
  )
}
