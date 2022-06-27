import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import TramiteIndivual from './TramiteIndividual'
import axios from 'axios'

function ListarTramites() {
   
    const[datatramites,setdatatramite] = useState([])

    useEffect( () => {
            axios.get('api/usuario/obtenertramites').then(res => {
                console.log(res.data)
                setdatatramite(res.data)
            }).catch( err =>{console.log(err)}
            ) // min 1:39:38
    },[])


    // mapear listatramites en objeto tramite
    const listatramites = datatramites.map(tramite=>{
        return(
            <div>
                <TramiteIndivual tramite={tramite}  mostrarQuitar = {"false"}  />
            </div>
        )
    })

   
   
    return (        
        <div>
            <NavBar/>
            <div className='acomodar-resultados'>
                {listatramites}
            </div>

            <div className='sticky'>
                <h1 class="Titulos">
                    Tramites
                </h1>
                <a className="btn-insertar" href="/agregartramite">Agregar Tamite</a>
                <hr/>
                
            </div>
        </div>

    )
}


export default ListarTramites