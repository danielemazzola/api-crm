import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function verCliente() {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      setCargando(true);

      try {
        const url = `http://localhost:5000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
        setCargando(false);
    };
    obtenerClienteAPI();
  }, []);

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <div>
      <>
        <h1 className="font-black text-4xl text-blue-800">Ver CLiente</h1>
        <p className="text-gray-600 mt-3">Información del Cliente</p>

        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">CLiente: </span>
          {cliente.nombre}
        </p>
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Empresa: </span>
          {cliente.empresa}
        </p>
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {cliente.email}
        </p>
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Telefono: </span>
          {cliente.telefono}
        </p>

        {cliente.comentario ? (
          <p className="text-2xl text-gray-600 mt-4">
            <span className="text-gray-800 uppercase font-bold">
              Comentarios:{" "}
            </span>
            {cliente.comentario}
          </p>
        ) : (
          <p className="text-1xl text-gray-600 mt-4">
            <span className="text-red-800 d">Sin comentarios</span>
          </p>
        )}
      </>
    </div>
  );
}

export default verCliente;
