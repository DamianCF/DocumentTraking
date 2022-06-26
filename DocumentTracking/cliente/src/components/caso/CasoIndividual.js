import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import Swal from 'sweetalert2'
import 'aos/dist/aos.css'


function CasoIndividual({ caso }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar caso
    function borrarCaso(iddeCaso){
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
                axios.post('/api/usuario/borrarCaso', {idCaso: iddeCaso}).then(res =>{
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
        <div>
            <div className='container'>
                <div className='row'>

                    <div className='col-sm-6 offset-3'  data-aos= "flip-right">

                        <ul className='list-group'>
                            <li className='listar' hidden =  "true" >{caso.idCaso}</li>
                            <li className='listar'>Numero de caso: {caso.numCaso}</li>
                            <li className='listar'>Detalle: {caso.detalle}</li>
                            <li className='listar'>Fecha de inicio: {caso.fechaIni}</li>
                            <li className='listar'>Fecha de finalización: {caso.fechaFin}</li>
                        </ul>

                        <Link to={`/editarCaso/${caso.idCaso}`}><li className='btn btn-success'>Editar</li></Link>
                        &nbsp;
                        <button className="btn btn-danger" onClick={()=>borrarCaso(caso.idCaso)}>Borrar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CasoIndividual