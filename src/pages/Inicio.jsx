function Inicio() {
  return (
    <div
      className="d-flex flex-column align-items-center text-center"
      style={{
        padding: "40px 20px",
        background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",
        minHeight: "100vh",
      }}
    >
      {/* Título principal */}
      <h1 className="mt-5 mb-4" style={{ fontWeight: "700", color: "#1E88E5" }}>
        Mascotas Transfor: <span style={{ color: "#43A047" }}>adopción responsable</span> de animales
      </h1>

      {/* Video de presentación */}
      <div className="mb-4" style={{ width: "100%", maxWidth: "700px" }}>
        <video
          src="videos/Video_Gatos.mp4"
          controls
          autoPlay
          loop
          muted
          style={{ width: "100%", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
        >
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>

      {/* Texto descriptivo */}
      <div
        className="px-3"
        style={{
          maxWidth: "750px",
          fontSize: "1.15rem",
          lineHeight: "1.8",
          color: "#333",
          backgroundColor: "#ffffffcc",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <p>
          Adoptar un gato es darle un hogar lleno de amor y cuidado. Antes de traer un compañero peludo a tu vida,
          asegúrate de poder brindarle atención, cariño y un ambiente seguro.
        </p>
        <p>
          La adopción responsable salva vidas y ayuda a construir un mundo más compasivo para nuestros amigos felinos.
          Brindarles amor contribuye a su bienestar y felicidad.
        </p>
      </div>
    </div>
  );
}

export default Inicio;
