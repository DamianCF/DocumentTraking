import React, { useState, useEffect, Redirect } from 'react'
import axios from 'axios'
import NavBar from './NavBar';
 import EmpresaIndividual from './empresa/EmpresaIndividual'


function Principal() {

    const[dataempresas,setdataempresa] = useState([])

    useEffect( () => {
            axios.post('api/usuario/obtenerdataempresa', { idEmpresa : localStorage.getItem("idEmpresa") , estado: "A" }).then(res => {
                console.log(res.data)
                setdataempresa(res.data)
            }).catch( err =>{console.log(err)}
            ) // min 1:39:38setdataempresa
    },[])


    // mapear listaempresas en objeto empresa
    const listaempresas = dataempresas.map(empresa=>{
        return(
            <div>
                <EmpresaIndividual empresa={empresa}/>
            </div>
        )
    })


    return (

        <div>
            <NavBar/>
            <div>
                <h1 class="Titulos">
                    Inicio Empresa
                </h1>
                <hr/>
                {listaempresas}
            </div>


        </div>
    )
}


export default Principal