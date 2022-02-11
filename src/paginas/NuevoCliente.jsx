import Formulario from "../components/Formulario";

function NuevoCliente() {
  return (
    <>
        <h1 className="font-black text-4xl text-blue-800">Nuevo Cliente</h1>
        <p className="text-gray-600 mt-3">Llena los siguientes campos para registrar un nuevo cliente</p>

        <Formulario />
    </>
    )
}

export default NuevoCliente;
