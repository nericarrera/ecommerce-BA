import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeart, 
  faPaw, 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt,
  faShieldHeart,
  faStar
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: faPhone,
      text: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: faEnvelope,
      text: "hola@adopcionestransfor.com",
      link: "mailto:BA@adopcionesBA.com"
    },
    {
      icon: faMapMarkerAlt,
      text: "Buenos Aires, Argentina",
      link: "#"
    }
  ];

  const quickLinks = [
    { name: "Inicio", path: "/" },
    { name: "Gatos", path: "/gatos" },
    { name: "Perros", path: "/perros" },
    { name: "Servicios", path: "/servicios" },
    { name: "Contacto", path: "/contacto" }
  ];

  return (
    <footer
      className="position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        borderTop: "1px solid rgba(120, 219, 226, 0.3)",
        boxShadow: "0 -4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Efecto de partículas futuristas */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 219, 226, 0.6) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255, 119, 184, 0.4) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(102, 126, 234, 0.3) 0%, transparent 50%)`,
        }}
      />
      
      {/* Línea de brillo superior */}
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(120, 219, 226, 0.8), transparent)",
          boxShadow: "0 0 20px 2px rgba(120, 219, 226, 0.3)"
        }}
      />

      <div className="container-fluid py-5 position-relative z-10">
        <div className="row g-4">
          {/* Información de la empresa */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <FontAwesomeIcon 
                icon={faShieldHeart}
                className="me-2"
                style={{
                  fontSize: "1.8rem",
                  background: "linear-gradient(135deg, #78dbe2, #ff77b8)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              />
              <h5 
                className="fw-bold mb-0"
                style={{
                  background: "linear-gradient(90deg, #78dbe2, #ff77b8)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Adopciones Transfor
              </h5>
            </div>
            <p className="mb-4" style={{ color: "#cbd5e1", lineHeight: "1.6" }}>
              Transformando vidas a través de la adopción responsable. 
              Creemos en un mundo donde cada mascota encuentre un hogar 
              lleno de amor y cuidado.
            </p>
            
            {/* Estado del sistema */}
            <div className="d-flex align-items-center">
              <div 
                className="w-3 h-3 rounded-circle me-2 animate-pulse"
                style={{
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)"
                }}
              ></div>
              <span className="small" style={{ color: "#cbd5e1" }}>
                Sistema Online - {currentYear}
              </span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: "#e2e8f0" }}>
              Enlaces Rápidos
            </h6>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <a 
                    href={link.path}
                    className="text-decoration-none small"
                    style={{ 
                      color: "#94a3b8",
                      transition: "all 0.3s ease",
                      display: "block",
                      padding: "2px 0"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#78dbe2";
                      e.target.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#94a3b8";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de contacto */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: "#e2e8f0" }}>
              Contacto
            </h6>
            <div className="space-y-2">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  className="d-flex align-items-center text-decoration-none mb-3"
                  style={{ 
                    color: "#94a3b8",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#78dbe2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#94a3b8";
                  }}
                >
                  <FontAwesomeIcon 
                    icon={contact.icon} 
                    className="me-3"
                    style={{ 
                      width: "16px",
                      color: "#78dbe2"
                    }}
                  />
                  <span className="small">{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Redes sociales y certificaciones */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: "#e2e8f0" }}>
              Certificaciones
            </h6>
            <div className="d-flex flex-wrap gap-2 mb-4">
              <span 
                className="badge px-3 py-2 rounded-pill small"
                style={{
                  background: "rgba(120, 219, 226, 0.1)",
                  color: "#78dbe2",
                  border: "1px solid rgba(120, 219, 226, 0.3)"
                }}
              >
                <FontAwesomeIcon icon={faStar} className="me-1" />
                ISO 9001
              </span>
              <span 
                className="badge px-3 py-2 rounded-pill small"
                style={{
                  background: "rgba(255, 119, 184, 0.1)",
                  color: "#ff77b8",
                  border: "1px solid rgba(255, 119, 184, 0.3)"
                }}
              >
                <FontAwesomeIcon icon={faHeart} className="me-1" />
                Bienestar Animal
              </span>
            </div>

            {/* Elementos decorativos futuristas */}
            <div className="d-flex justify-content-start align-items-center">
              <div className="d-flex me-4">
                <div 
                  className="w-2 h-2 rounded-circle me-2 animate-pulse"
                  style={{ 
                    backgroundColor: "#78dbe2",
                    boxShadow: "0 0 8px rgba(120, 219, 226, 0.6)"
                  }}
                ></div>
                <div 
                  className="w-2 h-2 rounded-circle me-2 animate-pulse"
                  style={{ 
                    backgroundColor: "#ff77b8",
                    boxShadow: "0 0 8px rgba(255, 119, 184, 0.6)",
                    animationDelay: '0.3s'
                  }}
                ></div>
                <div 
                  className="w-2 h-2 rounded-circle animate-pulse"
                  style={{ 
                    backgroundColor: "#667eea",
                    boxShadow: "0 0 8px rgba(102, 126, 234, 0.6)",
                    animationDelay: '0.6s'
                  }}
                ></div>
              </div>
              
              <FontAwesomeIcon 
                icon={faPaw}
                style={{
                  color: "rgba(120, 219, 226, 0.5)",
                  fontSize: "1.2rem"
                }}
              />
            </div>
          </div>
        </div>

        {/* Línea separadora */}
        <div 
          className="row mt-4 pt-4"
          style={{
            borderTop: "1px solid rgba(148, 163, 184, 0.2)"
          }}
        >
          <div className="col-md-6 text-md-start text-center mb-2 mb-md-0">
            <p className="mb-0 small" style={{ color: "#94a3b8" }}>
              &copy; {currentYear} Adopciones Transfor. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end text-center">
            <p className="mb-0 small" style={{ color: "#94a3b8" }}>
              Desarrollado con <FontAwesomeIcon icon={faHeart} style={{ color: "#ff77b8" }} /> para mascotas felices
            </p>
          </div>
        </div>
      </div>

      {/* Efecto de brillo inferior */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 119, 184, 0.4), transparent)",
          boxShadow: "0 0 15px 1px rgba(255, 119, 184, 0.2)"
        }}
      />
    </footer>
  );
}

export default Footer;
