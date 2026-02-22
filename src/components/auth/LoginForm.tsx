'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { login as loginService } from '@/service/authService'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Campos vazios', {
        description: 'Por favor, preencha todos os campos.',
      })
      return
    }

    setLoading(true)
    try {
      const data = await loginService(email, password)
      login(data.user, data.token)
      toast.success('Login realizado com sucesso', {
        description: `Bem-vindo de volta, ${data.user.name}!`,
      })
      router.push('/')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      const msg =
        err.response?.data?.message || 'Ocorreu um erro ao fazer login.'
      toast.error('Erro no login', {
        description: msg,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-105 shadow-lg overflow-hidden">
      <div className="p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label htmlFor="email" className="block mb-2">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-8">
            <Label htmlFor="password" className="block mb-2">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <Button type="submit" className="w-full mb-4" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Nao tem conta?{' '}
            <Link
              href="/register"
              className="underline text-primary hover:text-primary/90"
            >
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </Card>
  )
}
