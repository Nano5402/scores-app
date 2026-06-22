import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import useAuthStore from '../../store/useAuthStore'
import useUIStore   from '../../store/useUIStore'
import Button from '../../components/ui/Button'
import Input  from '../../components/ui/Input'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const { login }    = useAuthStore()
  const { addToast } = useUIStore()
  const navigate     = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000))

    const newUser = {
      id:       'u-' + Date.now(),
      name:     data.name,
      lastName: data.lastName,
      email:    data.email,
    }

    login(newUser, 'mock-token-' + newUser.id)
    addToast({ type: 'success', title: '¡Cuenta creada!', message: `Bienvenido, ${data.name}` })
    navigate('/')
  }

  return (
    <div className="max-w-sm mx-auto animate-fade-up">

      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-text-primary text-2xl font-bold mx-auto mb-4 shadow-lg shadow-brand/30">
          S
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Crear cuenta</h1>
        <p className="text-text-secondary text-sm mt-1">Únete a ScoreApp hoy</p>
      </div>

      <div className="bg-app-card border border-border-light rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Nombre"
              placeholder="Carlos"
              leftIcon={<User className="w-4 h-4" />}
              error={errors.name?.message}
              {...register('name', { required: 'Requerido' })}
            />
            <Input
              label="Apellidos"
              placeholder="García"
              error={errors.lastName?.message}
              {...register('lastName', { required: 'Requerido' })}
            />
          </div>

          <Input
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email', {
              required: 'El correo es requerido',
              pattern:  { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' },
            })}
          />

          <Input
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            placeholder="Mínimo 8 caracteres"
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            error={errors.password?.message}
            {...register('password', {
              required:  'La contraseña es requerida',
              minLength: { value: 8, message: 'Mínimo 8 caracteres' },
            })}
          />

          <Input
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Confirma tu contraseña',
              validate: (val) => val === password || 'Las contraseñas no coinciden',
            })}
          />

          <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
            Crear cuenta
          </Button>

        </form>
      </div>

      <p className="text-center text-sm text-text-secondary mt-4">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-brand hover:text-brand-light font-medium transition-colors">
          Inicia sesión
        </Link>
      </p>

    </div>
  )
}