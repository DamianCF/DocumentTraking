import React, { useState } from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../NavBar';

function AgregarTramite() {

    //Hooks 

    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('A')

    function agregarTramite() {
        var tramite = {
            descripcion: descripcion,
            estado: estado,
            idTramite: uniquid()
        }

        console.log(tramite)

        axios.post('/api/usuario/agregartramite', tramite)
            .then(res => {
                //alert(res.data)
               Swal.fire('Felicidades', 'El tramite se creo con exito')
            })
            .then(err => { 
                
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: 'No se ha podido guardar el tramite!',
                //   })
                console.log(err) })
    }

    return (

        <>
            <NavBar />
            <div className='container'>

                <div className='row'>
                    <h2 className='mt-4'> Crear nuevo tramite</h2>
                </div>

                <div className='row'>
                    <div className='col-sm-6 offset-3'>

                        <div className='mb-3'>
                            <label htmlFor='descripcion' className='form-label'>Descripcion</label>
                            <input type="text" className='form-control' value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }}></input>
                        </div>

                        {/* 
        <div className='mb-3'>
            <label htmlFor='tramites' className='form-label'>Tramites</label>
            <input type="text" className='form-control' value = {tramites} onChange = {(e)=>{setTramites(e.target.value )}}></input>
        </div> */}

                        <button onClick={agregarTramite} className='btn btn-success'>Guardar Tramite</button>

                    </div>
                </div>
            </div>
        </>

    )
}

export default AgregarTramite