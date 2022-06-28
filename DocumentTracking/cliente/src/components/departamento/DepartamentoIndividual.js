import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Swal from 'sweetalert2'


function DepartamentoIndividual({ departamento }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar departamento
    function borrardepartamento(iddepartamento){

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
                  Swal.fire('Eliminado!','El departamento ha sido eliminado.','success')
                     axios.post('/api/usuario/borrardepartamento', {idDepartamento: iddepartamento}).then(res =>{
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
                            <li className='listar' hidden =  {true} >{departamento.idDepartamento}</li>
                            <li className='listar'>Departamento: {departamento.nombre}</li>
                            <li className='listar'>Descripcion: {departamento.descripcion}</li>
                            <li className='listar'>Correo: {departamento.correo} / Telefono: {departamento.telefono}</li>
                        </ul>

                        <Link to={`/editardepartamento/${departamento.idDepartamento}`}><li className='btn btn-success'>Seleccionar</li></Link>
                        &nbsp;
                        <button className="btn btn-danger" onClick={()=>borrardepartamento(departamento.idDepartamento)}>Eliminar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default DepartamentoIndividual