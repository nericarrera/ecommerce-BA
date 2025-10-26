import { Link, useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
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
      className="navbar navbar-expand-lg fw-bold fixed-top shadow-sm"
      style={{
        background: "linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)", 
      }}
    >
      <div className="container-fluid">
        {/* Marca */}
        <Link
          className="navbar-brand fw-bold fs-4 nav-link-azul"
          to="/"
          style={{ color: "#1565c0" }} 
        >
          e-commerce Transfor
        </Link>

        <button
          className="navbar-toggler text-primary rounded"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto fs-6 align-items-center">
            {/* Inicio */}
            <li className="nav-item">
              <Link className="nav-link nav-link-azul" to="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center ms-3">
              <select
                className="form-select fw-semibold border-0 fs-6 bg-transparent nav-link-azul"
                onChange={handleSelectChange}
                value={selectValue}
                style={{
                  color: "#1565c0",
                }}
              >
                <option value="">Mascotas</option>
                <option value="gatos">Gatos</option>
                <option value="perros">Perros</option>
              </select>
            </li>
            <li className="nav-item fs-6">
              <Link className="nav-link nav-link-azul" to="/servicios">
                Servicios
              </Link>
            </li>

            {/* Carrito */}
            <li className="nav-item d-flex align-items-center">
              <Link
                className="nav-link position-relative p-0 nav-link-azul"
                to="/carrito"
              >
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {cart && cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white"
                    style={{ fontSize: "0.75rem", padding: "0.25em 0.5em" }}
                  >
                    {totalProductos}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <>
                  <span className="ms-2 nav-link-azul">
                    Hola {usuario.nombre}!
                  </span>
                  <button
                    onClick={cerrarSesion}
                    className="btn btn-link nav-link-azul ms-2 p-0"
                    style={{ textDecoration: "none" }}
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link className="nav-link nav-link-azul ms-2" to="/iniciar-sesion">
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
