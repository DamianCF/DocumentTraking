import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function TramiteIndividual({ tramite , mostrarQuitar, idDepartamento}) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar tramite
    function borrartramite(idTramite){

            axios.post('/api/usuario/borrartramite', {idTramite: idTramite}).then(res =>{
                //console.log(res.data)
                alert(res.data)
                navegar(0)
            }).catch(err =>{
                console.log(err)
            })
    }


    function quitartramite(idTramite){
        console.log(idDepartamento)
        console.log(idTramite)

        /// buscar dep -> cargarlo junto con sus tramites ->
        //buscar en los tramites y eliminar el tramite que coincide
        // actualizar departamento con sus tramites
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>

                    <div className='col-sm-6 offset-3'  data-aos= "flip-right">

                        <ul className='list-group'>
                            <li className='list-group-item'  hidden = {true}>{tramite.idTramite}</li>
                            <li className='list-group-item'>{tramite.descripcion}</li>
                        </ul>

                        <Link to={`/editartramite/${tramite.idTramite}`}><li className='btn btn-success'>Seleccionar</li></Link>
                        &nbsp;
                        <button hidden = {mostrarQuitar} className="btn btn-warning" onClick={()=>quitartramite(tramite.idTramite)}>Quitar</button>
                        &nbsp;
                        <button className="btn btn-danger" onClick={()=>borrartramite(tramite.idTramite)}>Eliminar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default TramiteIndividual