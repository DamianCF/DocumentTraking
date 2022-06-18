import React, { useState } from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../NavBar';

function AgregarDocumentos() {

    //Hooks 

    const [detalles, setDetalles] = useState('')
    const [estado, setEstado] = useState('A')
    const [ubicacion, setUbicacion] = useState('')

    // const[empleados, setEmpleados] = useState('')
    // const[tramites, setTramites] = useState('')



    function agregarDocumentos() {
        var documento = {

            estado: estado,
            detalles: detalles,
            ubicacion: ubicacion,
            idDocumento: uniquid()
         
          

        }

        console.log(documento)

        axios.post('/api/usuario/AgregarDocumentos', documento)
            .then(res => {
                //alert(res.data)
                Swal.fire('Felicidades', 'El documento se creo con exito')
            })
            .then(err => { console.log(err) })
    }

    return (

        <>
            <NavBar />
            <div className='container'>

                <div className='row'>
                    <h2 className='mt-4'> Crear nuevo documento</h2>
                </div>

                <div className='row'>
                    <div className='col-sm-6 offset-3'>


                        <div className='mb-3'>
                            <label htmlFor='detalles' className='form-label'>detalles</label>
                            <input type="text" className='form-control' value={detalles} onChange={(e) => { setDetalles(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='ubicacion' className='form-label'>ubicacion</label>
                            <input type="text" className='form-control' value={ubicacion} onChange={(e) => { setUbicacion(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='estado' className='form-label'>estado</label>
                            <input type="text" className='form-control' value={estado} onChange={(e) => { setEstado(e.target.value) }}></input>
                        </div>


                        {/* 
        <div className='mb-3'>
            <label htmlFor='tramites' className='form-label'>Tramites</label>
            <input type="text" className='form-control' value = {tramites} onChange = {(e)=>{setTramites(e.target.value )}}></input>
        </div> */}

                        <button onClick={AgregarDocumentos} className='btn btn-success'>Guardar documento</button>

                    </div>
                </div>
            </div>
        </>

    )
}

export default AgregarDocumentos