import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">Pagina nao encontrada</h2>
      <p className="text-muted-foreground max-w-sm">
        O recurso que voce esta procurando nao existe ou foi movido.
      </p>
      <Button size="lg" className="mt-4" asChild>
        <Link href="/">Voltar para Posts</Link>
      </Button>
    </div>
  )
}
