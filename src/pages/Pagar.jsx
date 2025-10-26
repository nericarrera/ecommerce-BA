import { useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

function Pagar() {

  const { usuario, cerrarSesion, cart, clearCart } = useAppContext()

  const location = useLocation()
  const navigate = useNavigate()

  // Calcular el total
  const total = cart
    .reduce((acc, item) => acc + item.precio * item.quantity, 0)
    .toFixed(2)

  const comprar = () => {
    alert("¡Compra realizada con éxito!")
    clearCart()
    navigate("/")
  }

  return (
    <div>
      <div className="text-center fs-6 mx-auto d-block">
        <h2 className="text-center fs-6 mx-auto d-block">
          <strong>Usuario:</strong> {usuario.nombre}
        </h2>
        <p><strong>Email:</strong> {usuario.email}</p>
        <button
          onClick={cerrarSesion}
          className="btn btn-secondary text-center mb-5 rounded fs-6 mx-auto d-block"
        >
          Cerrar sesión
        </button>
        <hr />
      </div>

      {/* Ticket de compra */}
      <div
        style={{ width: "400px" }}
        className="fs-5 mx-auto d-block"
      >
        <h2 className="text-center border-bottom pb-4">Ticket de Compra</h2>

        {cart.length === 0 ? (
          <p className="text-center mt-4">No hay productos en el carrito.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="d-flex fs-6 justify-content-between mt-2 align-items-center border-bottom"
            >
              <img
                src={item.imagen}
                alt={item.nombre}
                width="50"
                height="60"
                className="rounded me-3 border"
                style={{ objectFit: "cover" }}
              />
              <span>{item.nombre}</span>
              <span>$ {item.precio}</span>
            </div>
          ))
        )}

        <h3 className="mt-3 mb-3 fs-5 text-center mx-auto d-block">
          <strong>Total a pagar:</strong> ${total}
        </h3>
      </div>

      <div>
        <button
          onClick={comprar}
          className="btn btn-success fw-bold rounded fs-6 mx-auto d-block"
          style={{ width: "200px" }}
        >
          Confirmar y Pagar
        </button>

        <button
          onClick={() => navigate("/carrito")}
          className="btn btn-secondary mt-3 fw-bold rounded fs-6 mx-auto d-block"
          style={{ width: "200px" }}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default Pagar
