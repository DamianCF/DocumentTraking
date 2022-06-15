import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import CasoIndividual from './CasoIndividual'
import axios from 'axios'



function ListarCasos() {

    const[dataDeCasos,setdataDeCasos] = useState([])

    useEffect( () => {
            axios.get('api/usuario/obtenerCasos').then(res => {
                console.log(res.data)
                setdataDeCasos(res.data)
            }).catch( err =>{console.log(err)}
            ) 
    },[])

    const listadecasos = dataDeCasos.map(caso=>{
        return(
            <div>
                <CasoIndividual caso={caso}/>
            </div>
        )
    })

    return (

        <div>
            <NavBar/>

            <div>
                <h1>
                    Casos
                </h1>
                <a class="nav-link" href="/agregarCaso">Agregar Caso</a>
                <hr/>
                {listadecasos}
            </div>
        </div>

    )
}


export default ListarCasos