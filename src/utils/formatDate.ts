import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (dateString: string) => {
  if (!dateString) return ''
  try {
    const date = parseISO(dateString)
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
  } catch {
    return dateString
  }
}
