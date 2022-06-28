import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function DocumentoIndividual({ documento }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar documento
    function borrardocumento(idDocumento){

            axios.post('/api/usuario/borrardocumento', {idDocumento: idDocumento}).then(res =>{
                console.log(res.data)
                alert(res.data)
                navegar(0)
            }).catch(err =>{
                console.log(err)
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
                        <button className="btn btn-danger" onClick={()=>borrardocumento(documento.idDocumento)}>Eliminar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default DocumentoIndividual