import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import datosPerros from "../assets/perros.json";
import { useAppContext } from "../context/AppContext";

const Perros = () => {
  const [perros, setPerros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useAppContext();

  useEffect(() => {
    console.log("COMPONENTE Perros MONTADO");

    const timeout = setTimeout(() => {
      try {
        setPerros(datosPerros.perros);
        setCargando(false);
        console.log("Perros cargados correctamente");
      } catch (error) {
        console.error("Error:", error);
        setError("Hubo un problema al cargar los datos de los perros.");
        setCargando(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
      console.log("COMPONENTE Perros DESMONTADO");
    };
  }, []);

  if (cargando)
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-secondary fs-5">Cargando imágenes de perros...</p>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-danger fs-5 mt-5">
        {error}
      </p>
    );

  return (
    <div className="container py-4">
      <h4
        className="text-center mb-4 p-3 rounded fw-bold"
        style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}
      >
        LAS MASCOTAS ESTÁN EN ADOPCIÓN RESPONSABLE, EL COSTO ES SIMBÓLICO PARA LA REALIZACIÓN DE ESTE PROYECTO
      </h4>

      <ul className="d-flex flex-wrap justify-content-center gap-4 list-unstyled p-0">
        {perros.map((perro) => (
          <li key={perro.id} className="card shadow-lg rounded-4 p-2 bg-light border-0" style={{ width: "250px" }}>
            <img
              src={perro.imagen}
              alt={perro.nombre}
              className="card-img-top rounded-4"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">{perro.nombre}</h5>
              <p className="card-text fs-6">{perro.descripcion}</p>
              <p className="fw-bold fs-5">$ {perro.precio}</p>
              <button
                className="btn btn-success mb-2 rounded fs-6 w-100"
                onClick={() => addToCart(perro)}
              >
                Adoptar
              </button>
              <Link to={`/perros/${perro.id}/${perro.nombre}`} state={{ perro }}>
                <button className="btn btn-primary rounded fs-6 w-100">
                  Más detalles
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Perros;

