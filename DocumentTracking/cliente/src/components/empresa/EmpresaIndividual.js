import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function EmpresaIndividual({ empresa }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar empresa
    function borrarempresa(idEmpresa){

            // axios.post('/api/usuario/borrarempresa', {idempresa: idempresa}).then(res =>{
            //     console.log(res.data)
            //     alert(res.data)
            //     navegar(0)
            // }).catch(err =>{
            //     console.log(err)
            // })
    }


    return (
        <div>
            <div className='container'>
                <div className='row'>

                    <div className='col-sm-6 offset-3'  data-aos= "flip-right">

                        <ul className='listar-group'>
                            <li className='listar' hidden = "true">{empresa.idEmpresa}</li>
                            <li className='listar'>{ "Nombre: " + empresa.nombre}</li>
                            <li className='listar'>{"Negocio: "+ empresa.indoleNegocio}</li>
                            <li className='listar'>{"Correo: " + empresa.correo}</li>
                            <li className='listar'>{"Telefono: " + empresa.telefono}</li>
                        </ul>

                        <Link to={`/editarempresa/${empresa.idUsuario}`}><li className='btn btn-success'>Editar</li></Link>
                        &nbsp;
                        <button className="btn btn-danger" onClick={()=>borrarempresa(empresa.idempresa)}>Borrar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default EmpresaIndividual