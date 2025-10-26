import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faHome, 
  faHeart, 
  faStethoscope, 
  faGraduationCap, 
  faHandsHelping, 
  faUsers,
  faShieldAlt,
  faPaw,
  faStar
} from "@fortawesome/free-solid-svg-icons"

function Servicios() {
  const servicios = [
    {
      icon: faHeart,
      title: "Orientación para la adopción",
      description: "Te ayudamos a elegir la mascota que mejor se adapte a tu estilo de vida, tu hogar y tu familia, asegurando que la experiencia de adopción sea positiva para todos.",
      features: ["Evaluación de compatibilidad", "Asesoramiento personalizado", "Visitas guiadas"]
    },
    {
      icon: faStethoscope,
      title: "Salud y bienestar",
      description: "Contamos con revisiones básicas de salud, vacunación y desparasitación, para que tu nueva mascota llegue a casa sana y feliz.",
      features: ["Chequeos veterinarios", "Vacunación completa", "Desparasitación integral"]
    },
    {
      icon: faGraduationCap,
      title: "Educación y entrenamiento",
      description: "Ofrecemos talleres y consejos para que puedas enseñarle hábitos básicos, socialización y obediencia, fomentando una convivencia armoniosa.",
      features: ["Talleres de socialización", "Entrenamiento básico", "Asesoramiento conductual"]
    },
    {
      icon: faHandsHelping,
      title: "Apoyo post-adopción",
      description: "Nuestro compromiso no termina al momento de la adopción. Te acompañamos con seguimiento y orientación continua.",
      features: ["Seguimiento personalizado", "Soporte 24/7", "Comunidad de adoptantes"]
    },
    {
      icon: faUsers,
      title: "Eventos y actividades",
      description: "Organizamos encuentros, charlas y actividades especiales para que los adoptantes y sus mascotas puedan socializar y aprender juntos.",
      features: ["Encuentros mensuales", "Charlas educativas", "Actividades recreativas"]
    },
    {
      icon: faShieldAlt,
      title: "Garantía de bienestar",
      description: "Programa de protección continua que asegura el cuidado y seguimiento de cada mascota durante toda su vida.",
      features: ["Garantía de salud", "Red de apoyo", "Recursos continuos"]
    }
  ]

  return (
    <div className="container-fluid px-4 py-5">
      {/* Hero Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-10 text-center">
          <div className="mb-4">
            <FontAwesomeIcon 
              icon={faPaw} 
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
              Nuestros Servicios
            </h1>
            <div 
              className="mx-auto mb-4"
              style={{
                height: "4px",
                width: "80px",
                background: "linear-gradient(90deg, #78dbe2, #ff77b8)",
                borderRadius: "2px"
              }}
            ></div>
            <p className="lead fs-4" style={{ color: "#cbd5e1", lineHeight: "1.6" }}>
              Cuidado integral para mascotas y sus familias
            </p>
          </div>
        </div>
      </div>

      {/* Servicios Grid */}
      <div className="row g-4 justify-content-center">
        {servicios.map((servicio, index) => (
          <div key={index} className="col-lg-6 col-xl-4">
            <div 
              className="h-100 glass-effect p-4 rounded-3 shadow-lg"
              style={{
                border: "1px solid rgba(120, 219, 226, 0.2)",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)"
                e.currentTarget.style.borderColor = "rgba(120, 219, 226, 0.4)"
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.borderColor = "rgba(120, 219, 226, 0.2)"
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)"
              }}
            >
              {/* Icono del servicio */}
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center p-3"
                  style={{
                    background: "linear-gradient(135deg, rgba(120, 219, 226, 0.1), rgba(255, 119, 184, 0.1))",
                    border: "2px solid rgba(120, 219, 226, 0.3)"
                  }}
                >
                  <FontAwesomeIcon 
                    icon={servicio.icon} 
                    style={{
                      fontSize: "1.8rem",
                      background: "linear-gradient(135deg, #78dbe2, #ff77b8)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  />
                </div>
              </div>

              {/* Contenido del servicio */}
              <h4 
                className="text-center fw-bold mb-3"
                style={{ 
                  color: "#e2e8f0",
                  fontSize: "1.3rem"
                }}
              >
                {servicio.title}
              </h4>
              
              <p 
                className="text-center mb-4"
                style={{ 
                  color: "#cbd5e1",
                  lineHeight: "1.6"
                }}
              >
                {servicio.description}
              </p>

              {/* Features del servicio */}
              <ul className="list-unstyled">
                {servicio.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="d-flex align-items-center mb-2">
                    <FontAwesomeIcon 
                      icon={faStar} 
                      className="me-2"
                      style={{ 
                        fontSize: "0.7rem",
                        color: "#78dbe2"
                      }}
                    />
                    <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="row justify-content-center mt-6">
        <div className="col-lg-8 text-center">
          <div 
            className="glass-effect p-5 rounded-4"
            style={{
              border: "1px solid rgba(120, 219, 226, 0.3)",
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))"
            }}
          >
            <h3 className="fw-bold mb-3" style={{ color: "#e2e8f0" }}>
              ¿Listo para comenzar?
            </h3>
            <p className="mb-4 fs-5" style={{ color: "#cbd5e1" }}>
              En <strong className="gradient-text">Adopciones Transfor</strong> creemos que cada mascota merece un hogar lleno de amor y cuidado, y que cada adoptante merece sentirse acompañado en todo el proceso.
            </p>
            
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link to="/contacto" className="text-decoration-none">
                <button 
                  className="btn fw-bold px-4 py-3 rounded-pill"
                  style={{
                    background: "linear-gradient(135deg, #78dbe2, #667eea)",
                    color: "#0f172a",
                    border: "none",
                    transition: "all 0.3s ease",
                    minWidth: "160px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)"
                    e.target.style.boxShadow = "0 10px 25px rgba(120, 219, 226, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)"
                    e.target.style.boxShadow = "none"
                  }}
                >
                  Contáctanos
                </button>
              </Link>
              
              <Link to="/" className="text-decoration-none">
                <button 
                  className="btn fw-bold px-4 py-3 rounded-pill"
                  style={{
                    background: "transparent",
                    color: "#78dbe2",
                    border: "2px solid rgba(120, 219, 226, 0.5)",
                    transition: "all 0.3s ease",
                    minWidth: "160px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(120, 219, 226, 0.1)"
                    e.target.style.transform = "scale(1.05)"
                    e.target.style.boxShadow = "0 10px 25px rgba(120, 219, 226, 0.2)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent"
                    e.target.style.transform = "scale(1)"
                    e.target.style.boxShadow = "none"
                  }}
                >
                  <FontAwesomeIcon icon={faHome} className="me-2" />
                  Volver al Inicio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Servicios
