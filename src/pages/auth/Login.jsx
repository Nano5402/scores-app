import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, CreditCard, Lock } from 'lucide-react'
import useAuthStore from '../../store/useAuthStore'
import useUIStore from '../../store/useUIStore'
import { authService } from '../../services/authService'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function Login() {
  const [showPwd, setShowPwd] = useState(false)
  const { login } = useAuthStore()
  const { addToast } = useUIStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await authService.login({
        numero_documento: data.numero_documento,
        password: data.password,
      })

      // El backend puede devolver { user, token } o { data: { user, token } }
      const user = res?.user ?? res?.data?.user
      const token = res?.token ?? res?.data?.token

      if (!user || !token) {
        console.error('Respuesta inesperada del backend:', res)
        throw new Error('Respuesta del servidor inválida')
      }

      login(user, token)
      addToast({ type: 'success', title: '¡Bienvenido!', message: `Hola, ${user.nombre}` })
      navigate('/')
    } catch (err) {
      setError('numero_documento', {
        message: err.message || 'Documento o contraseña incorrectos',
      })
    }
  }

  return (
    <div className='auth-card animate-fade-up'>
      <div className='mb-8'>
        <h1 className='text-2xl font-black mb-1' style={{ color: 'var(--text-primary)' }}>
          Iniciar sesión
        </h1>
        <p className='text-sm' style={{ color: 'var(--text-muted)' }}>
          Accede con tu número de cédula
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <div className='form-group'>
          <label className='form-label'>Número de cédula</label>
          <div className='flex gap-2'>
            <div
              className='flex items-center justify-center px-3 rounded-lg text-xs font-bold shrink-0'
              style={{
                backgroundColor: 'var(--color-brand-dim)',
                color: 'var(--color-brand)',
                border: '1px solid var(--border-color)',
              }}
            >
              CC
            </div>
            <div className='relative flex-1'>
              <CreditCard
                className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none'
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                type='number'
                placeholder='1090512345'
                className={`form-input pl-10 ${errors.numero_documento ? 'error' : ''}`}
                {...register('numero_documento', {
                  required: 'El número de documento es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 dígitos' },
                })}
              />
            </div>
          </div>
          {errors.numero_documento && (
            <p className='form-error'>{errors.numero_documento.message}</p>
          )}
        </div>

        <Input
          label='Contraseña'
          type={showPwd ? 'text' : 'password'}
          placeholder='Tu contraseña'
          leftIcon={<Lock className='w-4 h-4' />}
          rightIcon={
            <button type='button' onClick={() => setShowPwd(!showPwd)}>
              {showPwd ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
            </button>
          }
          error={errors.password?.message}
          {...register('password', { required: 'La contraseña es requerida' })}
        />

        <div className='flex items-center justify-between'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input type='checkbox' className='rounded' {...register('remember')} />
            <span className='text-sm' style={{ color: 'var(--text-secondary)' }}>
              Recordarme
            </span>
          </label>
          <Link
            to='/forgot-password'
            className='text-sm font-medium'
            style={{ color: 'var(--color-brand)' }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button type='submit' fullWidth size='lg' loading={isSubmitting}>
          Iniciar sesión
        </Button>

        <div className='divider-text'>o</div>
      </form>

      <p className='text-center text-sm mt-6' style={{ color: 'var(--text-muted)' }}>
        ¿No tienes cuenta?{' '}
        <Link to='/register' className='font-semibold' style={{ color: 'var(--color-brand)' }}>
          Regístrate
        </Link>
      </p>
    </div>
  )
}
