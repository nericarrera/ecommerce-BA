import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import {useNavigate} from "react-router-dom"
import { useAppContext } from "../context/AppContext"

function Carrito() {

  const { cart, clearCart, removeFromCart, isAuthenticated } = useAppContext()

  const navigate = useNavigate()

  // Calcular total
  const total = cart
    .reduce((acc, item) => acc + item.precio * item.quantity, 0)
    .toFixed(2)

  const irAPagar = () => {
    navigate("/pagar", { state: { cart } });
  };

  return (
    <>
      <h2 className="text-center mb-4 fw-bold bg-primary-subtle rounded p-2">Carrito</h2>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {cart.length === 0 ? (
              <p className="text-center text-muted font-italic">
                <strong>El carrito está vacío</strong>
                <Link to="/" className="text-decoration-none">
                  <button
                    className="btn btn-secondary mt-3 text-center d-block mx-auto fw-bold rounded fs-6"
                  >
                    Ver mascotas en adopción
                  </button>
                </Link>
              </p>
            ) : (
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex fs-6 border-secondary-subtle rounded px-3 justify-content-between align-items-center py-3 border-bottom"
                  >
                    <img src={item.imagen} alt={item.nombre} width="50" height="70" className="rounded me-3 border"
                style={{ objectFit: "cover" }}/>
                    <div className="product-info">
                      <strong>{item.nombre}</strong>
                      <span className="mx-2">x {item.quantity}</span>
                    </div>
                    <div className="price-section">
                      <span className="me-4">$ {(item.precio * item.quantity).toFixed(2)}</span>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger cursor-pointer"
                        onClick={() => removeFromCart(index)}
                      />
                    </div>
                  </div>
                ))}
                <div className="total-section mt-4">
                  <p className="text-end text-center bg-success-subtle rounded fw-bold mx-auto p-2 fs-5">
                    Total: $ {total}
                  </p>
                  <button
                    onClick={clearCart}
                    className="btn btn-danger fw-bold rounded fs-6 mx-auto d-block"
                    style={{ width: '200px' }}
                  >
                    Vaciar Carrito
                  </button>
                  <button onClick={irAPagar}
                  className="btn btn-success fw-bold mt-3 rounded fs-6 mx-auto d-block"
                    style={{ width: '200px' }}
                    >
                      Pagar</button>
                  <Link to="/" className="text-decoration-none">
                    <button
                      className="btn btn-secondary mt-3 text-center d-block mx-auto fw-bold rounded fs-6"
                      style={{ width: '200px' }}
                    >
                      Ver más mascotas
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Carrito