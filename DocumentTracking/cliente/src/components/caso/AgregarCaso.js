import React, {useState} from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../NavBar';

function AgregarCaso(){

    //Hooks 
    const[numCaso,setNombre] = useState('')
    const[detalle,setDetalle]= useState('')

    function agregarCaso(){
        var caso = {
            numCaso: numCaso,
            detalle: detalle,
            idCaso: uniquid()
        }

        console.log(caso)

        axios.post('/api/usuario/agregarCaso', caso)
        .then(res =>{
            //alert(res.data)
            Swal.fire('Felicidades', 'El caso se creo con exito')
        })
        .then(err => {console.log(err)})
    }

    return(
        <div className='container'>
            <NavBar/>

            <div className='row'>
                    <h2 className='mt-4'> Crear nuevo caso</h2>
            </div>

            <div className='row'>
                <div className='col-sm-6 offset-3'>

                    <div className='mb-3'>
                        <label htmlFor='numCaso' className='form-label'>Numero de caso</label>
                        <input type="text" className='form-control'  value = {numCaso} onChange = {(e)=>{setNombre(e.target.value )}}></input>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='detalle' className='form-label'>Detalle</label>
                        <input type="correo" className='form-control'  value = {detalle} onChange = {(e)=>{setDetalle(e.target.value )}}></input>
                    </div>

                    <button onClick={agregarCaso} className='btn btn-success'>Guardar caso</button>

                </div>
            </div>
        </div>
    )
}

export default AgregarCaso