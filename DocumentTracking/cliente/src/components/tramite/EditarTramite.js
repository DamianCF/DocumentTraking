import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../NavBar'
import Swal from 'sweetalert2'
var idDEP = '';

function EditarTramite() {

    const params = useParams()

    //Hooks 
    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('A')

    // para volver atras a pagina principal
    const navegar = useNavigate()

    useEffect(() => {
        axios.post('/api/usuario/obtenertramite', { idTramite: params.idTramite }).then(res => {
            //console.log(res.data[0])
            const datatramite = res.data[0]
            setDescripcion(datatramite.descripcion)
            idDEP = params.idTramite;
        })
    }, [])

    //funcion que actualiza
    function editarTramite() {
        // Nuevo objeto para actualizar usuario
        const actualizartramite = {
            idTramite: params.idTramite,
            descripcion: descripcion,
            estado: estado
        }

        // hacer peticion usando axios
        axios.post('/api/usuario/actualizartramite', actualizartramite)
            .then(res => {
                // console.log("exito")
                // console.log(res.data)
                // alert(res.data)
                // navegar('/')
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tramite Editado',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .then(err => {
                if (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se ha podido actualizar el tramite!',
                    })
                }
                // console.log("fallo")
                // console.log(err)
            })
    }

    return (
        <div>
            <NavBar />
            <h3>Tramite</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Infomacion Tramite</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={`/editarcasostramite/${idDEP}`}>Casos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={`/editardocumentostramite/${idDEP}`}>Documentos</a>
                </li>
            </ul>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6 offset-3'>
                        <div className='mb-3'>
                            <label htmlFor='descripcion' className='form-label'>Descripcion</label>
                            <input type="text" className='form-control' value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }}></input>
                        </div>
                        <button onClick={editarTramite} className='btn btn-success'>Editar Tramite</button>
                        &nbsp;
                        <button className="btn btn-secondary">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarTramite