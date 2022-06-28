import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function EmpleadoIndividual({ empleado ,  mostrarQuitar, idDepartamento }) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    // //Funcion para borrar empleado
    // function borrarempleado(idEmpleado){

    //         axios.post('/api/usuario/borrarempleado', {idEmpleado: idEmpleado}).then(res =>{
    //             console.log(res.data)
    //             alert(res.data)
    //             navegar(0)
    //         }).catch(err =>{
    //             console.log(err)
    //         })
    // }

    const [datadepartamentos, setdatadepartamento] = useState([])


    //Funcion para borrar empleado
    function borrarempleado(idEmpleado) {
        
        // buscar departamentos
        axios.post('/api/usuario/obtenerdepartamentos', { estado: "A" }).then(res => {
            setdatadepartamento(res.data)
            
            //mapeo departamentos
            datadepartamentos.map(departamento => {
                
                if (departamento.empleados.length >= 1) {
                    const found = departamento.empleados.find(element => element === idEmpleado);
                   
                    if (found === idEmpleado) {
                       // eliminar el empleado del departamento
                        const filteredLibraries = departamento.empleados.filter((item) => item !== idEmpleado)
                        const actualizardepartamento = {
                            idDepartamento: idDepartamento,
                            estado: 'A',
                            empleados: filteredLibraries
                        }
                        
                        // hacer peticion usando axios
                        axios.post('/api/usuario/actualizardepartamento', actualizardepartamento)
                            .then(res => {
                                console.log(res.data)
                                // borra empleado
                                axios.post('/api/usuario/borrarempleado', { idEmpleado: idEmpleado })
                                    .then(res => {
                                        navegar(0)
                                    }).catch(err => {
                                        console.log(err)
                                    })
                            })
                            .then(err => {
                                if (err) {
                                    console.log(err)
                                }
                            })
                    }
                }
            })
        }).catch(err => { console.log(err) }
        )
    }


    function quitarempleado(idEmpleado) {
        console.log(idDepartamento)
        console.log(idEmpleado)

        /// buscar dep -> cargarlo junto con sus empleados ->
        axios.post('/api/usuario/obtenerdatadepartamento', { idDepartamento }).then(res => {
            const datadepartamento = res.data[0]

            var empleados1 = datadepartamento.empleados;
            // eliminar el empleado del departamento
            const filteredLibraries = empleados1.filter((item) => item !== idEmpleado)
            //console.log(filteredLibraries)

            // Nuevo objeto para actualizar usuario
            const actualizardepartamento = {
                idDepartamento: idDepartamento,
                estado: 'A',
                empleados: filteredLibraries
            }

            // hacer peticion usando axios
            axios.post('/api/usuario/actualizardepartamento', actualizardepartamento)
                .then(res => {
                    console.log(res.data)
                    // actualizar empleados en pantalla
                    navegar(0)

                })
                .then(err => {
                    if (err) {
                        console.log(err)
                    }
                })
        })

    }

    return (
        <div>
            <div className='container'>
                <div className='row'>

                    <div className='col-sm-6 offset-3'  data-aos= "flip-right">

                        <ul className='list-group'>
                            <li className='listar' hidden ={true}>{empleado.idEmpleado}</li>
                            <li className='listar'>Nombre: {empleado.nombre}</li>
                            <li className='listar'>Cedula: {empleado.cedula}</li>
                            <li className='listar'>Correo: {empleado.correo}</li>
                            <li className='listar'>telefono:{empleado.telefono}</li>
                        </ul>

                        <Link to={`/editarempleado/${empleado.idEmpleado}`}><li className='btn btn-success'>Editar</li></Link>
                        &nbsp;
                        <button hidden={mostrarQuitar} className="btn btn-warning" onClick={() => quitarempleado(empleado.idEmpleado)}>Quitar</button>
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