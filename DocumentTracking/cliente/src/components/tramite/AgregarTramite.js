import React, { useState } from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../NavBar';
import {Link, useNavigate} from 'react-router-dom'

function AgregarTramite() {

    //Hooks 

    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('A')

    const navegar = useNavigate()
    function agregarTramite() {
        var tramite = {
            descripcion: descripcion,
            estado: estado,
            idTramite: uniquid()
        }

        console.log(tramite)

        axios.post('/api/usuario/agregartramite', tramite)
            .then(res => {
               Swal.fire('Felicidades', 'El tramite se creo con exito')
               navegar("/tramites")
            })
            .then(err => { 
                
                 Swal.fire({
                     icon: 'error',
                     title: 'Oops...',
                     text: 'No se ha podido guardar el tramite!',
                })
                console.log(err) })
    }

    return (

        <>
            <NavBar />
            <div className='container'>

                <div className='Titulos'>
                    <h2 className='mt-4'> Crear nuevo tramite</h2>
                </div>

                <div className='boxAgregar'>
                    <div className='col-sm-6 offset-3'>

                        <div className='mb-3'>
                            <label htmlFor='descripcion' className='form-label'>Descripcion</label>
                            <input type="text" className='form-control' value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }}></input>
                        </div>

                        <button onClick={agregarTramite} className='btn btn-success'>Guardar Tramite</button>
                        
                    </div>
                </div>
            </div>
        </>

    )
}

export default AgregarTramite