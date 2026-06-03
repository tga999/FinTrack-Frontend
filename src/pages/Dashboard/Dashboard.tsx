import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './Dashboard.css'

function Dashboard() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [nombreUsuario, setNombreUsuario] = useState('')

  const navigate = useNavigate()

  // trae los datos del usuario logueado al montar el componente
  useEffect(() => {
    api.get('/auth/me').then(res => {
      const { nombre, apellido } = res.data.usuario
      setNombreUsuario(`${nombre} ${apellido}`)
    })
  }, [])

  // borra el token y redirige al login
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/logo.png" alt="FinTrack" className="sidebar-logo-img" />
          {/* nombre real del usuario desde la API */}
          <p className="sidebar-user">{nombreUsuario}</p>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-item active">Inicio</div>
          <div className="nav-item">Transacciones</div>
          <div className="nav-item">Cuentas</div>
          <div className="nav-item">Categorias</div>
        </nav>
        <div className="sidebar-footer">
          <div className="registrar-container">
            {/* botón que despliega el menú de registro */}
            <button className="btn-registrar" onClick={() => setMenuAbierto(!menuAbierto)}>
              + Registrar
            </button>
            {/* menú desplegable de ingreso/gasto */}
            {menuAbierto && (
              <div className="menu-registro">
                <div className="menu-item ingreso">↑ Ingreso</div>
                <div className="menu-item gasto">↓ Gasto</div>
              </div>
            )}
          </div>
          {/* cierra sesión y redirige al login */}
          <div className="nav-item" onClick={handleLogout}>Cerrar sesión</div>
        </div>
      </aside>

      <main className="dashboard-main">
        {/* métricas del mes — datos hardcodeados por ahora */}
        <div className="metrics-grid">
          <div className="metric-card">
            <p className="metric-label">Balance total</p>
            <p className="metric-value">$47.320</p>
          </div>
          <div className="metric-card">
            <p className="metric-label">Ingresos del mes</p>
            <p className="metric-value ingreso">+$85.000</p>
          </div>
          <div className="metric-card">
            <p className="metric-label">Gastos del mes</p>
            <p className="metric-value gasto">-$37.680</p>
          </div>
        </div>

        {/* contenido principal — dos columnas */}
        <div className="dashboard-grid">

          {/* últimas transacciones — datos hardcodeados por ahora */}
          <div className="dashboard-card">
            <p className="card-title">Últimas transacciones</p>
            <div className="transacciones-lista">
              <div className="transaccion-item">
                <div className="transaccion-info">
                  <div className="transaccion-icono gasto">↓</div>
                  <div>
                    <p className="transaccion-desc">Supermercado</p>
                    <p className="transaccion-meta">Comida · hoy</p>
                  </div>
                </div>
                <p className="transaccion-monto gasto">-$4.200</p>
              </div>
              <div className="transaccion-item">
                <div className="transaccion-info">
                  <div className="transaccion-icono ingreso">↑</div>
                  <div>
                    <p className="transaccion-desc">Sueldo</p>
                    <p className="transaccion-meta">Ingreso · ayer</p>
                  </div>
                </div>
                <p className="transaccion-monto ingreso">+$85.000</p>
              </div>
              <div className="transaccion-item">
                <div className="transaccion-info">
                  <div className="transaccion-icono gasto">↓</div>
                  <div>
                    <p className="transaccion-desc">TV Samsung (3/12)</p>
                    <p className="transaccion-meta">Electrónica · 20 may</p>
                  </div>
                </div>
                <p className="transaccion-monto gasto">-$10.000</p>
              </div>
            </div>
          </div>

          {/* cuentas y cuotas — datos hardcodeados por ahora */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="dashboard-card">
              <p className="card-title">Mis cuentas</p>
              <div className="cuentas-lista">
                <div className="cuenta-item">
                  <p className="cuenta-nombre">Efectivo</p>
                  <p className="cuenta-saldo">$12.000</p>
                </div>
                <div className="cuenta-item">
                  <p className="cuenta-nombre">Débito</p>
                  <p className="cuenta-saldo">$35.320</p>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <p className="card-title">Cuotas pendientes</p>
              <div className="cuenta-item">
                <div>
                  <p className="cuenta-nombre">TV Samsung</p>
                  <p className="transaccion-meta">Cuota 3/12 · vence 21 jun</p>
                </div>
                <p className="transaccion-monto" style={{ color: '#f5a623' }}>$10.000</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Dashboard