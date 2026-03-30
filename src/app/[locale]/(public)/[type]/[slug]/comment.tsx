'use client'

import { Link, useRouter } from '@/i18n/routing'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import { useState, FormEvent } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { useCommentListQuery, useAddCommentMutation, useDeleteCommentMutation } from '@/queries/useComment'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useAccountMe } from '@/queries/useAccount'
import Reply from './reply'
import { CreateCommentBodyType } from '@/schemaValidations/comment.schema'
import { handleErrorApi } from '@/lib/utils'
import { useAppStore } from '@/components/app-provider'

interface Props {
  elementId: number
}

function CommentCard({ elementId, comment, account, isAuth }: { elementId: number; comment: any; account: any; isAuth: boolean }) {
  const [open, setOpen] = useDialogState()
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null)

  const deleteCommentMutation = useDeleteCommentMutation()

  const handleDelete = async (commentId: number) => {
    if (deleteCommentMutation.isPending) return
    try {
      await deleteCommentMutation.mutateAsync(commentId)
    } catch (error: any) {
      handleErrorApi({
        error
      })
    }
  }
  return (
    <>
      <div
        className='flex relative gap-4 lg:gap-6 bg-neutral-800 py-4 px-4 lg:px-6 rounded-xl overflow-hidden '
        style={{ wordBreak: 'break-word' }}
      >
        <div>
          <div className='flex mb-3 items-center'>
            <Link href={`/profile/${comment.user.id}`}>
              <span className='relative flex shrink-0 overflow-hidden rounded bg-black w-[50px] h-[50px] lg:w-[40px] lg:h-[40px] mr-3'>
                <Avatar className='aspect-square h-full w-full m-0'>
                  <AvatarImage src={comment?.user.avatar ?? undefined} alt={comment?.user.name} />
                  <AvatarFallback>{comment?.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </span>
            </Link>
            <div className='flex flex-col items-start'>
              <div className='font-bold text-gray-200 text-base leading-2 flex items-center gap-4'>
                <Link href={`/profile/${comment.user.id}`} className='block'>
                  {comment.user.name}
                </Link>
              </div>
            </div>
            <div className='flex items-center gap-3 ml-3'>
              <span className=' text-gray-400 block text-sm'>
                {format(new Date(comment.createdAt), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
          <p className='text-gray-200 text-base block'> {comment.content} </p>
          {account?.id === comment.user.id && (
            <div className='lg:absolute top-3 right-4 mt-6 lg:mt-0 font-semibold flex items-center gap-2 -ml-2 lg:ml-0'>
              {isAuth && (
                <button
                  onClick={() => setOpen(true)}
                  className='flex items-center gap-2 text-gray-400 font-sans cursor-pointer bg-transparent hover:bg-neutral-700 px-2 py-2 rounded border-none'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                  >
                    <path d='m16 7-1.106-2.211a3.236 3.236 0 0 0-5.788 0L8 7M4 7h16M6 7h12v8c0 1.864 0 2.796-.305 3.53a4 4 0 0 1-2.164 2.165C14.796 21 13.864 21 12 21s-2.796 0-3.53-.305a4 4 0 0 1-2.166-2.164C6 17.796 6 16.864 6 15V7Z' />
                  </svg>
                  Delete
                </button>
              )}

              <button
                onClick={() => setActiveReplyId(comment.id)}
                className='flex items-center gap-2 text-gray-400 font-sans cursor-pointer bg-transparent hover:bg-neutral-700 px-2 py-2 rounded border-none '
              >
                <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-4 h-4'>
                  <path
                    d='M8.03089 4C6.57669 5.05865 5.2706 6.29537 4.14485 7.67887C4.04828 7.79755 4 7.94044 4 8.08333M8.03089 12.1667C6.57669 11.108 5.2706 9.8713 4.14485 8.4878C4.04828 8.36912 4 8.22623 4 8.08333M4 8.08333H14.963C17.7448 8.08333 20 10.3033 20 13.0417C20 15.7801 17.7448 18 14.963 18H12'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Reply
              </button>
            </div>
          )}
        </div>
      </div>
      <Reply
        commentId={comment.id}
        accountId={account?.id}
        elementId={elementId}
        showReplyForm={activeReplyId === comment.id}
        setShowReplyForm={() => setActiveReplyId(null)}
      />
      <ConfirmDialog
        open={!!open}
        onOpenChange={setOpen}
        title='Delete comment'
        desc={`Are you sure you want to delete this comment? ${comment.content}`}
        confirmText='Delete'
        destructive
        handleConfirm={() => handleDelete(comment.id)}
        className='sm:max-w-sm'
      />
    </>
  )
}

export default function Comment({ elementId }: Props) {
  const isAuth = useAppStore((state) => state.isAuth)
  const accountMe = useAccountMe(isAuth)
  const account = accountMe.data?.payload
  const router = useRouter()
  
  const limit = 2
  const commentsQuery = useCommentListQuery(elementId, limit)

  const allComments = commentsQuery.data?.pages.flatMap((page) => page.payload.data) ?? []

  const hasMore = commentsQuery.hasNextPage
  const addCommentMutation = useAddCommentMutation({ page: 1, limit })

  const [commentContent, setCommentContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault()
    if(!isAuth){
      router.push('/login')
      return
    }
    if (!commentContent.trim() || !account || isSubmitting) return

    setIsSubmitting(true)

    const body: CreateCommentBodyType = {
      content: commentContent.trim(),
      elementId: Number(elementId),
      replyCommentId: undefined
    }

    try {
      await addCommentMutation.mutateAsync(body)
      setCommentContent('')
      // if (page !== 1) setPage(1)
    } catch (error) {
      console.error('Failed to post comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const loadMoreComments = () => {
    if (hasMore && !commentsQuery.isFetchingNextPage) {
      commentsQuery.fetchNextPage()
    }
  }

  return (
    <div className='flex gap-10 flex-col'>
      <div className='space-y-4'>
        <section>
          <div className='mb-6 flex items-center gap-3'>
            <h3 className='font-body text-gray-400 text-xl'>Comments</h3>
            <span className='text-dark-100 text-sm font-semibold'>
              {commentsQuery.data?.pages[0]?.payload?.totalItems || 0}
            </span>
          </div>
          <div className='flex gap-4 mb-4'>
            <form
              onSubmit={handleSubmitComment}
              className='relative p-4 w-full bg-neutral-800 flex items-start gap-3 rounded-xl overflow-hidden false'
            >
              <span className='relative shrink-0 overflow-hidden rounded bg-black w-10 h-10 hidden sm:block'>
                <Avatar className='aspect-square h-full w-full m-0'>
                  <AvatarImage src={account?.avatar ?? undefined} alt={account?.name} />
                  <AvatarFallback>{account?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </span>
              <textarea
                className='flex w-full rounded-md border-2 px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[40px] resize-none flex-1 bg-neutral-700 text-gray-200 placeholder:text-gray-400 border-dark-300 focus:border-gray-700'
                rows={1}
                placeholder='Add a comment...'
                style={{ height: 37 }}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                disabled={isSubmitting}
              />
              <div className='flex flex-col items-center'>
                <button
                  className='inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-8'
                  type='submit'
                  disabled={!commentContent.trim() || isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
          <div className='grid grid-cols-1 gap-3'>
            {allComments.map((comment) => (
              <CommentCard key={comment.id} elementId={elementId} comment={comment} account={account} isAuth={isAuth} />
            ))}
            {hasMore && (
              <button
                onClick={loadMoreComments}
                disabled={commentsQuery.isFetching}
                className='w-full py-4 border border-gray-600 hover:border-gray-500 rounded-xl text-gray-400 hover:text-white transition disabled:opacity-50'
              >
                {commentsQuery.isFetching ? 'Đang tải...' : 'Xem thêm'}
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
