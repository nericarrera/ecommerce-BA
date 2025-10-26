import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

const Gatos = () => {
    const [gatos, setGatos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const { addToCart } = useAppContext()

    useEffect(() => {

        console.log("COMPONENTE Gatos MONTADO")

        const timeout = setTimeout(() => {
            console.log("TIMEOUT EJECUTADO")

            fetch("https://68d6f23ec2a1754b426c4d01.mockapi.io/gatos")
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    console.log("FETCH EJECUTADO")
                    setGatos(datos)
                    setCargando(false)
                })
                .catch((error) => {
                    console.error("Error:", error)
                    setError("Hubo un problema al cargar la imagen");
                    setCargando(false)
                })

        }, 2000)

        return () => {
            clearTimeout(timeout)
            console.log("LIMPIEZA EJECUTADA")
            console.log("COMPONENTE Gatos DESMONTADO")
        }

    }, [])

    if (cargando)
        return (
            <div
                className="text-center mt-6 fs-5"
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="text-secondary">Cargando imagenes...</p>
            </div>
        )
    if (error)
        return (
            <p className="text-center text-danger fs-5 mt-5">
                {error}
            </p>
        )

    return (
        <>
            <h4 className="text-center bg-info-subtle fs-5 fw-bold mb-4 p-3 text-danger">
                LAS MASCOTAS ESTAN EN ADOPCION RESPONSABLE, EL COSTO ES SIMBOLICO PARA LA REALIZACION DE ESTE PROYECTO
            </h4>
            <ul className="d-flex flex-wrap justify-content-center text-center gap-4 list-unstyled p-0">
                {gatos.map((gato) => (
                    <li key={gato.id} className="card shadow-lg fs-6 border-secondary-subtle bg-info-subtle rounded">
                        <img
                            src={gato.imagen}
                            className="card-img-top rounded-4 p-2"
                            alt={gato.nombre}
                            style={{ width: "100%", height: "350px", objectFit: "cover" }}
                        ></img>
                        <br />
                        <span className="fw-bold fs-5 mt-2">{gato.nombre}</span>
                        <span className="fs-6">{gato.descripcion}</span>
                        <span className="fw-bold fs-5">$ {gato.precio}</span>
                        <button
                            className="btn btn-success m-1 rounded fs-6 d-block mx-auto"
                            onClick={() => addToCart(gato)}
                        >
                            Adoptar
                        </button>
                        <Link
                            to={`/gatos/${gato.id}/${gato.nombre}`}
                            state={{ gato }}
                        >
                            <button
                                className="btn btn-dark bg-info m-2 fs-6 rounded">
                                Más detalles
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Gatos
