import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from '../hooks/useAppContext';

function Carrito() {
  const { carrito, limpiarCarrito, eliminarDelCarrito } = useAppContext();
  const navigate = useNavigate();

  
  const total = carrito && Array.isArray(carrito)
    ? carrito.reduce((acc, item) => {
        const precio = item?.precio || 0;
        const cantidad = item?.cantidad || 1;
        return acc + (precio * cantidad);
      }, 0).toFixed(2)
    : "0.00";

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  return (
    <div className="container mt-4 mb-5">
      <h2
        className="text-center mb-4 fw-bold rounded p-3 shadow"
        style={{ 
          backgroundColor: "#1E88E5", 
          color: "#fff",
          background: "linear-gradient(135deg, #1E88E5, #0D47A1)"
        }}
      >
        🛒 Carrito de Adopción
      </h2>
      
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          {(!carrito || carrito.length === 0) ? (
            <div className="text-center py-5 border rounded bg-light shadow-sm">
              <div className="mb-4">
                <div className="display-1 text-muted mb-3">🛍️</div>
                <h4 className="text-muted mb-3">Tu carrito está vacío</h4>
                <p className="text-muted mb-4">
                  No hay mascotas esperando por un hogar.
                </p>
              </div>
              <Link to="/mascotas" className="text-decoration-none">
                <button
                  className="btn fw-bold rounded-pill px-4 py-2 shadow"
                  style={{ 
                    backgroundColor: "#FF9800", 
                    color: "#fff",
                    background: "linear-gradient(135deg, #FF9800, #F57C00)",
                    border: "none"
                  }}
                >
                  Ver mascotas en adopción
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* Lista de items en el carrito */}
              <div className="cart-items mb-4">
                {carrito.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="d-flex align-items-center p-3 rounded shadow-sm mb-3"
                    style={{ 
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                    }}
                  >
                    {/* Imagen */}
                    <div className="flex-shrink-0 me-3">
                      <img
                        src={item.imagen || 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=150&h=150&fit=crop'}
                        alt={item.nombre}
                        width="80"
                        height="80"
                        className="rounded"
                        style={{ 
                          objectFit: "cover",
                          border: "3px solid #f0f4f8"
                        }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=150&h=150&fit=crop';
                        }}
                      />
                    </div>
                    
                    {/* Información */}
                    <div className="flex-grow-1">
                      <h5 className="mb-1 fw-bold" style={{ color: "#333" }}>
                        {item.nombre || 'Sin nombre'}
                      </h5>
                      <div className="d-flex flex-wrap gap-3">
                        <span className="text-muted">
                          <strong>Categoría:</strong> {item.categoria || 'Mascota'}
                        </span>
                        <span className="text-muted">
                          <strong>Edad:</strong> {item.edad || 'No especificada'}
                        </span>
                        {item.raza && (
                          <span className="text-muted">
                            <strong>Raza:</strong> {item.raza}
                          </span>
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="badge bg-primary me-2">
                          $ {item.precio?.toFixed(2) || '0.00'} c/u
                        </span>
                        <span className="badge bg-secondary">
                          Cantidad: {item.cantidad || 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Subtotal y botón eliminar */}
                    <div className="d-flex flex-column align-items-end">
                      <h5 className="text-success fw-bold mb-2">
                        $ {((item.precio || 0) * (item.cantidad || 1)).toFixed(2)}
                      </h5>
                      <button
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="btn btn-outline-danger btn-sm d-flex align-items-center"
                        aria-label={`Eliminar ${item.nombre} del carrito`}
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-1" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen y acciones */}
              <div className="total-section p-4 rounded shadow-sm mb-4"
                   style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }}>
                
                {/* Resumen de compra */}
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                  <div>
                    <h4 className="fw-bold mb-1" style={{ color: "#333" }}>
                      Resumen de adopción
                    </h4>
                    <p className="text-muted mb-0">
                      {carrito.length} {carrito.length === 1 ? 'mascota' : 'mascotas'} en el carrito
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-muted mb-1">Total a pagar</p>
                    <h2 className="fw-bold" style={{ color: "#43A047" }}>
                      $ {total}
                    </h2>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button
                    onClick={limpiarCarrito}
                    className="btn fw-bold rounded-pill px-4 py-2 shadow"
                    style={{ 
                      backgroundColor: "#E53935", 
                      color: "#fff",
                      background: "linear-gradient(135deg, #E53935, #B71C1C)",
                      border: "none",
                      minWidth: "180px"
                    }}
                  >
                    🗑️ Vaciar Carrito
                  </button>

                  <button
                    onClick={irAPagar}
                    className="btn fw-bold rounded-pill px-4 py-2 shadow"
                    style={{ 
                      backgroundColor: "#43A047", 
                      color: "#fff",
                      background: "linear-gradient(135deg, #43A047, #1B5E20)",
                      border: "none",
                      minWidth: "180px"
                    }}
                  >
                    💳 Proceder al Pago
                  </button>

                  <Link to="/mascotas" className="text-decoration-none">
                    <button
                      className="btn fw-bold rounded-pill px-4 py-2 shadow"
                      style={{ 
                        backgroundColor: "#FF9800", 
                        color: "#fff",
                        background: "linear-gradient(135deg, #FF9800, #E65100)",
                        border: "none",
                        minWidth: "180px"
                      }}
                    >
                      🐾 Ver Más Mascotas
                    </button>
                  </Link>
                </div>

                {/* Información importante */}
                <div className="alert alert-info mt-4 mb-0" role="alert">
                  <div className="d-flex">
                    <div className="me-3">ℹ️</div>
                    <div>
                      <strong>Importante:</strong> El pago es simbólico para cubrir gastos veterinarios y cuidados. 
                      Asegúrate de estar listo para la responsabilidad de adoptar una mascota.
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carrito;