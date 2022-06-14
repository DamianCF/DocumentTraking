import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function DepartamentoIndividual({ departamento }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar departamento
    function borrardepartamento(iddepartamento){

            axios.post('/api/usuario/borrardepartamento', {idDepartamento: iddepartamento}).then(res =>{
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
                            <li className='list-group-item' hidden =  "true" >{departamento.idDepartamento}</li>
                            <li className='list-group-item'>Departamento: {departamento.nombre}</li>
                            <li className='list-group-item'>Descripcion: {departamento.descripcion}</li>
                            <li className='list-group-item'>Correo: {departamento.correo} / Telefono: {departamento.telefono}</li>
                        </ul>

                        <Link to={`/editardepartamento/${departamento.idDepartamento}`}><li className='btn btn-success'>Editar</li></Link>
                        &nbsp;
                        <button className="btn btn-danger" onClick={()=>borrardepartamento(departamento.idDepartamento)}>Borrar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default DepartamentoIndividual