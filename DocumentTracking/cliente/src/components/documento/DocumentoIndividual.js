import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Swal from 'sweetalert2'


function DocumentoIndividual({ documento }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar documento
    function borrardocumento(idDocumento){

            Swal.fire({
                title: 'Estás seguro?',
                text: "Se borrará permanentemente!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire('Eliminado!','El caso ha sido eliminado.','success')
                    axios.post('/api/usuario/borrardocumento', {idDocumento: idDocumento}).then(res =>{
                        console.log(res.data)
                        navegar(0)
                    }).catch(err =>{
                        Swal.fire('ERROR!','Error al eliminar el caso','error')
                        console.log(err)
                        navegar(0)
                    })
                }
            })
    }
  
     
    return (
        <div >
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