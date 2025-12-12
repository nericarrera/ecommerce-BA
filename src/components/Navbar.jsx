import { Link, useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faHome, 
  faShoppingCart,  
  faRobot, 
  faCat,
  faDog,
  faUsers,
  faSignInAlt,
  faSignOutAlt,
  faPaw,
  faChevronDown  // Agregué este icono que sí usas
} from "@fortawesome/free-solid-svg-icons"
import "../index.css"
import { useAppContext } from '../hooks/useAppContext';

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, usuario, cart, cerrarSesion } = useAppContext()

  // Determinar valor del select basado en la ruta actual
  let selectValue = ""
  if (location.pathname === "/mascotas") selectValue = "mascotas"
  else if (location.pathname === "/gatos") selectValue = "gatos"
  else if (location.pathname === "/perros") selectValue = "perros"
  else if (location.pathname === "/servicios") selectValue = "servicios"
  else selectValue = ""

  const totalProductos = cart.reduce((total, item) => total + item.quantity, 0)

  const handleSelectChange = (e) => {
    const value = e.target.value
    switch (value) {
      case "inicio":
        navigate("/")
        break
      case "mascotas":
        navigate("/mascotas")
        break
      case "gatos":
        navigate("/gatos")
        break
      case "perros":
        navigate("/perros")
        break
      case "servicios":
        navigate("/servicios")
        break
      default:
        navigate("/")
    }
  }

  // Verificar si una ruta está activa
  const isActive = (path) => location.pathname === path

  return (
    <nav
      className="navbar navbar-expand-lg fw-bold fixed-top shadow-lg"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(120, 219, 226, 0.3)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        zIndex: 1050
      }}
    >
      <div className="container-fluid">
        {/* Marca futurista */}
        <Link
          className="navbar-brand fw-bold fs-4 d-flex align-items-center"
          to="/"
          style={{ 
            color: "transparent",
            background: "linear-gradient(90deg, #78dbe2, #ff77b8, #667eea)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            textShadow: "0 0 20px rgba(120, 219, 226, 0.3)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.textShadow = "0 0 30px rgba(120, 219, 226, 0.7)"
          }}
          onMouseLeave={(e) => {
            e.target.style.textShadow = "0 0 20px rgba(120, 219, 226, 0.3)"
          }}
        >
          <FontAwesomeIcon icon={faRobot} className="me-2" style={{ color: "#78dbe2" }} />
          PetFuture
        </Link>

        {/* Botón hamburguesa futurista */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            border: "1px solid rgba(120, 219, 226, 0.5)",
            background: "rgba(15, 23, 42, 0.8)",
            padding: "8px 12px"
          }}
        >
          <span 
            className="navbar-toggler-icon"
            style={{ 
              filter: "invert(1)",
              width: "24px",
              height: "24px"
            }}
          ></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto fs-6 align-items-center">
            {/* Inicio - Mejorado con estado activo */}
            <li className="nav-item me-3">
              <Link 
                className="nav-link d-flex align-items-center position-relative"
                to="/"
                style={{
                  color: isActive("/") ? "#78dbe2" : "#cbd5e1",
                  transition: "all 0.3s ease",
                  textShadow: isActive("/") ? "0 0 10px rgba(120, 219, 226, 0.7)" : "none"
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/")) {
                    e.target.style.color = "#78dbe2"
                    e.target.style.textShadow = "0 0 10px rgba(120, 219, 226, 0.7)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/")) {
                    e.target.style.color = "#cbd5e1"
                    e.target.style.textShadow = "none"
                  }
                }}
              >
                <FontAwesomeIcon 
                  icon={faHome} 
                  className="me-2" 
                  style={{ 
                    color: isActive("/") ? "#78dbe2" : "#cbd5e1"
                  }}
                />
                Inicio
                {isActive("/") && (
                  <span 
                    className="position-absolute bottom-0 start-50 translate-middle-x"
                    style={{
                      width: "70%",
                      height: "2px",
                      background: "linear-gradient(90deg, transparent, #78dbe2, transparent)",
                      borderRadius: "2px"
                    }}
                  ></span>
                )}
              </Link>
            </li>

            {/* Selector de navegación futurista - MEJORADO */}
            <li className="nav-item d-flex align-items-center me-3">
              <div className="position-relative">
                <FontAwesomeIcon 
                  className="position-absolute ms-2"
                  style={{ 
                    top: "50%", 
                    transform: "translateY(-50%)", 
                    left: "12px", 
                    color: "#78dbe2",
                    zIndex: 2,
                    fontSize: "0.9rem"
                  }} 
                />
                <select
                  className="form-select fw-semibold border-0 fs-6 ps-4 pe-4"
                  onChange={handleSelectChange}
                  value={selectValue}
                  style={{
                    background: "rgba(30, 41, 59, 0.9)",
                    color: "#cbd5e1",
                    borderRadius: "25px",
                    border: `1px solid ${selectValue ? "rgba(120, 219, 226, 0.6)" : "rgba(120, 219, 226, 0.3)"}`,
                    paddingLeft: "40px",
                    minWidth: "160px",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(51, 65, 85, 0.95)"
                    e.target.style.boxShadow = "0 0 20px rgba(120, 219, 226, 0.4)"
                    e.target.style.border = "1px solid rgba(120, 219, 226, 0.8)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(30, 41, 59, 0.9)"
                    e.target.style.boxShadow = "none"
                    e.target.style.border = `1px solid ${selectValue ? "rgba(120, 219, 226, 0.6)" : "rgba(120, 219, 226, 0.3)"}`
                  }}
                >
                  <option value="mascotas" style={{ background: "#1e293b", color: "#cbd5e1" }}>
                    🐾 Todas las Mascotas
                  </option>
                  <option value="gatos" style={{ background: "#1e293b", color: "#cbd5e1" }}>
                    🐱 Gatos
                  </option>
                  <option value="perros" style={{ background: "#1e293b", color: "#cbd5e1" }}>
                    🐶 Perros
                  </option>
                  <option value="servicios" style={{ background: "#1e293b", color: "#cbd5e1" }}>
                    ⚙️ Servicios
                  </option>
                </select>
                {/* Flecha personalizada - AHORA usa faChevronDown que está importado */}
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className="position-absolute"
                  style={{ 
                    top: "50%", 
                    transform: "translateY(-50%)", 
                    right: "12px", 
                    color: "#78dbe2",
                    zIndex: 2,
                    fontSize: "0.8rem",
                    pointerEvents: "none"
                  }} 
                />
              </div>
            </li>

            {/* Enlaces directos para desktop - NUEVOS */}
            <div className="d-none d-lg-flex align-items-center me-3">
              {/* Todas las Mascotas */}
              <li className="nav-item me-3">
                <Link 
                  className="nav-link d-flex align-items-center position-relative"
                  to="/mascotas"
                  style={{
                    color: isActive("/mascotas") ? "#78dbe2" : "#cbd5e1",
                    transition: "all 0.3s ease",
                    textShadow: isActive("/mascotas") ? "0 0 10px rgba(120, 219, 226, 0.7)" : "none"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/mascotas")) {
                      e.target.style.color = "#78dbe2"
                      e.target.style.textShadow = "0 0 10px rgba(120, 219, 226, 0.7)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/mascotas")) {
                      e.target.style.color = "#cbd5e1"
                      e.target.style.textShadow = "none"
                    }
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faPaw} 
                    className="me-2" 
                    style={{ 
                      color: isActive("/mascotas") ? "#78dbe2" : "#cbd5e1"
                    }}
                  />
                  Mascotas
                </Link>
              </li>

              {/* Gatos - Icono separado */}
              <li className="nav-item me-3">
                <Link 
                  className="nav-link d-flex align-items-center position-relative"
                  to="/gatos"
                  style={{
                    color: isActive("/gatos") ? "#ff77b8" : "#cbd5e1",
                    transition: "all 0.3s ease",
                    textShadow: isActive("/gatos") ? "0 0 10px rgba(255, 119, 184, 0.7)" : "none"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/gatos")) {
                      e.target.style.color = "#ff77b8"
                      e.target.style.textShadow = "0 0 10px rgba(255, 119, 184, 0.7)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/gatos")) {
                      e.target.style.color = "#cbd5e1"
                      e.target.style.textShadow = "none"
                    }
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faCat} 
                    className="me-2" 
                    style={{ 
                      color: isActive("/gatos") ? "#ff77b8" : "#cbd5e1"
                    }}
                  />
                  Gatos
                </Link>
              </li>

              {/* Perros - Icono separado */}
              <li className="nav-item me-3">
                <Link 
                  className="nav-link d-flex align-items-center position-relative"
                  to="/perros"
                  style={{
                    color: isActive("/perros") ? "#667eea" : "#cbd5e1",
                    transition: "all 0.3s ease",
                    textShadow: isActive("/perros") ? "0 0 10px rgba(102, 126, 234, 0.7)" : "none"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/perros")) {
                      e.target.style.color = "#667eea"
                      e.target.style.textShadow = "0 0 10px rgba(102, 126, 234, 0.7)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/perros")) {
                      e.target.style.color = "#cbd5e1"
                      e.target.style.textShadow = "none"
                    }
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faDog} 
                    className="me-2" 
                    style={{ 
                      color: isActive("/perros") ? "#667eea" : "#cbd5e1"
                    }}
                  />
                  Perros
                </Link>
              </li>
            </div>

            {/* Servicios - Mejorado */}
            <li className="nav-item me-3">
              <Link 
                className="nav-link d-flex align-items-center position-relative"
                to="/servicios"
                style={{
                  color: isActive("/servicios") ? "#10b981" : "#cbd5e1",
                  transition: "all 0.3s ease",
                  textShadow: isActive("/servicios") ? "0 0 10px rgba(16, 185, 129, 0.7)" : "none"
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/servicios")) {
                    e.target.style.color = "#10b981"
                    e.target.style.textShadow = "0 0 10px rgba(16, 185, 129, 0.7)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/servicios")) {
                    e.target.style.color = "#cbd5e1"
                    e.target.style.textShadow = "none"
                  }
                }}
              >
                <FontAwesomeIcon 
                  icon={faUsers} 
                  className="me-2" 
                  style={{ 
                    color: isActive("/servicios") ? "#10b981" : "#cbd5e1"
                  }}
                />
                Servicios
              </Link>
            </li>

            {/* Carrito y usuario - MEJORADO */}
            <li className="nav-item d-flex align-items-center">
              {/* Carrito futurista con badge animado */}
              <Link
                className="nav-link position-relative p-0 me-3"
                to="/carrito"
                style={{
                  color: isActive("/carrito") ? "#78dbe2" : "#cbd5e1",
                  transition: "all 0.3s ease",
                  transform: "scale(1)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#78dbe2"
                  e.target.style.transform = "scale(1.1)"
                  e.target.style.textShadow = "0 0 15px rgba(120, 219, 226, 0.7)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = isActive("/carrito") ? "#78dbe2" : "#cbd5e1"
                  e.target.style.transform = "scale(1)"
                  e.target.style.textShadow = isActive("/carrito") ? "0 0 10px rgba(120, 219, 226, 0.7)" : "none"
                }}
              >
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {cart && cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill pulse-animation"
                    style={{ 
                      fontSize: "0.7rem", 
                      padding: "0.25em 0.6em",
                      background: "linear-gradient(135deg, #ff77b8, #ff6b6b)",
                      boxShadow: "0 0 10px rgba(255, 119, 184, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      animation: "pulse 2s infinite"
                    }}
                  >
                    {totalProductos}
                  </span>
                )}
              </Link>

              {/* Estado de autenticación - MEJORADO */}
              {isAuthenticated ? (
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column">
                    <span 
                      className="fs-6"
                      style={{ 
                        color: "#78dbe2",
                        textShadow: "0 0 5px rgba(120, 219, 226, 0.5)",
                        lineHeight: "1.2"
                      }}
                    >
                      👋 Hola, {usuario.nombre || "Usuario"}!
                    </span>
                    <small 
                      className="text-muted"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {usuario.email || ""}
                    </small>
                  </div>
                  <button
                    onClick={cerrarSesion}
                    className="btn btn-link ms-3 d-flex align-items-center"
                    style={{ 
                      textDecoration: "none",
                      color: "#94a3b8",
                      transition: "all 0.3s ease",
                      padding: "4px 8px",
                      borderRadius: "20px",
                      border: "1px solid transparent"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#ff77b8"
                      e.target.style.textShadow = "0 0 10px rgba(255, 119, 184, 0.5)"
                      e.target.style.border = "1px solid rgba(255, 119, 184, 0.3)"
                      e.target.style.background = "rgba(255, 119, 184, 0.1)"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#94a3b8"
                      e.target.style.textShadow = "none"
                      e.target.style.border = "1px solid transparent"
                      e.target.style.background = "transparent"
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Salir
                  </button>
                </div>
              ) : (
                <Link 
                  className="nav-link d-flex align-items-center"
                  to="/iniciar-sesion"
                  style={{
                    color: isActive("/iniciar-sesion") ? "#78dbe2" : "#cbd5e1",
                    transition: "all 0.3s ease",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    border: `1px solid ${isActive("/iniciar-sesion") ? "rgba(120, 219, 226, 0.5)" : "transparent"}`,
                    background: isActive("/iniciar-sesion") ? "rgba(120, 219, 226, 0.1)" : "transparent"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/iniciar-sesion")) {
                      e.target.style.color = "#78dbe2"
                      e.target.style.textShadow = "0 0 10px rgba(120, 219, 226, 0.7)"
                      e.target.style.border = "1px solid rgba(120, 219, 226, 0.5)"
                      e.target.style.background = "rgba(120, 219, 226, 0.1)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/iniciar-sesion")) {
                      e.target.style.color = "#cbd5e1"
                      e.target.style.textShadow = "none"
                      e.target.style.border = "1px solid transparent"
                      e.target.style.background = "transparent"
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                  Iniciar Sesión
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar