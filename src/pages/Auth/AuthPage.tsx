import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './AuthPage.css'

function AuthPage() {
  const [esLogin, setEsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [errores, setErrores] = useState<Record<string, string>>({})

  const navigate = useNavigate()

  const handleSubmit = async () => {
    setErrores({})
    try {
      if (esLogin) {
        const res = await api.post('/auth/login', { email, password })
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
      } else {
        const res = await api.post('/auth/registro', { nombre, apellido, email, password })
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
      }
    } catch (err: any) {
      if (err.response?.data?.errores) {
        setErrores(err.response.data.errores)
      } else {
        setErrores({ general: err.response?.data?.mensaje || 'Error al conectar' })
      }
    }
  }

  return (
    <div className="auth-container">
      <div className={`auth-box ${esLogin ? '' : 'registro'}`}>

        {/* Panel formulario */}
        <div className="auth-form-panel">
          <h1 className="auth-title">{esLogin ? 'Login' : 'Registro'}</h1>

          {!esLogin && (
            <>
              <input className="auth-input" type="text" placeholder="Nombre"
                value={nombre} onChange={(e) => setNombre(e.target.value)} />
              {errores.nombre && <p className="auth-error">{errores.nombre}</p>}

              <input className="auth-input" type="text" placeholder="Apellido"
                value={apellido} onChange={(e) => setApellido(e.target.value)} />
              {errores.apellido && <p className="auth-error">{errores.apellido}</p>}
            </>
          )}

          <input className="auth-input" type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          {errores.email && <p className="auth-error">{errores.email}</p>}

          <input className="auth-input" type="password" placeholder="Contraseña"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {errores.password && <p className="auth-error">{errores.password}</p>}

          <button className="auth-button" onClick={handleSubmit}>
            {esLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>

          {errores.general && <p className="auth-error">{errores.general}</p>}
        </div>

        {/* Panel bienvenida */}
        <div className="auth-welcome-panel">
          <h2>{esLogin ? '¡Bienvenido!' : '¡Hola!'}</h2>
          <p>
            {esLogin
              ? 'Ingresá tus datos para continuar gestionando tus finanzas'
              : 'Creá tu cuenta y empezá a gestionar tu dinero'}
          </p>
          <button className="auth-switch-button" onClick={() => setEsLogin(!esLogin)}>
            {esLogin ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default AuthPage