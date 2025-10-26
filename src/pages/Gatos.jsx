import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Gatos = () => {
  const [gatos, setGatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useAppContext();

  useEffect(() => {
    console.log("COMPONENTE Gatos MONTADO");

    const timeout = setTimeout(() => {
      console.log("TIMEOUT EJECUTADO");

      fetch("https://68d6f23ec2a1754b426c4d01.mockapi.io/gatos")
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          console.log("FETCH EJECUTADO");
          setGatos(datos);
          setCargando(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("Hubo un problema al cargar los datos de los gatos.");
          setCargando(false);
        });
    }, 2000);

    return () => {
      clearTimeout(timeout);
      console.log("COMPONENTE Gatos DESMONTADO");
    };
  }, []);

  if (cargando)
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-secondary fs-5">Cargando imágenes de gatos...</p>
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
      <h4 className="text-center mb-4 p-3 rounded fw-bold"
          style={{ backgroundColor: "#FFEBEE", color: "#C62828" }}>
        LAS MASCOTAS ESTÁN EN ADOPCIÓN RESPONSABLE, EL COSTO ES SIMBÓLICO PARA LA REALIZACIÓN DE ESTE PROYECTO
      </h4>

      <ul className="d-flex flex-wrap justify-content-center gap-4 list-unstyled p-0">
        {gatos.map((gato) => (
          <li key={gato.id} className="card shadow-lg rounded-4 p-2 bg-light border-0" style={{ width: "250px" }}>
            <img
              src={gato.imagen}
              alt={gato.nombre}
              className="card-img-top rounded-4"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">{gato.nombre}</h5>
              <p className="card-text fs-6">{gato.descripcion}</p>
              <p className="fw-bold fs-5">$ {gato.precio}</p>
              <button
                className="btn btn-success mb-2 rounded fs-6 w-100"
                onClick={() => addToCart(gato)}
              >
                Adoptar
              </button>
              <Link to={`/gatos/${gato.id}/${gato.nombre}`} state={{ gato }}>
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

export default Gatos;

