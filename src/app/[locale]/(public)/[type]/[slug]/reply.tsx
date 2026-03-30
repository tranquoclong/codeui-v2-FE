'use client'

import { useState, FormEvent } from 'react'
import { Link, useRouter } from '@/i18n/routing'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import { handleErrorApi } from '@/lib/utils'
import { ConfirmDialog } from '@/components/confirm-dialog'
import useDialogState from '@/hooks/use-dialog-state'
import { useReplyListQuery, useAddCommentMutation, useDeleteCommentMutation } from '@/queries/useComment'
import { CreateCommentBodyType } from '@/schemaValidations/comment.schema'
import { useAppStore } from '@/components/app-provider'

interface Props {
  commentId: number
  accountId?: number
  elementId: number
  showReplyForm: boolean
  setShowReplyForm: () => void
}

function CommentCard({ reply, accountId, isAuth }: { reply: any; accountId: any; isAuth: boolean }) {
  const [open, setOpen] = useDialogState()
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
      <div key={reply.id} className='w-full relative flex mb-2'>
        <div className='w-12 lg:w-24 h-full py-2 flex justify-center'>
          <button className='h-full border-none bg-white transition opacity-30 w-1 rounded-full' />
        </div>
        <div className='flex flex-col w-full gap-3'>
          <div
            className='flex relative gap-4 lg:gap-6 bg-neutral-800 py-4 px-4 lg:px-6 rounded-xl overflow-hidden '
            style={{ wordBreak: 'break-word' }}
          >
            <div>
              <div className='flex mb-3 items-center'>
                <Link href={`/profile/${reply.user.id}`}>
                  <span className='relative flex shrink-0 overflow-hidden rounded bg-black w-[50px] h-[50px] lg:w-[40px] lg:h-[40px] mr-3'>
                    <Avatar className='aspect-square h-full w-full m-0'>
                      <AvatarImage src={reply?.user.avatar ?? undefined} alt={reply?.user.name} />
                      <AvatarFallback>{reply?.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </span>
                </Link>
                <div className='flex flex-col items-start'>
                  <div className='font-bold text-gray-200 text-base leading-2 flex items-center gap-4'>
                    <Link href={`/profile/${reply.user.id}`} className='block'>
                      {reply.user.name}
                    </Link>
                  </div>
                </div>
                <div className='flex items-center gap-3 ml-3'>
                  <span className='text-gray-400 block text-sm'>
                    {format(new Date(reply.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
              <p className='text-gray-200 text-base block'>{reply.content}</p>
              { isAuth && accountId === reply.user.id && (
                <div className='lg:absolute top-3 right-4 mt-6 lg:mt-0 font-semibold flex items-center gap-2 -ml-2 lg:ml-0'>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={!!open}
        onOpenChange={setOpen}
        title='Delete comment'
        desc={`Are you sure you want to delete this comment? ${reply.content}`}
        confirmText='Delete'
        destructive
        handleConfirm={() => handleDelete(reply.id)}
        className='sm:max-w-sm'
      />
    </>
  )
}

export default function Reply({ commentId, accountId, elementId, showReplyForm, setShowReplyForm }: Props) {
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const limit = 2
  const commentsQuery = useReplyListQuery(commentId, limit)
  const router = useRouter()
  const isAuth = useAppStore((state) => state.isAuth)

  const allReplies = commentsQuery.data?.pages.flatMap((page) => page.payload.data) ?? []

  const hasMore = commentsQuery.hasNextPage
  const addCommentMutation = useAddCommentMutation({ page: 1, limit })

  const handleSubmitReply = async (e: FormEvent) => {
    e.preventDefault()
        if (!isAuth) {
          router.push('/login')
          return
        }
    if (!replyContent.trim() || isSubmitting) return

    setIsSubmitting(true)

    const body: CreateCommentBodyType = {
      content: replyContent.trim(),
      elementId: Number(elementId),
      replyCommentId: commentId
    }

    try {
      await addCommentMutation.mutateAsync(body)
      setReplyContent('')
      // if (page > 1) setPage(1)
    } catch (error) {
      console.error('Failed to post reply:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const loadMoreReplies = () => {
    if (hasMore && !commentsQuery.isFetchingNextPage) {
      commentsQuery.fetchNextPage()
    }
  }

  return (
    <>
      {allReplies.map((reply) => (
        <CommentCard key={reply.id} reply={reply} accountId={accountId} isAuth={isAuth} />
      ))}
      {showReplyForm && (
        <div className='w-full relative flex mb-2'>
          <div className='w-12 lg:w-24 h-full py-2 flex justify-center'>
            <button className='h-full border-none bg-sky-400  w-1 rounded-full' />
          </div>
          <div className='flex flex-col w-full gap-3'>
            <form
              onSubmit={handleSubmitReply}
              className='relative p-4 w-full bg-neutral-800 flex items-center gap-4 rounded-xl overflow-hidden'
            >
              <input
                type='text'
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                disabled={isSubmitting}
                className='w-full rounded-lg text-base flex-1 border-solid border border-neutral-500 block font-sans bg-neutral-700 text-gray-200 placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-gray-700 px-4 py-3'
                placeholder='Add a comment...'
              />
              <button
                type='submit'
                disabled={!replyContent.trim() || isSubmitting}
                className='inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-8'
              >
                {isSubmitting ? 'Sending...' : 'Send Reply'}
              </button>
              <button
                type='button'
                onClick={() => {
                  setReplyContent('')
                  setShowReplyForm()
                }}
                className='px-4 py-3 font-sans bg-transparent transition hover:bg-neutral-700 border-none cursor-pointer h-full text-offwhite font-semibold rounded-lg'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 transform rotate-45'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                >
                  <path d='M12 19v-7m0 0V5m0 7H5m7 0h7' />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
      {hasMore && (
        <div className='w-full relative flex'>
          <div className='w-12 lg:w-24 h-full py-2 flex justify-center'>
            <button className='h-full border-none bg-sky-400  w-1 rounded-full' />
          </div>
          <button
            onClick={loadMoreReplies}
            disabled={commentsQuery.isFetching}
            className='w-full py-3 text-sm text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-xl transition disabled:opacity-50'
          >
            {commentsQuery.isFetching ? 'Đang tải...' : 'Xem thêm'}
          </button>
        </div>
      )}
    </>
  )
}
