import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function DocumentoIndividual({ documento ,mostrarQuitar, idTramite}) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar documento
    function borrarDocumento(idDocumento){

            axios.post('/api/usuario/borrardocumento', {idDocumento: idDocumento}).then(res =>{
                console.log(res.data)
                alert(res.data)
                navegar(0)
            }).catch(err =>{
                console.log(err)
            })
    }

    const [datatramites, setdatatramite] = useState([])


    // //Funcion para borrar documento
    // function borrarDocumento(idDocumento) {
        
    //     // buscar tramites
    //     axios.get('/api/usuario/obtenertramites', {}).then(res => {
    //         setdatatramite(res.data)
            
    //         //mapeo tramites
    //         datatramites.map(tramite => {
                
    //             if (tramite.documentos.length >= 1) {
    //                 const found = tramite.documentos.find(element => element === idDocumento);
                   
    //                 if (found === idDocumento) {
    //                    // eliminar el documento del tramite
    //                     const filteredLibraries = tramite.documentos.filter((item) => item !== idDocumento)
    //                     const actualizartramite = {
    //                         idTramite: idTramite,
    //                         estado: 'A',
    //                         documentos: filteredLibraries
    //                     }
                        
    //                     // hacer peticion usando axios
    //                     axios.post('/api/usuario/actualizarTramite', actualizartramite)
    //                         .then(res => {
    //                             console.log(res.data)
    //                             // borra documento
    //                             axios.post('/api/usuario/borrardocumento', { idDocumento: idDocumento })
    //                                 .then(res => {
    //                                     navegar(0)
    //                                 }).catch(err => {
    //                                     console.log(err)
    //                                 })
    //                         })
    //                         .then(err => {
    //                             if (err) {
    //                                 console.log(err)
    //                             }
    //                         })
    //                 }
    //             }
    //         })
    //     }).catch(err => { console.log(err) }
    //     )
    // }

    
    function quitardocumento(idDocumento) {
        /// buscar dep -> cargarlo junto con sus documentos ->
        axios.post('/api/usuario/obtenertramite', { idTramite }).then(res => {
            const datatramite = res.data[0];
            var documentos1 = datatramite.documentos;
            // eliminar el documento del tramite
            const filteredLibraries = documentos1.filter((item) => item !== idDocumento)

            // Nuevo objeto para actualizar usuario
            const actualizartramite = {
                idTramite: idTramite,
                estado: 'A',
                documentos: filteredLibraries
            }

            // hacer peticion usando axios
            axios.post('/api/usuario/actualizarTramite', actualizartramite)
                .then(res => {
                    console.log(res.data)
                    // actualizar documentos en pantalla
                    navegar(0)
                })
                .then(err => {
                    if (err) {
                        console.log(err)
                    }
                })
        })

    }

  
     
    return (
        <div>
            <div className='container'>
                <div className='row'>

                    <div className='col-sm-6 offset-3'  data-aos= "flip-right">

                        <ul className='list-group'>
                            <li className='listar' >ID Documento: {documento.idDocumento}</li>
                            <li className='listar'>Documento: {documento.nombre}</li>
                            <li className='listar'>Detalles: {documento.detalles}</li>
                            <li className='listar'>Ubicacion: {documento.ubicacion}</li>
                          
                        </ul>

                        <Link to={`/editarDocumento/${documento.idDocumento}`}><li className='btn btn-success'>Editar</li></Link>
                        &nbsp;
                        <button hidden={mostrarQuitar} className="btn btn-warning" onClick={() => quitardocumento(documento.idDocumento)}>Quitar</button>
                       &nbsp;
                        <button className="btn btn-danger" onClick={()=>borrarDocumento(documento.idDocumento)}>Eliminar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default DocumentoIndividual