import { useNavigate } from "react-router-dom";

const CLiente = ({ cliente, handleEliminar }) => {
  const navigate = useNavigate();

  const { nombre, empresa, email, telefono, comentario, id } = cliente;

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold">Tel: </span>
          {telefono}
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          type="button"
          className="mb-1 bg-gray-300 hover:bg-gray-400 block w-full text-white p-2 uppercase font-bold text-xs"
          onClick={() => navigate(`/clientes/${id}`)}
        >
          Ver
        </button>
        <button
          type="button"
          className="mb-1 bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs"
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>
        <button
          type="button"
          className="mt-1 bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs"
          onClick={ () => {handleEliminar(id)} }
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default CLiente;
