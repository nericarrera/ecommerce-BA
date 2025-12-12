import { useNavigate } from "react-router-dom";
import  useAppContext  from "../context/useAppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCreditCard, 
  faUser, 
  faReceipt, 
  faShoppingCart,
  faCheckCircle,
  faLock,
  faShieldAlt,
  faArrowLeft,
  faQrcode
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Pagar() {
  const { usuario, cerrarSesion, cart, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Calcular el total
  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  const tax = subtotal * 0.21; // 21% IVA
  const total = (subtotal + tax).toFixed(2);

  const procesarPago = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    alert("¡Pago procesado con éxito! 🎉");
    clearCart();
    navigate("/");
  };

  const cancelarCompra = () => {
    navigate("/carrito");
  };

  const paymentMethods = [
    { id: "card", name: "Tarjeta de Crédito", icon: faCreditCard },
    { id: "transfer", name: "Transferencia", icon: faQrcode },
    { id: "cash", name: "Efectivo", icon: faReceipt }
  ];

  return (
    <div 
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      }}
    >
      {/* Efecto de partículas de fondo */}
      <div 
        className="position-absolute top-0 left-0 w-100 h-100"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 219, 226, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 184, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Header */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8 text-center">
            <FontAwesomeIcon 
              icon={faCreditCard} 
              className="mb-3"
              style={{
                fontSize: "3rem",
                background: "linear-gradient(135deg, #78dbe2, #ff77b8)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            />
            <h1 className="display-5 fw-bold gradient-text mb-3">
              Finalizar Compra
            </h1>
            <p className="lead" style={{ color: "#cbd5e1" }}>
              Revisa tu pedido y completa el pago de forma segura
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          {/* Columna izquierda - Información del usuario y productos */}
          <div className="col-lg-5 mb-4">
            {/* Tarjeta de usuario */}
            <div 
              className="glass-effect rounded-4 p-4 mb-4"
              style={{
                border: "1px solid rgba(120, 219, 226, 0.2)"
              }}
            >
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="me-3"
                  style={{ 
                    color: "#78dbe2",
                    fontSize: "1.5rem"
                  }}
                />
                <h4 className="fw-bold mb-0" style={{ color: "#e2e8f0" }}>
                  Información del Cliente
                </h4>
              </div>
              
              <div className="mb-3">
                <label className="form-label small mb-1" style={{ color: "#94a3b8" }}>
                  Nombre completo
                </label>
                <p className="fw-semibold mb-0" style={{ color: "#e2e8f0" }}>
                  {usuario.nombre || "Invitado"}
                </p>
              </div>
              
              <div className="mb-4">
                <label className="form-label small mb-1" style={{ color: "#94a3b8" }}>
                  Correo electrónico
                </label>
                <p className="fw-semibold mb-0" style={{ color: "#e2e8f0" }}>
                  {usuario.email || "No registrado"}
                </p>
              </div>

              <button
                onClick={cerrarSesion}
                className="btn w-100 py-2 rounded-pill"
                style={{
                  background: "transparent",
                  color: "#ff6b6b",
                  border: "1px solid rgba(255, 107, 107, 0.5)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 107, 107, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                Cerrar Sesión
              </button>
            </div>

            {/* Resumen del pedido */}
            <div 
              className="glass-effect rounded-4 p-4"
              style={{
                border: "1px solid rgba(120, 219, 226, 0.2)"
              }}
            >
              <div className="d-flex align-items-center mb-4">
                <FontAwesomeIcon 
                  icon={faShoppingCart} 
                  className="me-3"
                  style={{ 
                    color: "#78dbe2",
                    fontSize: "1.5rem"
                  }}
                />
                <h4 className="fw-bold mb-0" style={{ color: "#e2e8f0" }}>
                  Resumen del Pedido
                </h4>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-4">
                  <p style={{ color: "#94a3b8" }}>No hay productos en el carrito.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center p-3 rounded-3"
                      style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        border: "1px solid rgba(148, 163, 184, 0.1)"
                      }}
                    >
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        width="60"
                        height="60"
                        className="rounded-3 me-3 flex-shrink-0"
                        style={{ 
                          objectFit: "cover",
                          border: "2px solid rgba(120, 219, 226, 0.3)"
                        }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="fw-semibold mb-1" style={{ color: "#e2e8f0" }}>
                          {item.nombre}
                        </h6>
                        <p className="mb-0 small" style={{ color: "#94a3b8" }}>
                          {item.quantity} x ${item.precio.toFixed(2)}
                        </p>
                      </div>
                      <span className="fw-bold" style={{ color: "#78dbe2" }}>
                        ${(item.precio * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha - Método de pago y total */}
          <div className="col-lg-4">
            <div 
              className="glass-effect rounded-4 p-4 h-100"
              style={{
                border: "1px solid rgba(120, 219, 226, 0.2)"
              }}
            >
              <div className="d-flex align-items-center mb-4">
                <FontAwesomeIcon 
                  icon={faShieldAlt} 
                  className="me-3"
                  style={{ 
                    color: "#78dbe2",
                    fontSize: "1.5rem"
                  }}
                />
                <h4 className="fw-bold mb-0" style={{ color: "#e2e8f0" }}>
                  Método de Pago
                </h4>
              </div>

              {/* Selección de método de pago */}
              <div className="mb-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-3 mb-2 rounded-3 cursor-pointer ${
                      paymentMethod === method.id ? 'border-primary' : ''
                    }`}
                    style={{
                      background: paymentMethod === method.id 
                        ? "rgba(120, 219, 226, 0.1)" 
                        : "rgba(30, 41, 59, 0.5)",
                      border: `1px solid ${
                        paymentMethod === method.id 
                          ? "rgba(120, 219, 226, 0.5)" 
                          : "rgba(148, 163, 184, 0.1)"
                      }`,
                      transition: "all 0.3s ease",
                      cursor: "pointer"
                    }}
                    onClick={() => setPaymentMethod(method.id)}
                    onMouseEnter={(e) => {
                      if (paymentMethod !== method.id) {
                        e.currentTarget.style.background = "rgba(120, 219, 226, 0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (paymentMethod !== method.id) {
                        e.currentTarget.style.background = "rgba(30, 41, 59, 0.5)";
                      }
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon 
                        icon={method.icon} 
                        className="me-3"
                        style={{ 
                          color: paymentMethod === method.id ? "#78dbe2" : "#94a3b8"
                        }}
                      />
                      <span style={{ 
                        color: paymentMethod === method.id ? "#e2e8f0" : "#cbd5e1",
                        fontWeight: paymentMethod === method.id ? "600" : "400"
                      }}>
                        {method.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desglose del total */}
              <div className="border-top border-bottom py-3 mb-4" style={{ borderColor: "rgba(148, 163, 184, 0.2) !important" }}>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: "#cbd5e1" }}>Subtotal:</span>
                  <span style={{ color: "#e2e8f0" }}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: "#cbd5e1" }}>IVA (21%):</span>
                  <span style={{ color: "#e2e8f0" }}>${tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold pt-2 border-top" style={{ borderColor: "rgba(148, 163, 184, 0.2) !important" }}>
                  <span style={{ color: "#e2e8f0" }}>Total:</span>
                  <span style={{ color: "#78dbe2", fontSize: "1.2rem" }}>${total}</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button
                  onClick={procesarPago}
                  disabled={isProcessing || cart.length === 0}
                  className="btn w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center"
                  style={{
                    background: isProcessing 
                      ? "rgba(120, 219, 226, 0.5)" 
                      : "linear-gradient(135deg, #78dbe2, #667eea)",
                    color: "#0f172a",
                    border: "none",
                    transition: "all 0.3s ease",
                    opacity: cart.length === 0 ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isProcessing && cart.length > 0) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 10px 25px rgba(120, 219, 226, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isProcessing && cart.length > 0) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" style={{ width: "1rem", height: "1rem" }} />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faLock} className="me-2" />
                      Confirmar y Pagar
                      <FontAwesomeIcon icon={faCheckCircle} className="ms-2" />
                    </>
                  )}
                </button>

                <button
                  onClick={cancelarCompra}
                  className="btn w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center"
                  style={{
                    background: "transparent",
                    color: "#94a3b8",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(148, 163, 184, 0.1)";
                    e.target.style.color = "#e2e8f0";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#94a3b8";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Volver al Carrito
                </button>
              </div>

              {/* Seguridad */}
              <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: "rgba(148, 163, 184, 0.2) !important" }}>
                <p className="small mb-2" style={{ color: "#94a3b8" }}>
                  <FontAwesomeIcon icon={faShieldAlt} className="me-1" />
                  Pago 100% seguro y encriptado
                </p>
                <p className="small mb-0" style={{ color: "#64748b" }}>
                  Tus datos están protegidos con encriptación SSL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagar;

