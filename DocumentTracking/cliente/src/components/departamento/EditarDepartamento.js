import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../NavBar'
import Swal from 'sweetalert2'
var idDEP = '';


function EditarDepartamento() {

    const params = useParams()


    //Hooks 
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [estado, setEstado] = useState('A')

    // para volver atras a pagina principal
    const navegar = useNavigate()


    useEffect(() => {
        axios.post('/api/usuario/obtenerdatadepartamento', { idDepartamento: params.idDepartamento }).then(res => {
            //console.log(res.data[0])
            const datadepartamento = res.data[0]
            setNombre(datadepartamento.nombre)
            setDescripcion(datadepartamento.descripcion)
            setCorreo(datadepartamento.correo)
            setTelefono(datadepartamento.telefono)
            idDEP = params.idDepartamento;
        })
    }, [])

    //funcion que actualiza

    function editarDepartamento() {
        // Nuevo objeto para actualizar usuario
        const actualizardepartamento = {
            idDepartamento: params.idDepartamento,
            nombre: nombre,
            descripcion: descripcion,
            correo: correo,
            telefono: telefono,
            estado : estado
        }

        // hacer peticion usando axios
        axios.post('/api/usuario/actualizardepartamento', actualizardepartamento)
            .then(res => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Departamento Editado',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navegar("/departamentos")
            })
            .then(err => { 
                if(err){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se ha podido actualizar el departamento!',
                      })
                }
             })
    }


    return (

        <div>
            {/* <NavBar /> */}

            <h3 className='Titulos'>Departamento</h3>

            {/* <ul className="nav nav-tabs">
                <li className="tabs">
                    <a className="nav-link active" aria-current="page" href="#">Infomacion Departamento</a>
                </li>
                <li className="tabs">
                    <a className="nav-link" href={`/editartramitesdepartamento/${idDEP}`}>Tramites</a>
                </li>
                <li className="tabs">
                    <a className="nav-link" href={`/editarempleadosdepartamento/${idDEP}`}>Empleados</a>
                </li>
            </ul> */}

            <div>
                <nav className="nav-tabs navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
                    <div className="container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                            <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        <a className="navbar-brand" href="/departamentos"> Departamentos</a>


                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="tabs" aria-current="page">Infomacion Departamento</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={`/editartramitesdepartamento/${idDEP}`}>Tramites</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={`/editarempleadosdepartamento/${idDEP}`}>Empleados</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>


            <div className='container'>

                <div className='boxAgregar'>
                    <div className='col-sm-6 offset-3'>
                        <div className='mb-3'>
                            <label htmlFor='nombre' className='form-label'>Nombre</label>
                            <input type="text" className='form-control' value={nombre} onChange={(e) => { setNombre(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='descripcion' className='form-label'>Descripcion</label>
                            <input type="text" className='form-control' value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='correo' className='form-label'>Correo</label>
                            <input type="correo" className='form-control' value={correo} onChange={(e) => { setCorreo(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='telefono' className='form-label'>Telefono</label>
                            <input type="text" className='form-control' value={telefono} onChange={(e) => { setTelefono(e.target.value) }}></input>
                        </div>

                        <button onClick={editarDepartamento} className='btn btn-success'>Editar Departamento</button>
                        &nbsp;
                        <button  onClick={()=>navegar("/departamentos")} className="btn btn-secondary">Cancelar</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarDepartamento