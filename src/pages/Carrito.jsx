// src/components/Carrito.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from '../hooks/useAppContext';

function Carrito() {
  const { cart, clearCart, removeFromCart } = useAppContext();
  const navigate = useNavigate();

  // Calcular total
  const total = cart
    .reduce((acc, item) => acc + (item.precio || 0) * (item.quantity || 1), 0)
    .toFixed(2);

  const irAPagar = () => {
    navigate("/pagar", { state: { cart } });
  };

  return (
    <>
      <h2
        className="text-center mb-4 fw-bold rounded p-2"
        style={{ backgroundColor: "#1E88E5", color: "#fff" }}
      >
        Carrito
      </h2>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {cart.length === 0 ? (
              <p className="text-center text-muted font-italic">
                <strong>El carrito está vacío</strong>
                <Link to="/" className="text-decoration-none">
                  <button
                    className="btn fw-bold rounded fs-6 mt-3 d-block mx-auto"
                    style={{ width: "200px", backgroundColor: "#FF9800", color: "#fff" }}
                  >
                    Ver mascotas en adopción
                  </button>
                </Link>
              </p>
            ) : (
              <div className="cart-items d-flex flex-column gap-3">
                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="d-flex align-items-center justify-content-between p-3 rounded border"
                    style={{ backgroundColor: "#f0f4f8" }}
                  >
                    <img
                      src={item.imagen || 'https://via.placeholder.com/150'}
                      alt={item.nombre}
                      width="60"
                      height="80"
                      className="rounded me-3 border"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="flex-grow-1">
                      <strong>{item.nombre || 'Sin nombre'}</strong>
                      <span className="mx-2">x {item.quantity || 1}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span>$ {((item.precio || 0) * (item.quantity || 1)).toFixed(2)}</span>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger cursor-pointer"
                        onClick={() => removeFromCart(index)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                ))}

                <div className="total-section mt-4 d-flex flex-column align-items-center gap-2">
                  <p
                    className="text-center fw-bold rounded p-2"
                    style={{ backgroundColor: "#4CAF50", color: "#fff", fontSize: "1.2rem", width: "100%" }}
                  >
                    Total: $ {total}
                  </p>

                  <button
                    onClick={clearCart}
                    className="btn fw-bold rounded fs-6"
                    style={{ width: "200px", backgroundColor: "#E53935", color: "#fff" }}
                  >
                    Vaciar Carrito
                  </button>

                  <button
                    onClick={irAPagar}
                    className="btn fw-bold rounded fs-6"
                    style={{ width: "200px", backgroundColor: "#43A047", color: "#fff" }}
                  >
                    Pagar
                  </button>

                  <Link to="/" className="text-decoration-none">
                    <button
                      className="btn fw-bold rounded fs-6"
                      style={{ width: "200px", backgroundColor: "#FF9800", color: "#fff" }}
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
  );
}

export default Carrito;