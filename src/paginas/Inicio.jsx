import { useState, useEffect } from "react";
import CLiente from "../components/CLiente";

function Inicio() {

  const [clientes, setClientes ] = useState([])

  useEffect( () => {
    const obtenerClienteApi = async () => {
      try {
        const url = 'http://localhost:5000/clientes'
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setClientes(resultado)

      } catch (error) {

        console.log(error)
        
      }
    }
    obtenerClienteApi()
  },[])

  const handleEliminar = async id => {
    const confirmar = confirm('¿Deseas eliminar este cliente?')

    if(confirmar){
      try {
          const url = `http://localhost:5000/clientes/${id}`
          const respuesta = await fetch(url, {
            method:'DELETE'
          })  
          await respuesta.json()

          const upDateClientes = clientes.filter( cliente => cliente.id !== id)
          setClientes(upDateClientes)

      } catch (error) {
        conspole.log(error)
      }
    }

  }

  return (

        
        <>

          <h1 className="font-black text-4xl text-blue-900">Cliente</h1>
          <p className="text-gray-600 mt-3">Administra tus Cliente</p>

          <table className="w-full mt-5 table-auto shadow bg-white">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Empresa</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map( cliente => (

                <CLiente 
                  key={clientes.id}
                  cliente = {cliente}
                  handleEliminar = {handleEliminar}
                />

              ))}

            </tbody>
          </table>
        </>
      

    )
}

export default Inicio;