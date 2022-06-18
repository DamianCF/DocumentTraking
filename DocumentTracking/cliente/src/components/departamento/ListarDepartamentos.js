
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
            </div>
        )
    })

    return (

        <div>
            <NavBar/>

            <div>
                <h1 class="Titulos">
                    Departamentos
                </h1>
                <a className="nav-link" href="/agregardepartamento">Agregar Departamento</a>
                <hr/>
                {listadepartamentos}
            </div>

            {/* <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                    The current link item
                </a>
                <a href="#" className="list-group-item list-group-item-action">A second link item</a>
                <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                <a className="list-group-item list-group-item-action disabled">A disabled link item</a>
            </div> */}
        </div>

    )
}


export default Listardepartamentos