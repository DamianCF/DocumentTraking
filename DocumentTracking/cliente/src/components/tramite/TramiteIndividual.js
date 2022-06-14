import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function TramiteIndividual({ tramite }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar tramite
    function borrartramite(idTramite){

            axios.post('/api/usuario/borrartramite', {idTramite: idTramite}).then(res =>{
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
                            <li className='list-group-item'>{tramite.idTramite}</li>
                            <li className='list-group-item'>{tramite.descripcion}</li>
                        </ul>

                        <Link to={`/editartramite/${tramite.idTramite}`}><li className='btn btn-success'>Editar</li></Link>
                        &nbsp;
                        <button className="btn btn-danger" onClick={()=>borrartramite(tramite.idTramite)}>Borrar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default TramiteIndividual