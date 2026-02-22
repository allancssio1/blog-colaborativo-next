import Link from 'next/link'
import { type Post } from '../../service/postService'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { formatDate } from '../../utils/formatDate'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="block h-full transition-transform hover:-translate-y-1"
    >
      <Card className="hover:shadow-md h-full flex flex-col">
        <CardHeader>
          <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {post.content}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground mt-auto">
          <span className="font-medium text-primary">{post.author_name}</span>
          <span>{formatDate(post.created_at)}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
