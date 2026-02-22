'use client'

import Link from 'next/link'
import { ArrowLeft, PenSquare } from 'lucide-react'
import { type Post } from '@/service/postService'
import { useAuthStore } from '@/store/useAuthStore'
import { formatDate } from '@/utils/formatDate'
import { Button } from '@/components/ui/button'
import { PostDelete } from './PostDelete'
import { Separator } from '@/components/ui/separator'

interface PostDetailProps {
  post: Post
  onDelete: () => void
  isDeleting: boolean
}

export function PostDetail({ post, onDelete, isDeleting }: PostDetailProps) {
  const user = useAuthStore((s) => s.user)
  const isAuthor = user && post && user.id === post.author_id

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button
            variant="ghost"
            className="pl-0 gap-2 hover:bg-transparent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para lista
          </Button>
        </Link>
        {isAuthor && (
          <div className="flex items-center gap-2">
            <Link href={`/edit-post/${post.id}`}>
              <Button variant="outline" size="sm">
                <PenSquare className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </Link>
            <PostDelete onConfirm={onDelete} isLoading={isDeleting} />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground flex items-center gap-2">
            Por {post.author_name}
          </span>
          <Separator
            orientation="vertical"
            className="h-4 hidden sm:block"
          />
          <time dateTime={post.created_at} title={post.created_at}>
            Postado em {formatDate(post.created_at)}
          </time>
          {post.updated_at && post.updated_at !== post.created_at && (
            <>
              <Separator
                orientation="vertical"
                className="h-4 hidden sm:block"
              />
              <span title={post.updated_at} className="italic">
                (Atualizado em {formatDate(post.updated_at)})
              </span>
            </>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      <div className="prose dark:prose-invert max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  )
}
