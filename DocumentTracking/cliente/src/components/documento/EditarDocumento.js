import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../NavBar'
import Swal from 'sweetalert2'
var idDEP = '';

function EditarDocumento() {

    const params = useParams()


    //Hooks 
    const [detalles, setDetalles] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [estado, setEstado] = useState('A')

    // para volver atras a pagina principal
    const navegar = useNavigate()


    useEffect(() => {
        axios.post('/api/usuario/obtenerdatadocumento', { idDocumento: params.idDocumento }).then(res => {
            //console.log(res.data[0])
            const datadocumentos = res.data[0]
            setDetalles(datadocumentos.detalles)
            setUbicacion(datadocumentos.ubicacion)
            setEstado(datadocumentos.estado)
            idDEP = params.idDocumento;
        })
    }, [])

    //funcion que actualiza

    function editarDocumento() {
        // Nuevo objeto para actualizar usuario
        const actualizardocumento = {
            idDocumento: params.idDocumento,
            detalles: detalles,
            ubicacion: ubicacion,
            estado : estado

        }

        // hacer peticion usando axios
        axios.post('/api/usuario/actualizadocumento', actualizardocumento)
            .then(res => {
              
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Documento Editado',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navegar("/documentos")
            })
            .then(err => { 

                if(err){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se ha podido actualizar el documento!',
                      })
                }
             })
    }


    return (

        <div>
            <NavBar />

            <h3 className='Titulos'>Documento</h3>

            <div className='container'>

                <div className='boxAgregar'>
                    <div className='col-sm-6 offset-3'>

                        <div className='mb-3'>
                            <label htmlFor='detalles' className='form-label'>Detalles</label>
                            <input type="text" className='form-control' value={detalles} onChange={(e) => { setDetalles(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='ubicacion' className='form-label'>Ubicacion</label>
                            <input type="text" className='form-control' value={ubicacion} onChange={(e) => { setUbicacion(e.target.value) }}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Estado' className='form-label'>Estado</label>
                            <input type="text" className='form-control' value={estado} onChange={(e) => { setEstado(e.target.value) }}></input>
                        </div>

                        <button onClick={editarDocumento} className='btn btn-success'>Editar Documento</button>
                        &nbsp;
                        <button  onClick={()=>navegar("/documentos")} className="btn btn-secondary">Cancelar</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarDocumento