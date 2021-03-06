import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


function TramiteIndividual({ tramite, mostrarQuitar, idDepartamento }) {

    const navegar = useNavigate()

    // Para animacion de scroll al bajar
    useEffect(() => {
        AOS.init()
    }, [])

    const [datadepartamentos, setdatadepartamento] = useState([])


    //Funcion para borrar tramite
    function borrartramite(idTramite) {
        
        // buscar departamentos
        axios.post('/api/usuario/obtenerdepartamentos', { estado: "A" }).then(res => {
            setdatadepartamento(res.data)
            
            //mapeo departamentos
            datadepartamentos.map(departamento => {
                
                if (departamento.tramites.length >= 1) {
                    const found = departamento.tramites.find(element => element === idTramite);
                   
                    if (found === idTramite) {
                       // eliminar el tramite del departamento
                        const filteredLibraries = departamento.tramites.filter((item) => item !== idTramite)
                        const actualizardepartamento = {
                            idDepartamento: idDepartamento,
                            estado: 'A',
                            tramites: filteredLibraries
                        }
                        
                        // hacer peticion usando axios
                        axios.post('/api/usuario/actualizardepartamento', actualizardepartamento)
                            .then(res => {
                                console.log(res.data)
                                // borra tramite
                                axios.post('/api/usuario/borrartramite', { idTramite: idTramite })
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

    // //Funcion para borrar tramite
    // function borrartramite(idTramite){

    //     axios.post('/api/usuario/borrartramite', {idTramite: idTramite}).then(res =>{
    //         //console.log(res.data)
    //         alert(res.data)
    //         navegar(0)
    //     }).catch(err =>{
    //         console.log(err)
    //     })
    // }



    function quitartramite(idTramite) {
        console.log(idDepartamento)
        console.log(idTramite)

        /// buscar dep -> cargarlo junto con sus tramites ->
        axios.post('/api/usuario/obtenerdatadepartamento', { idDepartamento }).then(res => {
            //console.log(res.data[0])
            const datadepartamento = res.data[0]

            var tramites1 = datadepartamento.tramites;
            // eliminar el tramite del departamento
            const filteredLibraries = tramites1.filter((item) => item !== idTramite)
            //console.log(filteredLibraries)


            // Nuevo objeto para actualizar usuario
            const actualizardepartamento = {
                idDepartamento: idDepartamento,
                estado: 'A',
                tramites: filteredLibraries
            }

            // hacer peticion usando axios
            axios.post('/api/usuario/actualizardepartamento', actualizardepartamento)
                .then(res => {
                    console.log(res.data)
                    // actualizar tramites en pantalla
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

                    <div className='col-sm-6 offset-3' data-aos="flip-right">

                        <ul className='list-group'>
                            <li className='list-group-item' hidden={true}>{tramite.idTramite}</li>
                            <li className='list-group-item'>{tramite.descripcion}</li>
                        </ul>

                        <Link to={`/editartramite/${tramite.idTramite}`}><li className='btn btn-success'>Seleccionar</li></Link>
                        &nbsp;
                        <button hidden={mostrarQuitar} className="btn btn-warning" onClick={() => quitartramite(tramite.idTramite)}>Quitar</button>
                        &nbsp;
                        <button className="btn btn-danger" onClick={() => borrartramite(tramite.idTramite)}>Eliminar</button>
                        <hr className='mt-4'></hr>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default TramiteIndividual