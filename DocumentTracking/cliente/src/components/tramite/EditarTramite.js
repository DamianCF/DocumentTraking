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
            {/* <NavBar /> */}
            <h3 className='Titulos'>Tramite</h3>

            {/* <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Infomacion Tramite</a>
                </li>
                <li className="nav-item">
                    <a className="tabs" href={`/editarcasostramite/${idDEP}`}>Casos</a>
                </li>
                <li className="nav-item">
                    <a className="tabs" href={`/editardocumentostramite/${idDEP}`}>Documentos</a>
                </li>
            </ul> */}

            <div>
                <nav className="nav-tabs navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
                    <div className="container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                            <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        <a className="navbar-brand" href="/tramites"> Tramites</a>


                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="tabs" aria-current="page" href="#">Infomacion Tramite</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={`/editarcasostramite/${idDEP}`}>Casos</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" href={`/editardocumentostramite/${idDEP}`}>Documentos</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6 offset-3'>
                        <div className='mb-3'>
                            <label htmlFor='descripcion' className='form-label'>Descripcion</label>
                            <input type="text" className='form-control' value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }}></input>
                        </div>
                        <button onClick={editarTramite} className='btn btn-success'>Editar Tramite</button>
                        &nbsp;
                        <button className="btn btn-secondary"  onClick={()=>navegar("/tramites")}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarTramite