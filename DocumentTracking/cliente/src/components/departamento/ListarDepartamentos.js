
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import DepartamentoIndividual from './DepartamentoIndividual'
import axios from 'axios'



function Listardepartamentos() {


    const[datadepartamentos,setdatadepartamento] = useState([])

    useEffect( () => {
            axios.post('api/usuario/obtenerdepartamentos', { estado: "A" }).then(res => {
                console.log(res.data)
                setdatadepartamento(res.data)
            }).catch( err =>{console.log(err)}
            ) // min 1:39:38
    },[])


    // mapear listadepartamentos en objeto usuario
    const listadepartamentos = datadepartamentos.map(departamento=>{
        return(
            <div>
                <DepartamentoIndividual departamento={departamento}/>
               {/* <h3>{departamento.nombre}</h3> */}
            </div>
        )
    })

    return (

        <div>
            <NavBar/>
            <div>
                <h1 className="Titulos">
                    Departamentos
                </h1>
                <a className="nav-link" href="/agregardepartamento">Agregar Departamento</a>
                <hr/>
                {listadepartamentos}
            </div>
        </div>
    )
}


export default Listardepartamentos