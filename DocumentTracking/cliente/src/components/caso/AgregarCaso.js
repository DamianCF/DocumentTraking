import React, {useState} from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../NavBar';
import {Link, useNavigate} from 'react-router-dom'



function AgregarCaso(){

    const navegar = useNavigate()
    
    //Hooks 
    const[numCaso,setNombre] = useState('')
    const[detalle,setDetalle]= useState('')
    const[fechaIni,setFechaIni]= useState('')
    const[fechaFin,setFechaFin]= useState('')

    function agregarCaso(){
        var caso = {
            numCaso: numCaso,
            detalle: detalle,
            fechaIni: fechaIni,
            fechaFin: fechaFin,
            idCaso: uniquid()
        }

        console.log(caso)

        axios.post('/api/usuario/agregarCaso', caso)
        .then(res =>{
            //alert(res.data)
            Swal.fire('Felicidades', 'El caso se creo con exito')
            navegar('/casos')
        })
        .then(err => {console.log(err)})
    }

    return(
        <div className='container'>
            <NavBar/>

            <div className="Titulos">
                    <h2 className='mt-4'> Crear nuevo caso</h2>
            </div>

            <div className='boxAgregar'>
                <div className='col-sm-6 offset-3'>

                    <div className='mb-3'>
                        <label htmlFor='numCaso' className='form-label'>Numero de caso</label>
                        <input type="text" className='form-control'  value = {numCaso} onChange = {(e)=>{setNombre(e.target.value )}}></input>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='detalle' className='form-label'>Detalle</label>
                        <input type="text" className='form-control'  value = {detalle} onChange = {(e)=>{setDetalle(e.target.value )}}></input>
                    </div>

                    <hr></hr>
                    <form>
                        <label for="Fecha de inicio">Fecha de inicio: </label>

                        <input type="date" id="Fecha de inicio" name="Fecha de inicio" className='Calendario' 
                        value = {fechaIni} onChange = {(e)=>{setFechaIni(e.target.value )}}></input>
                    </form><br></br>

                    <form>
                        <label for="Fecha de finalizacion">Fecha de finalización: </label>
                        <input type="date" id="Fecha de inicio" name="Fecha de finalizacion" className='Calendario'
                        value = {fechaFin} onChange = {(e)=>{setFechaFin(e.target.value )}}></input>
                    </form><br></br>

                    <button onClick={agregarCaso} className='btn btn-success'>Guardar caso</button>

                </div>
            </div>
        </div>
    )
}

export default AgregarCaso