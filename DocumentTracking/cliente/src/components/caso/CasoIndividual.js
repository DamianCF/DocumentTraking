import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function CasoIndividual({ caso }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar departamento
    function borrarCaso(iddeCaso){

            axios.post('/api/usuario/borrarCaso', {iddeCaso: iddeCaso}).then(res =>{
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
                            <li className='list-group-item' hidden =  "true" >{caso.idCaso}</li>
                            <li className='list-group-item'>Numero de caso: {caso.numCaso}</li>
                            <li className='list-group-item'>Detalle: {caso.detalle}</li>
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