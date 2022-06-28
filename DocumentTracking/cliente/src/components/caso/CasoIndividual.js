import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import Swal from 'sweetalert2'
import 'aos/dist/aos.css'


function CasoIndividual({ caso ,mostrarQuitar, idTramite}) {

    const navegar = useNavigate()

// Para animacion de scroll al bajar
    useEffect(()=>{
        AOS.init()
    },[])

    //Funcion para borrar caso
    function borrarCaso(iddeCaso){
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
              Swal.fire('Eliminado!','El caso ha sido eliminado.','success')
                axios.post('/api/usuario/borrarCaso', {idCaso: iddeCaso}).then(res =>{
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
    const [datatramites, setdatatramite] = useState([])


    // //Funcion para borrar caso
    // function borrarCaso(idCaso) {
        
    //     // buscar tramites
    //     axios.get('/api/usuario/obtenertramites', {}).then(res => {
    //         setdatatramite(res.data)
            
    //         //mapeo tramites
    //         datatramites.map(tramite => {
                
    //             if (tramite.casos.length >= 1) {
    //                 const found = tramite.casos.find(element => element === idCaso);
                   
    //                 if (found === idCaso) {
    //                    // eliminar el caso del tramite
    //                     const filteredLibraries = tramite.casos.filter((item) => item !== idCaso)
    //                     const actualizartramite = {
    //                         idTramite: idTramite,
    //                         estado: 'A',
    //                         casos: filteredLibraries
    //                     }
                        
    //                     // hacer peticion usando axios
    //                     axios.post('/api/usuario/actualizarTramite', actualizartramite)
    //                         .then(res => {
    //                             console.log(res.data)
    //                             // borra caso
    //                             axios.post('/api/usuario/borrarCaso', { idCaso: idCaso })
    //                                 .then(res => {
    //                                     navegar(0)
    //                                 }).catch(err => {
    //                                     console.log(err)
    //                                 })
    //                         })
    //                         .then(err => {
    //                             if (err) {
    //                                 console.log(err)
    //                             }
    //                         })
    //                 }
    //             }
    //         })
    //     }).catch(err => { console.log(err) }
    //     )
    // }

    
    function quitarcaso(idCaso) {
        /// buscar dep -> cargarlo junto con sus casos ->
        axios.post('/api/usuario/obtenertramite', { idTramite }).then(res => {
            const datatramite = res.data[0];
            var casos1 = datatramite.casos;
            // eliminar el caso del tramite
            const filteredLibraries = casos1.filter((item) => item !== idCaso)

            // Nuevo objeto para actualizar usuario
            const actualizartramite = {
                idTramite: idTramite,
                estado: 'A',
                casos: filteredLibraries
            }

            // hacer peticion usando axios
            axios.post('/api/usuario/actualizarTramite', actualizartramite)
                .then(res => {
                    console.log(res.data)
                    // actualizar casos en pantalla
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
                            <li className='listar' hidden =  "true" >{caso.idCaso}</li>
                            <li className='listar'>Numero de caso: {caso.numCaso}</li>
                            <li className='listar'>Detalle: {caso.detalle}</li>
                            <li className='listar'>Fecha de inicio: {caso.fechaIni}</li>
                            <li className='listar'>Fecha de finalización: {caso.fechaFin}</li>
                        </ul>

                        <Link to={`/editarCaso/${caso.idCaso}`}><li className='btn btn-success'>Editar</li></Link>
                        &nbsp;
                        <button hidden={mostrarQuitar} className="btn btn-warning" onClick={() => quitarcaso(caso.idCaso)}>Quitar</button>
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