'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { toast } from 'sonner'
import { login, register } from '@/service/authService'
import { validateEmail } from '@/utils/validateEmail'

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
  }>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const router = useRouter()
  const auth = useAuthStore()

  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {}
    if (name.trim().length < 3) {
      newErrors.name = 'Nome deve ter no minimo 3 caracteres'
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Email invalido'
    }
    if (password.length < 8) {
      newErrors.password = 'Senha deve ter no minimo 8 caracteres'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError(null)

    if (!validate()) return

    setLoading(true)
    try {
      await register(name, email, password)
      const loginResponse = await login(email, password)
      auth.login(loginResponse.user, loginResponse.token)
      toast.success('Conta criada com sucesso! Redirecionando...')
      router.push('/')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      const message =
        err.response?.data?.message ||
        'Falha ao criar conta. Tente novamente.'
      setApiError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-[420px] shadow-lg overflow-hidden">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <ErrorMessage message={apiError || undefined} />

          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Cadastrar'
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Ja tem conta?{' '}
            <Link
              href="/login"
              className="underline text-primary hover:text-primary/90"
            >
              Faca login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
