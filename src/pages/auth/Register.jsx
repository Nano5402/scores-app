import { useState }         from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useForm }          from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, User, CreditCard } from 'lucide-react'
import useAuthStore         from '../../store/useAuthStore'
import useUIStore           from '../../store/useUIStore'
import { authService }      from '../../services/authService'
import Button               from '../../components/ui/Button'
import Input                from '../../components/ui/Input'

export default function Register() {
  const [showPwd, setShowPwd] = useState(false)
  const { login }    = useAuthStore()
  const { addToast } = useUIStore()
  const navigate     = useNavigate()

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      const res = await authService.register({
        numero_documento: data.numero_documento,
        nombre: data.nombre, apellido: data.apellido,
        email: data.email,   password: data.password,
      })
      login(res.user, res.token)
      addToast({ type: 'success', title: '¡Cuenta creada!', message: `Bienvenido, ${res.user.nombre}` })
      navigate('/')
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: err.message || 'No se pudo crear la cuenta' })
    }
  }

  return (
    <div className="max-w-sm mx-auto animate-fade-up">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-text-primary text-2xl font-bold mx-auto mb-4 shadow-lg shadow-brand/30">S</div>
        <h1 className="text-2xl font-bold text-text-primary">Crear cuenta</h1>
        <p className="text-text-secondary text-sm mt-1">Únete a ScoreApp hoy</p>
      </div>

      <div className="bg-app-card border border-border-light rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">Número de cédula</label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center px-3 bg-border-light border border-border-light rounded-lg text-xs font-bold text-brand shrink-0">CC</div>
              <div className="relative flex-1">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                <input type="number" placeholder="1000123456"
                  className={`w-full bg-app-card border rounded-lg pl-10 pr-3 py-2.5 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    ${errors.numero_documento ? 'border-red-500 focus:ring-red-500/20' : 'border-border-light focus:border-brand focus:ring-brand/20'}`}
                  {...register('numero_documento', { required: 'El número de documento es requerido', minLength: { value: 6, message: 'Mínimo 6 dígitos' } })}
                />
              </div>
            </div>
            {errors.numero_documento && <p className="text-xs text-red-400">{errors.numero_documento.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Nombre" placeholder="Carlos" leftIcon={<User className="w-4 h-4" />} error={errors.nombre?.message} {...register('nombre', { required: 'Requerido' })} />
            <Input label="Apellidos" placeholder="García" error={errors.apellido?.message} {...register('apellido', { required: 'Requerido' })} />
          </div>

          <Input label="Correo electrónico" type="email" placeholder="tu@email.com"
            leftIcon={<Mail className="w-4 h-4" />}
            hint="Lo usarás para recuperar tu contraseña"
            error={errors.email?.message}
            {...register('email', { required: 'El correo es requerido', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' } })}
          />

          <Input label="Contraseña" type={showPwd ? 'text' : 'password'} placeholder="Mínimo 8 caracteres"
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={<button type="button" onClick={() => setShowPwd(!showPwd)}>{showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>}
            error={errors.password?.message}
            {...register('password', { required: 'La contraseña es requerida', minLength: { value: 8, message: 'Mínimo 8 caracteres' } })}
          />

          <Input label="Confirmar contraseña" type="password" placeholder="Repite tu contraseña"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', { required: 'Confirma tu contraseña', validate: (v) => v === password || 'Las contraseñas no coinciden' })}
          />

          <Button type="submit" fullWidth size="lg" loading={isSubmitting}>Crear cuenta</Button>
        </form>
      </div>

      <p className="text-center text-sm text-text-secondary mt-4">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-brand hover:text-brand-light font-medium transition-colors">Inicia sesión</Link>
      </p>
    </div>
  )
}