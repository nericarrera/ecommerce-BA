import { Link, useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faShoppingCart, faPaw, faRobot } from "@fortawesome/free-solid-svg-icons"
import "../index.css"
import { useAppContext } from "../context/AppContext"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, usuario, cart, cerrarSesion } = useAppContext()

  let selectValue = ""
  if (location.pathname === "/gatos") selectValue = "gatos"
  else if (location.pathname === "/perros") selectValue = "perros"
  else selectValue = ""

  const totalProductos = cart.reduce((total, item) => total + item.quantity, 0)

  const handleSelectChange = (e) => {
    const value = e.target.value
    switch (value) {
      case "gatos":
        navigate("/gatos")
        break
      case "perros":
        navigate("/perros")
        break
      default:
        navigate("/")
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg fw-bold fixed-top shadow-lg"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(120, 219, 226, 0.3)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
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
            textShadow: "0 0 20px rgba(120, 219, 226, 0.3)"
          }}
        >
          <FontAwesomeIcon icon={faRobot} className="me-2" style={{ color: "#78dbe2" }} />
          e-commerce-BA
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
            background: "rgba(15, 23, 42, 0.8)"
          }}
        >
          <span 
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }}
          ></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto fs-6 align-items-center">
            {/* Inicio */}
            <li className="nav-item">
              <Link 
                className="nav-link d-flex align-items-center position-relative"
                to="/"
                style={{
                  color: "#cbd5e1",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#78dbe2"
                  e.target.style.textShadow = "0 0 10px rgba(120, 219, 226, 0.7)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#cbd5e1"
                  e.target.style.textShadow = "none"
                }}
              >
                <FontAwesomeIcon icon={faHome} className="me-1" />
                Inicio
              </Link>
            </li>

            {/* Selector de mascotas futurista */}
            <li className="nav-item d-flex align-items-center ms-3">
              <div className="position-relative">
                <FontAwesomeIcon 
                  icon={faPaw} 
                  className="position-absolute ms-2"
                  style={{ 
                    top: "50%", 
                    transform: "translateY(-50%)", 
                    left: "10px", 
                    color: "#78dbe2",
                    zIndex: 1
                  }} 
                />
                <select
                  className="form-select fw-semibold border-0 fs-6 ps-4"
                  onChange={handleSelectChange}
                  value={selectValue}
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#cbd5e1",
                    borderRadius: "25px",
                    border: "1px solid rgba(120, 219, 226, 0.3)",
                    paddingLeft: "35px",
                    minWidth: "140px",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(51, 65, 85, 0.9)"
                    e.target.style.boxShadow = "0 0 15px rgba(120, 219, 226, 0.3)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(30, 41, 59, 0.8)"
                    e.target.style.boxShadow = "none"
                  }}
                >
                  <option value="" style={{ background: "#1e293b" }}>Mascotas</option>
                  <option value="gatos" style={{ background: "#1e293b" }}>Gatos</option>
                  <option value="perros" style={{ background: "#1e293b" }}>Perros</option>
                </select>
              </div>
            </li>

            {/* Servicios */}
            <li className="nav-item fs-6">
              <Link 
                className="nav-link position-relative"
                to="/servicios"
                style={{
                  color: "#cbd5e1",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#78dbe2"
                  e.target.style.textShadow = "0 0 10px rgba(120, 219, 226, 0.7)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#cbd5e1"
                  e.target.style.textShadow = "none"
                }}
              >
                Servicios
              </Link>
            </li>

            {/* Carrito y usuario */}
            <li className="nav-item d-flex align-items-center ms-3">
              {/* Carrito futurista */}
              <Link
                className="nav-link position-relative p-0 me-3"
                to="/carrito"
                style={{
                  color: "#cbd5e1",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#78dbe2"
                  e.target.style.transform = "scale(1.1)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#cbd5e1"
                  e.target.style.transform = "scale(1)"
                }}
              >
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {cart && cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{ 
                      fontSize: "0.7rem", 
                      padding: "0.25em 0.5em",
                      background: "linear-gradient(135deg, #ff77b8, #ff6b6b)",
                      boxShadow: "0 0 10px rgba(255, 119, 184, 0.5)"
                    }}
                  >
                    {totalProductos}
                  </span>
                )}
              </Link>

              {/* Estado de autenticación */}
              {isAuthenticated ? (
                <div className="d-flex align-items-center">
                  <span 
                    className="ms-2"
                    style={{ 
                      color: "#78dbe2",
                      textShadow: "0 0 5px rgba(120, 219, 226, 0.5)"
                    }}
                  >
                    Hola {usuario.nombre}!
                  </span>
                  <button
                    onClick={cerrarSesion}
                    className="btn btn-link ms-2 p-0"
                    style={{ 
                      textDecoration: "none",
                      color: "#94a3b8",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#ff77b8"
                      e.target.style.textShadow = "0 0 10px rgba(255, 119, 184, 0.5)"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#94a3b8"
                      e.target.style.textShadow = "none"
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link 
                  className="nav-link ms-2"
                  to="/iniciar-sesion"
                  style={{
                    color: "#cbd5e1",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#78dbe2"
                    e.target.style.textShadow = "0 0 10px rgba(120, 219, 226, 0.7)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#cbd5e1"
                    e.target.style.textShadow = "none"
                  }}
                >
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
