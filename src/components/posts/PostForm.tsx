'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface PostFormProps {
  initialData?: { title: string; content: string }
  onSubmit: (data: { title: string; content: string }) => Promise<void>
  isLoading: boolean
  submitLabel: string
}

export function PostForm({
  initialData,
  onSubmit,
  isLoading,
  submitLabel,
}: PostFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {}
    if (!formData.title || formData.title.trim().length < 5) {
      newErrors.title = 'O título deve ter no mínimo 5 caracteres.'
    }
    if (!formData.content || formData.content.trim().length < 10) {
      newErrors.content = 'O conteúdo deve ter no mínimo 10 caracteres.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-1">
      <div className="space-y-2">
        <Label htmlFor="title">Título do Post</Label>
        <Input
          id="title"
          placeholder="Digite o título do post"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={errors.title ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          id="content"
          placeholder="Digite o conteúdo do post..."
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className={`min-h-[200px] ${errors.content ? 'border-red-500' : ''}`}
          disabled={isLoading}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content}</p>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="min-w-[120px]">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  )
}
