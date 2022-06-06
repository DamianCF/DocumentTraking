
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import TramiteIndividual from '../tramite/TramiteIndividual'
import axios from 'axios'



function Tramitesdepartamento() {


    const[datatramites,setdatatramite] = useState([])

    //FALTA QUE FILTRE POR DEPARTAMENTO EN ESPECIFICO
    useEffect( () => {
            axios.get('/api/usuario/obtenertramites').then(res => {
                console.log(res.data)
                setdatatramite(res.data)
            }).catch( err =>{console.log(err)}
            ) // min 1:39:38
    },[])


    //mapear listatramitesdep en objeto usuario
    const listatramitesdep = datatramites.map(tramite=>{
        return(
            <div>
                <TramiteIndividual tramite={tramite}/>
            </div>
        )
    })

    return (

        <div>
            <NavBar/>

            <h3> Tramites de Departamento</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link" href="#">Informacion Departamento</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Tramites</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Empleados</a>
                </li>
            </ul>


            <div>
                {/* <h1>
                    Departamentos
                </h1> */}
                {/* <a className="nav-link" href="/agregardepartamento">Agregar Departamento</a>
                <hr/> */}
                {listatramitesdep}
            </div>

        </div>

    )
}


export default Tramitesdepartamento