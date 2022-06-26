import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../NavBar'
import Swal from 'sweetalert2'

var idCASO = '';

function EditarCaso() {

    const params = useParams()


    //Hooks 
    const [numCaso, setNumCaso] = useState('')
    const [detalle, setDetalle] = useState('')
    const [fechaIni,setFechaIni]= useState('')
    const [fechaFin,setFechaFin]= useState('')

    // para volver atras a pagina principal
    const navegar = useNavigate()


    useEffect(() => {
        axios.post('/api/usuario/obtenerdataCaso', { idCaso: params.idCaso }).then(res => {
            console.log(res.data[0])
            const datadecaso = res.data[0]
            setNumCaso(datadecaso.numCaso)
            setDetalle(datadecaso.detalle)
            setFechaIni(datadecaso.fechaIni)
            setFechaFin(datadecaso.fechaFin)
            idCASO = params.idCaso;
        })
    }, [])

    //funcion que actualiza
    function editarCaso() {
        // Nuevo objeto para actualizar caso
        const actualizarcaso = {
            numCaso: numCaso,
            detalle: detalle,
            fechaIni: fechaIni,
            fechaFin: fechaFin,
            idCaso: params.idCaso
        }

        // hacer peticion usando axios
        axios.post('/api/usuario/actualizarCaso', actualizarcaso)
            .then(res => {
                console.log(res.data)
                Swal.fire('Completado', 'El caso se editó con éxito')
                navegar('/casos')
            })
            .then(err => { console.log(err) })
    }


    return (

        <div>
            <NavBar />

            <h1 className='Titulos'>Caso</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Infomacion Caso</a>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link" href={`/editartramitesdepartamento/${idCASO}`}>Control de fechas</a>
                </li>
                {/*
                <li className="nav-item">
                    <a className="nav-link" href={`/editarempleadosdepartamento/${idDEP}`}>Empleados</a>
                </li>
                */}
            </ul>

            <div className='container'>
                <div className='boxAgregar'>
                    <div className='col-sm-6 offset-3'>

                        <div className='mb-3'>
                            <label htmlFor='numeroCaso' className='form-label'>Numero de caso</label>
                            <input type="text" className='form-control' value={numCaso} onChange={(e) => { setNumCaso(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='detalle' className='form-label'>Detalle</label>
                            <input type="text" className='form-control' value={detalle} onChange={(e) => { setDetalle(e.target.value) }}></input>
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

                        <hr></hr>
                        <button onClick={editarCaso} className='btn btn-success'>Editar caso</button>
                        <br></br><br></br>
                        <button onClick={()=>navegar("/casos")} className="btn btn-secondary">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditarCaso