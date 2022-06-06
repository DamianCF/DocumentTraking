
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import EmpleadoIndividual from '../empleado/EmpleadoIndividual'
import axios from 'axios'



function EmpleadosDepartamento() {


    const[dataempleados,setdataempleados] = useState([])

    //FALTA QUE FILTRE POR DEPARTAMENTO EN ESPECIFICO
    useEffect( () => {
            axios.get('/api/usuario/obtenerempleados').then(res => {
                console.log(res.data)
                setdataempleados(res.data)
            }).catch( err =>{console.log(err)}
            ) // min 1:39:38
    },[])


    //mapear listaempleadosdep en objeto usuario
    const listaempleadosdep = dataempleados.map(empleado=>{
        return(
            <div>
                <EmpleadoIndividual empleado={empleado}/>
            </div>
        )
    })

    return (

        <div>
            <NavBar/>

            <h3> Empleados de Departamento</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link" href="#">Informacion Departamento</a>
                </li>
                <li className="nav-item">
                    <a  className="nav-link" href="/">Tramites</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Empleados</a>
                </li>
            </ul>


            <div>
                {/* <h1>
                    Departamentos
                </h1> */}
                {/* <a className="nav-link" href="/agregardepartamento">Agregar Departamento</a>
                <hr/> */}
                {listaempleadosdep}
            </div>

        </div>

    )
}


export default EmpleadosDepartamento