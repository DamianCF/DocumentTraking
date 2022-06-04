import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function UsuarioIndividual({ usuario }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar usuario
    function borrarusuario(idusuario){

            axios.post('/api/usuario/borrarusuario', {idusuario: idusuario}).then(res =>{
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
                            <li className='list-group-item'>{usuario.idUsuario}</li>
                            <li className='list-group-item'>{usuario.nombre}</li>
                            <li className='list-group-item'>{usuario.email}</li>
                            <li className='list-group-item'>{usuario.telefono}</li>
                        </ul>

                        <Link to={`/editarusuario/${usuario.idUsuario}`}><li className='btn btn-success'>Editar</li></Link>
                        &nbsp;
                        <button className="btn btn-danger" onClick={()=>borrarusuario(usuario.idusuario)}>Borrar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default UsuarioIndividual