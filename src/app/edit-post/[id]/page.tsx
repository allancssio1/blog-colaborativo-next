'use client'

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePostQuery, useUpdatePost } from '@/hooks/usePosts'
import { useAuthStore } from '@/store/useAuthStore'
import { PostForm } from '@/components/posts/PostForm'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const { data: post, isLoading, error } = usePostQuery(id)
  const updatePost = useUpdatePost()

  useEffect(() => {
    if (post && user && post.author_id !== user.id) {
      toast.error('Voce nao tem permissao para editar este post.')
      router.push('/')
    }
  }, [post, user, router])

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      await updatePost.mutateAsync({ id, data })
      toast.success('Post atualizado com sucesso!')
      router.push(`/posts/${id}`)
    } catch {
      toast.error('Falha ao atualizar post.')
    }
  }

  if (isLoading && !post) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  if (!post) {
    return <ErrorMessage message="Post nao encontrado" />
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Editar Post</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <PostForm
            initialData={{ title: post.title, content: post.content }}
            onSubmit={handleSubmit}
            isLoading={updatePost.isPending}
            submitLabel="Salvar Alteracoes"
          />
        </CardContent>
      </Card>
    </div>
  )
}
