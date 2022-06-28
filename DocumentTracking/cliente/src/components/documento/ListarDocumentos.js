import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DocumentoIndividual from './DocumentoIndividual';


function ListarDocumentos() {
    const [idDocumento, setIdDocumento] = useState([])
    const [dataDocumentos, setdataDocumentos] = useState([])
    const [busqueda, setBusqueda] = useState("");
   

    const handleChange=e=> {
        setBusqueda(e.target.value);
        filtrar(e.target.value);

    }
    const filtrar = (terminoBusqueda) => {
        var ResultadosBusqueda = dataDocumentos.filter((elemento) => {
            if (elemento.idDocumento.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento;

            }
        });
        setdataDocumentos(ResultadosBusqueda);
    }

    useEffect(() => {
        axios.get('api/usuario/obtenerdocumentos').then(res => {
          // console.log(res.data)
            setIdDocumento(res.data)
            setdataDocumentos(res.data)
        }).catch(err => { console.log(err) }
        )
    }, [])

    const listadocumentos = dataDocumentos.map(documento => {
        return (
            <div className='App'>
                <DocumentoIndividual documento={documento}  mostrarQuitar = {"false"}/>
            </div>
        )
    })

    return (
        <div >
            
            <NavBar />
            
            <div className='acomodar-resultados'>
                {listadocumentos}
            </div>
            
            <div className='sticky'>
                <h1 class="Titulos">Documento</h1>
                <a class="btn-insertar" href="/agregardocumentos">Agregar Documentos</a><br/>
                <hr />
                
                <input className="btn-seleccion"
                    value={busqueda}
                    placeholder="Busqueda por Identificador"
                    onChange={handleChange}/>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                
            
            
            </div>
        </div>

    )
}


export default ListarDocumentos
