import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DocumentoIndividual from './DocumentoIndividual';

function ListarDocumentos() {

    const[dataDocumentos,setdataDocumentos] = useState([])

    useEffect( () => {
            axios.get('api/usuario/obtenerdocumentos').then(res => {
                console.log(res.data)
                setdataDocumentos(res.data)
            }).catch( err =>{console.log(err)}
            ) 
    },[])

    const listadocumentos = dataDocumentos.map(documento=>{
        return(
            <div>
                <DocumentoIndividual documento={documento}/>
            </div>
        )
    })

    return (
        <div >
            <NavBar/> 

            <div className='acomodar-resultados'>
                {listadocumentos}
            </div>
            <div className='sticky'>
                <h1 class="Titulos">Documentos</h1>
                <a class="btn-insertar" href="/agregardocumentos">Agregar Documentos</a> 
                <hr/>
               
            </div>
        </div>

    )
}


export default ListarDocumentos
