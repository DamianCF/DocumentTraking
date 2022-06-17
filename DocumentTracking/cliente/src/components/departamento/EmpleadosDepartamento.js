
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import EmpleadoIndividual from '../empleado/EmpleadoIndividual'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



function EmpleadosDepartamento() {


    var idDEP = '';
    const params = useParams()
    idDEP = params.idDepartamento;
    //console.log("IDDEPARTMANENTO " +idDEP);


    const [dataempleados, setdataempleados] = useState([])

    //FALTA QUE FILTRE POR DEPARTAMENTO EN ESPECIFICO
    useEffect(() => {
        axios.get('/api/usuario/obtenerempleados').then(res => {
            console.log(res.data)
            setdataempleados(res.data)
        }).catch(err => { console.log(err) }
        ) // min 1:39:38
    }, [])


    //mapear listaempleadosdep en objeto usuario
    const listaempleadosdep = dataempleados.map(empleado => {
        return (
            <div>
                <EmpleadoIndividual empleado={empleado} />
            </div>
        )
    })

    return (

        <div>
            <NavBar />

            <h3> Empleados de Departamento</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    {/* <a className="nav-link" href="#">Informacion Departamento</a> */}
                    <a className="nav-link" href={`/editardepartamento/${idDEP}`}>Informacion Departamento</a>
                </li>
                <li className="nav-item">
                    {/* <a className="nav-link" href="/">Tramites</a> */}
                    <a className="nav-link" href={`/editartramitesdepartamento/${idDEP}`}>Tramites</a>
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