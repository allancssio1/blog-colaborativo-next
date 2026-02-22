'use client'

import { Suspense, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { usePostsQuery } from '@/hooks/usePosts'
import { useAuthStore } from '@/store/useAuthStore'
import { PostList } from '@/components/posts/PostList'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Button } from '@/components/ui/button'
import { Loader2, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Link from 'next/link'

function PostsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const page = parseInt(searchParams.get('page') || '1')
  const limit = 12
  const offset = (page - 1) * limit

  const { data: posts, isLoading, error } = usePostsQuery(limit, offset)

  const handleNext = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', (page + 1).toString())
    router.push(`/?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page, searchParams, router])

  const handlePrev = useCallback(() => {
    if (page > 1) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', (page - 1).toString())
      router.push(`/?${params.toString()}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [page, searchParams, router])

  if (isLoading && !posts) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Ultimas Postagens
        </h1>
        {isAuthenticated && (
          <Button
            asChild
            className="flex items-center gap-2 px-4 py-2 w-36"
          >
            <Link href="/create-post">
              <Plus className="mr-2 h-4 w-4" />
              Novo Post
            </Link>
          </Button>
        )}
      </div>

      <PostList posts={posts || []} />

      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={page <= 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        <span className="text-sm font-medium">Pagina {page}</span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={(posts?.length || 0) < limit || isLoading}
        >
          Proxima
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <PostsPageContent />
    </Suspense>
  )
}
