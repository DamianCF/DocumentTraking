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
                <TramiteIndivual tramite={tramite}/>
            </div>
        )
    })

   
   
    return (        
        <div>
            <NavBar/>

            <div>
                <h1>
                    Tramites
                </h1>
                <a className="nav-link" href="/agregartramite">Agregar Tamite</a>
                <hr/>
                {listatramites}
            </div>
        </div>

    )
}


export default ListarTramites