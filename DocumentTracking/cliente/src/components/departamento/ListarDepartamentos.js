
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import DepartamentoIndividual from './DepartamentoIndividual'
import axios from 'axios'



function Listardepartamentos() {


    const[datadepartamentos,setdatadepartamento] = useState([])

    useEffect( () => {
            axios.get('api/usuario/obtenerdepartamentos').then(res => {
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
                <h1>
                    Departamentos
                </h1>
                {listadepartamentos}
            </div>

            {/* <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                    The current link item
                </a>
                <a href="#" class="list-group-item list-group-item-action">A second link item</a>
                <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
                <a class="list-group-item list-group-item-action disabled">A disabled link item</a>
            </div> */}
        </div>

    )
}


export default Listardepartamentos