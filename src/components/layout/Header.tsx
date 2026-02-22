'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { LogOut, User as UserIcon, FileText } from 'lucide-react'
import { ThemeToggle } from '../theme-toggle'

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const isAuthPage = ['/login', '/register'].includes(pathname)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
    setShowLogoutDialog(false)
  }

  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="size-8 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <Link href="/" className="flex items-center min-w-0">
              <span className="font-bold text-lg text-primary tracking-tight truncate">
                Blog Colaborativo
              </span>
            </Link>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors shrink-0 hidden sm:block"
          >
            Voltar para Home
          </Link>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <span className="inline-block font-bold text-lg md:text-xl text-primary tracking-tight truncate max-w-37.5 sm:max-w-none">
              Blog Colaborativo
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-2 text-sm text-foreground bg-muted px-3 py-1.5 rounded-full">
                <UserIcon className="h-4 w-4" />
                <span
                  className="font-medium max-w-25 truncate"
                  title={user?.name}
                >
                  {user?.name}
                </span>
              </div>

              <AlertDialog
                open={showLogoutDialog}
                onOpenChange={setShowLogoutDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Sair"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar logout</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja sair da sua conta?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Sair
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Cadastrar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
