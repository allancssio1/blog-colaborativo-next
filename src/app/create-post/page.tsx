'use client'

import { useRouter } from 'next/navigation'
import { useCreatePost } from '@/hooks/usePosts'
import { PostForm } from '@/components/posts/PostForm'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

export default function CreatePostPage() {
  const router = useRouter()
  const createPost = useCreatePost()

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      await createPost.mutateAsync(data)
      toast.success('Post criado com sucesso!')
      router.push('/')
    } catch {
      toast.error('Falha ao criar post.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Criar Novo Post</h1>
        <p className="text-muted-foreground">
          Compartilhe suas ideias com a comunidade
        </p>
      </div>

      {createPost.error && (
        <ErrorMessage message={createPost.error.message} />
      )}

      <Card>
        <CardContent className="pt-6">
          <PostForm
            onSubmit={handleSubmit}
            isLoading={createPost.isPending}
            submitLabel="Publicar Post"
          />
        </CardContent>
      </Card>
    </div>
  )
}
