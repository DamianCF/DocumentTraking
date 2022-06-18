import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function EmpleadoIndividual({ empleado }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar empleado
    function borrarempleado(idEmpleado){

            axios.post('/api/usuario/borrarempleado', {idEmpleado: idEmpleado}).then(res =>{
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
                            <li className='list-group-item'>{empleado.idEmpleado}</li>
                            <li className='list-group-item'>{empleado.nombre}</li>
                            <li className='list-group-item'>{empleado.correo}</li>
                            <li className='list-group-item'>{empleado.telefono}</li>
                        </ul>

                        <Link to={`/editarempleado/${empleado.idEmpleado}`}><li className='btn btn-success'>Editar</li></Link>
                        &nbsp;
                        <button className="btn btn-danger" onClick={()=>borrarempleado(empleado.idEmpleado)}>Borrar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default EmpleadoIndividual