
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

    const [tramites, setTramites] = useState([]);

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
                    //console.log(res.data[0])
                    setdatatramite(...datatramites, res.data);
                })

            })

        })



        axios.get('/api/usuario/obtenertramites').then(res => {
            //console.log(res.data)
            setTramites(res.data)
        }).catch(err => { console.log(err) }
        ) // min 1:39:38

    }, [])


    //mapear listatramitesdep en objeto usuario
    const listatramitesdep = datatramites.map(tramite => {
        return (
            <div>
                <TramiteIndividual tramite={tramite} />
            </div>
        )
    })

    //mapear listatramitesdep en objeto usuario
    const listatramites = tramites.map(tramite => {

    // if(datatramites.find(tramite)){
    //         console.log("hola")
    //          }

    // console.log(datatramites);
    return (
        
        <option value={tramite.idTramite}>{tramite.descripcion}</option>

        )
    })
 

    const agregarTramiteDep = (() => {

        // console.log(document.getElementById("select").value)
         var tramiteSelect = document.getElementById("select").value;
         console.log(tramiteSelect)

    });


    return (

        <div>

            <NavBar />

            <h3> Tramites de Departamento</h3>

            <div >
                <select id="select" className="form-select" aria-label="Default select example" >
                    {listatramites}
                </select>
                <br />
                <button className="btn btn-success" onClick={agregarTramiteDep}>Agregar</button>
                <br />

            </div>


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
                {listatramitesdep}
            </div>

        </div>

    )
}


export default Tramitesdepartamento