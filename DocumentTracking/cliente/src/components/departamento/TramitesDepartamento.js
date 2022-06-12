
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import TramiteIndividual from '../tramite/TramiteIndividual'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



function Tramitesdepartamento() {

    var idDEP = '';
    const params = useParams()
    idDEP = params.idDepartamento;
    //console.log("IDDEPARTMANENTO " +idDEP);

    // const[tramites, setTramites] = useState([]);

    const [datatramites, setdatatramite] = useState([])

    //FALTA QUE FILTRE POR DEPARTAMENTO EN ESPECIFICO
    useEffect(() => {

        axios.post('/api/usuario/obtenerdatadepartamento', { idDepartamento: params.idDepartamento }).then(res => {
            //console.log(res.data[0])
            const datadepartamento = res.data[0]
            // console.log(datadepartamento.tramites);
            // setTramites(datadepartamento.tramites)

            var tramites = datadepartamento.tramites
            //console.log(tramites)
            tramites.map(tramite => {
                // console.log(tramite)

                axios.post('/api/usuario/obtenerdatatramite', { tramite }).then(res => {
                    console.log(res.data[0])
                    setdatatramite(...datatramites, res.data);
                })

            })

        })



        // axios.get('/api/usuario/obtenertramites').then(res => {
        //     console.log(res.data)
        //     setdatatramite(res.data)
        // }).catch( err =>{console.log(err)}
        // ) // min 1:39:38
    }, [])


    //mapear listatramitesdep en objeto usuario
    const listatramitesdep = datatramites.map(tramite => {
        return (
            <div>
                <TramiteIndividual tramite={tramite} />
            </div>
        )
    })

    return (

        <div>
            <NavBar />

            <h3> Tramites de Departamento</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    {/* <a className="nav-link"  href="#">Informacion Departamento</a> */}

                    <a className="nav-link" href={`/editardepartamento/${idDEP}`}>Informacion Departamento</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Tramites</a>
                </li>
                <li className="nav-item">
                    {/* <a className="nav-link" href ="#">Empleados</a> */}

                    <a className="nav-link" href={`/editarempleadosdepartamento/${idDEP}`}>Empleados</a>
                </li>
            </ul>


            <div>
                {/* <h1>
                    Departamentos
                </h1> */}
                {/* <a className="nav-link" href="/agregardepartamento">Agregar Departamento</a>
                <hr/> */}
                {listatramitesdep}
            </div>

        </div>

    )
}


export default Tramitesdepartamento