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
                <DocumentoIndividual documento={documento} />
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
                <input className="form-control inputBuscar"
                    value={busqueda}
                    placeholder="Busqueda por Identificador"
                    onChange={handleChange}
                />
                <a class="btn-insertar" href="/agregardocumentos">Agregar Documentos</a>
                <hr />

            
            </div>
        </div>

    )
}


export default ListarDocumentos
