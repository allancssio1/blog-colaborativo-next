'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { usePostQuery, useDeletePost } from '@/hooks/usePosts'
import { PostDetail } from '@/components/posts/PostDetail'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { data: post, isLoading, error } = usePostQuery(id)
  const deletePost = useDeletePost()

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(id)
      toast.success('Post deletado com sucesso.')
      router.push('/')
    } catch {
      toast.error('Nao foi possivel deletar o post.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <ErrorMessage message={error.message} />
        <div className="mt-4 text-center">
          <Button onClick={() => router.push('/')} variant="outline">
            Voltar para lista
          </Button>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Post nao encontrado</h2>
        <Button onClick={() => router.push('/')} variant="link">
          Voltar para lista
        </Button>
      </div>
    )
  }

  return (
    <PostDetail
      post={post}
      onDelete={handleDelete}
      isDeleting={deletePost.isPending}
    />
  )
}
