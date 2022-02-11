import React from 'react';
import { Formik, Form, Field} from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from '../components/Spinner'

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
              .required('Campo obligatorio')
              .min(3, 'Nombre demasiado corto')
              .max(50, 'Nombre demasiado largo'),
    empresa: Yup.string().required('Campo obligatorio')
                .max(50, 'Nombre demasiado largo'),
    email: Yup.string().required('Campo obligatorio')
              .email('No es un email valido')
              .max(50, 'Nombre demasiado largo'),
    telefono: Yup.number()
                .typeError('Número incorrecto')
                .integer('Número incorrecto')
                .positive('Número incorrecto'),
    comentario: Yup.string().required('Campo obligatorio')
                  .min(3, 'Nomnre demasiado corto')
                  .max(200, 'Nombre demasiado largo')
    
  })

  const handleSubmit = async(valores) => {
    try {
          let respuesta

          if(cliente.id){
            const url = `http://localhost:5000/clientes/${cliente.id}`
            respuesta = await fetch(url, {
              method: 'PUT',
              body: JSON.stringify(valores),
              headers: {
                'Content-type': 'application/json'
              }
          })
          }else{
            const url = 'http://localhost:5000/clientes'
            respuesta = await fetch(url, {
              method: 'POST',
              body: JSON.stringify(valores),
              headers: {
                'Content-type': 'application/json'
              }
          })
          }
        
          await respuesta.json()
          navigate('/clientes')

    } catch (error) {
      console.log(error)
    }
    
    
  }
  return (

    cargando ? <Spinner /> : (

      <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>

      <h1 className='text-gray-600 font-bold text-xl uppercase text-center mt-3'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar cliente'}</h1>

          

          <Formik
            initialValues={{
              nombre: cliente?.nombre ?? '',
              empresa: cliente?.empresa ?? '',
              email: cliente?.email ?? '',
              telefono: cliente?.telefono ?? '',
              comentario: cliente?.comentario ?? ''
            }}
            enableReinitialize={true}

            onSubmit={ async (values, {resetForm}) => {
              await handleSubmit(values)
              resetForm()
            }}
            validationSchema={nuevoClienteSchema}

          >
            {({errors, touched}) => {
              
              return (

            <Form>
              <div className='mb-4'>
                <label 
                  htmlFor="nombre"
                  className='text-gray-800'
                  >
                    Nombre:
                    </label>
                <Field 
                  type='text'
                  id='nombre'
                  placeholder='Nombre del cliente'
                  className='block mt-2 w-full p-3 bg-gray-50' 
                  name='nombre'
                />
              </div>

                {errors.nombre && touched.nombre ? (
                  <Alerta>
                    {errors.nombre}
                  </Alerta>
                ) : null }

              <div className='mb-4'>
                <label 
                  htmlFor="empresa"
                  className='text-gray-800'
                  >
                    Empresa:
                    </label>
                <Field 
                  type='text'
                  id='empresa'
                  placeholder='Empresa del cliente'
                  className='block mt-2 w-full p-3 bg-gray-50' 
                  name='empresa'
                />
              </div>
              {errors.empresa && touched.empresa ? (
                  <Alerta>
                    {errors.empresa}
                  </Alerta>
                ) : null }
              <div className='mb-4'>
                <label 
                  htmlFor="email"
                  className='text-gray-800'
                  >
                    Email:
                    </label>
                <Field 
                  type='email'
                  id='email'
                  placeholder='Email del cliente'
                  className='block mt-2 w-full p-3 bg-gray-50' 
                  name='email'
                />
              </div>
              {errors.email && touched.email ? (
                  <Alerta>
                    {errors.email}
                  </Alerta>
                ) : null }
              <div className='mb-4'>
                <label 
                  htmlFor="telefono"
                  className='text-gray-800'
                  >
                    Telefono:
                    </label>
                <Field 
                  type='telefono'
                  id='tel'
                  placeholder='Tlf del cliente'
                  className='block mt-2 w-full p-3 bg-gray-50' 
                  name='telefono'
                />
              </div>
              {errors.telefono ? (
                  <Alerta>
                    {errors.telefono}
                  </Alerta>
                ) : null }
              <div className='mb-4'>
                <label 
                  htmlFor="comentario"
                  className='text-gray-800'
                  >
                    Comentario:
                    </label>
                <Field 
                  as="textarea"
                  type='comentario'
                  id='text'
                  placeholder='Email del cliente'
                  className='block mt-2 w-full p-3 bg-gray-50 h-40' 
                  name='comentario'
                />
              </div>
              {errors.comentario && touched.comentario ? (
                  <Alerta>
                    {errors.comentario}
                  </Alerta>
                ) : null }
              <div>
              <input 
                  type="submit"
                  value={cliente?.nombre ? 'Modificar' : 'Agregar'}
                  className='mt-5 uppercase bg-blue-800 hover:bg-blue-700 text-white w-full p-3 font-bold text-lg cursor-pointer'
                  />
              </div>
            </Form>
            )}}
          </Formik>

      </div>
    )
    )
    
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario;
