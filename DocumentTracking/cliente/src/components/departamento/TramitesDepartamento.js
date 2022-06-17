
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import TramiteIndividual from '../tramite/TramiteIndividual'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



function Tramitesdepartamento() {

    var idDEP = '';
    const params = useParams()
    idDEP = params.idDepartamento;

    //Hooks

    // estan cargados con objects
    const [tramitesBD, setTramitesBD] = useState([]);
    const [dataTramitesDep, setdataTramitesDep] = useState([])

    //encargados de editar el departamento
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [tramitesDEP, setTramitesDEP] = useState([]);

    //FALTA QUE FILTRE POR DEPARTAMENTO EN ESPECIFICO
    useEffect(() => {

        axios.post('/api/usuario/obtenerdatadepartamento', { idDepartamento: params.idDepartamento }).then(res => {
            const datadepartamento = res.data[0]
            setNombre(datadepartamento.nombre)
            setDescripcion(datadepartamento.descripcion)
            setCorreo(datadepartamento.correo)
            setTelefono(datadepartamento.telefono)
            setTramitesDEP(datadepartamento.tramites)

            var tramites1 = datadepartamento.tramites
            //console.log(tramitesBD)
            tramites1.map(tramite => {
                // console.log(tramite)

                axios.post('/api/usuario/obtenerdatatramite', { tramite }).then(res => {
                    //console.log(res.data[0])
                    setdataTramitesDep(...dataTramitesDep, res.data);
                })

            })

        })



        axios.get('/api/usuario/obtenertramites').then(res => {
            //console.log(res.data)
            setTramitesBD(res.data)
        }).catch(err => { console.log(err) }
        ) // min 1:39:38

    }, [])


    //mapear listatramitesdep en objeto usuario
    const listatramitesdep = dataTramitesDep.map(tramite => {
        return (
            <div>
                <TramiteIndividual tramite={tramite} />
            </div>
        )
    })

    //mapear listatramitesdep en objeto usuario
    const listatramites = tramitesBD.map(tramite => {
    return (
        
        <option value={tramite.idTramite}>{tramite.descripcion}</option>

        )
    })
 

    const agregarTramiteDep = (() => {

        // // console.log(document.getElementById("select").value)
        //  var tramiteSelect = document.getElementById("select").value;
        //  console.log(tramiteSelect)


        //  axios.post('/api/usuario/obtenerdatadepartamento', { idDepartamento: params.idDepartamento }).then(res => {
        //     //console.log(res.data[0])
        //     const datadepartamento = res.data[0]
        //     // console.log(datadepartamento.tramitesBD);
        //     // setTramitesBD(datadepartamento.tramitesBD)

        //     setdataTramitesDep( ...datadepartamento.tramitesBD,tramiteSelect);

        //     const actualizardepartamento = {
        //         nombre: nombre,
        //         descripcion: descripcion,
        //         correo: correo,
        //         telefono: telefono,
        //         idDepartamento: params.idDepartamento,
        //         tramitesBD:dataTramitesDep
        //     }
        //     // hacer peticion usando axios
        //     axios.post('/api/usuario/actualizadepartamento', actualizardepartamento)
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .then(err => { 
        //         console.log(err)
        //      })
        // })

    });


    function editarDepartamento() {
        setdataTramitesDep(...dataTramitesDep,document.getElementById("select").value)

        // Nuevo objeto para actualizar usuario
        const actualizardepartamento = {
            nombre: nombre,
            descripcion: descripcion,
            correo: correo,
            telefono: telefono,
            idDepartamento: idDEP,
            tramites:tramitesDEP
        }

        // hacer peticion usando axios
        axios.post('/api/usuario/actualizadepartamento', actualizardepartamento)
            .then(res => {
                console.log(res.data)
            })
            .then(err => { 
                console.log(err)
             })
    }


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