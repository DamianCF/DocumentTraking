import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../NavBar'

var idCASO = '';

function EditarCaso() {

    const params = useParams()


    //Hooks 
    const [numCaso, setNumCaso] = useState('')
    const [detalle, setDetalle] = useState('')

    // para volver atras a pagina principal
    const navegar = useNavigate()


    useEffect(() => {
        axios.post('/api/usuario/obtenerdataCaso', { idCaso: params.idCaso }).then(res => {
            console.log(res.data[0])
            const datadecaso = res.data[0]
            setNumCaso(datadecaso.numCaso)
            setDetalle(datadecaso.detalle)
            idCASO = params.idCaso;
        })
    }, [])

    //funcion que actualiza

    function editarCaso() {
        // Nuevo objeto para actualizar caso
        const actualizarcaso = {
            numCaso: numCaso,
            detalle: detalle,
            idCaso: params.idCaso
        }

        // hacer peticion usando axios
        axios.post('/api/usuario/actualizarCaso', actualizarcaso)
            .then(res => {
                console.log(res.data)
                alert(res.data)
                navegar('/casos')
            })
            .then(err => { console.log(err) })
    }


    return (

        <div>
            <NavBar />

            <h3>Caso</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Infomacion Caso</a>
                </li>
                {/*
                <li className="nav-item">
                    <a className="nav-link" href={`/editartramitesdepartamento/${idDEP}`}>Tramites</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={`/editarempleadosdepartamento/${idDEP}`}>Empleados</a>
                </li>
                */}
            </ul>


            <div className='container'>

                <div className='row'>
                    <div className='col-sm-6 offset-3'>

                        <div className='mb-3'>
                            <label htmlFor='nombre' className='form-label'>Numero de caso</label>
                            <input type="text" className='form-control' value={numCaso} onChange={(e) => { setNumCaso(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='descripcion' className='form-label'>Detalle</label>
                            <input type="text" className='form-control' value={detalle} onChange={(e) => { setDetalle(e.target.value) }}></input>
                        </div>

                        <button onClick={editarCaso} className='btn btn-success'>Editar caso</button>
                        <button className="btn btn-secondary">Cancelar</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarCaso