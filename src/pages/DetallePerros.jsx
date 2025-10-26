import { Link, useParams, useLocation } from "react-router-dom";

const DetallePerros = () => {
  const { id, nombre } = useParams();
  const location = useLocation();
  const perro = location.state?.perro;

  if (!perro) {
    return (
      <div className="d-flex flex-column align-items-center mt-5 gap-3">
        <p className="fs-5 fw-bold text-center text-danger">
          No se pudo cargar la mascota
        </p>
        <Link to="/perros">
          <button className="btn btn-primary fw-bold rounded px-4 fs-6">
            Mostrar otras mascotas
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center fs-4 fw-bold mb-4" style={{ color: "#1E88E5" }}>
        Detalles de la mascota: {nombre} (ID: {id})
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg rounded-4">
            <img
              src={perro.imagen}
              alt={perro.nombre}
              className="card-img-top img-fluid rounded-top-4"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <div className="card-body text-center bg-light rounded-bottom-4">
              <h3 className="fw-bold fs-4 mb-2">{perro.nombre}</h3>
              <p className="fs-6 mb-3">{perro.descripcion}</p>
              <p className="fw-bold fs-5 text-success">$ {perro.precio}</p>
              <Link to="/perros">
                <button className="btn btn-success fw-bold rounded px-4 mt-3">
                  Ver otras mascotas
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePerros;
