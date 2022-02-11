import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

function EditarCliente() {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {

      try {
        const url = `http://localhost:5000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
        setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, []);


  return (
    <>
        <h1 className="font-black text-4xl text-blue-800">Editar CLiente</h1>
        <p className="text-gray-600 mt-3">Modifica la información de tu cliente</p>

        {cliente?.nombre && (
        <Formulario 
          cliente = {cliente}
          cargando = {cargando}
        />
        )}
    </>
    )
}

export default EditarCliente;