import { RegisterForm } from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 h-full min-h-[80vh]">
      <div className="flex flex-col items-center justify-center w-full max-w-md space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Crie sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Preencha os dados abaixo para comecar a postar
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
