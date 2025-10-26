import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Pagar() {
  const { usuario, cerrarSesion, cart, clearCart } = useAppContext();
  const navigate = useNavigate();

  // Calcular el total
  const total = cart
    .reduce((acc, item) => acc + item.precio * item.quantity, 0)
    .toFixed(2);

  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    clearCart();
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column align-items-center py-5"
      style={{ backgroundColor: "#E3F2FD", minHeight: "100vh" }}
    >
      {/* Información del usuario */}
      <div
        className="text-center mb-4 p-3 rounded"
        style={{ backgroundColor: "#BBDEFB", width: "100%", maxWidth: "500px" }}
      >
        <h2 style={{ color: "#1E88E5" }}>
          <strong>Usuario:</strong> {usuario.nombre || "Invitado"}
        </h2>
        <p><strong>Email:</strong> {usuario.email || "No registrado"}</p>
        <button
          onClick={cerrarSesion}
          className="btn btn-secondary fw-bold rounded"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Ticket de compra */}
      <div
        className="rounded p-3 mb-4"
        style={{
          backgroundColor: "#ffffffcc",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
        }}
      >
        <h2 className="text-center border-bottom pb-3" style={{ color: "#43A047" }}>
          Ticket de Compra
        </h2>

        {cart.length === 0 ? (
          <p className="text-center mt-3">No hay productos en el carrito.</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center mt-2 py-2 border-bottom"
            >
              <img
                src={item.imagen}
                alt={item.nombre}
                width="60"
                height="70"
                className="rounded me-3 border"
                style={{ objectFit: "cover" }}
              />
              <span className="flex-grow-1">{item.nombre}</span>
              <span>$ {(item.precio * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}

        <h3
          className="text-center mt-3 fw-bold"
          style={{ color: "#E53935" }}
        >
          Total a pagar: ${total}
        </h3>
      </div>

      {/* Botones de acción */}
      <div className="d-flex flex-column align-items-center gap-3">
        <button
          onClick={comprar}
          className="btn fw-bold rounded"
          style={{ width: "220px", backgroundColor: "#43A047", color: "#fff" }}
        >
          Confirmar y Pagar
        </button>

        <button
          onClick={() => navigate("/carrito")}
          className="btn fw-bold rounded"
          style={{ width: "220px", backgroundColor: "#FF9800", color: "#fff" }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Pagar;

