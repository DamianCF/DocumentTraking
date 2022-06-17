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


export default ListarCasos