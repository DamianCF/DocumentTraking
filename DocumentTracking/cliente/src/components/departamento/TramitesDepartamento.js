
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import TramiteIndividual from '../tramite/TramiteIndividual'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


function Tramitesdepartamento() {

    var idDEP = '';
    const params = useParams()
    idDEP = params.idDepartamento;

    const navegar = useNavigate()

    var cont = 0;
    //Hooks

    // estan cargados con objects
    const [tramitesBD, setTramitesBD] = useState([]);
    const [dataTramitesDep, setdataTramitesDep] = useState([])

    //encargados de editar el departamento
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [estado, setEstado] = useState('A')
    const [tramitesDEP, setTramitesDEP] = useState([]);

    
    useEffect(() => {

        axios.post('/api/usuario/obtenerdatadepartamento', { idDepartamento: params.idDepartamento }).then(res => {
            const datadepartamento = res.data[0]
            setNombre(datadepartamento.nombre)
            setDescripcion(datadepartamento.descripcion)
            setCorreo(datadepartamento.correo)
            setTelefono(datadepartamento.telefono)
            setTramitesDEP(datadepartamento.tramites)
            var tramites1 = datadepartamento.tramites;

            if (cont < 1) {  // esto por que se duplica la lista puesto que el use efect se aplica 2 veces
                cont++;
                tramites1.map(tramite => {
                    axios.post('/api/usuario/obtenerdatatramite', { tramite }).then(res => {
                        if(res.data[0] != undefined){
                            setdataTramitesDep(dataTramitesDep => dataTramitesDep.concat(res.data[0]));
                        }
                    })
                })
            }
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
                <TramiteIndividual tramite={tramite}  idDepartamento = {params.idDepartamento}/>
            </div>
        )
    })


    const listatramites = tramitesBD.map(tramite => {

        if (undefined != tramitesDEP.find(element => element == tramite.idTramite)) {
            //console.log(tramite.descripcion);
            return <></>
        }
        else {

            return (
                <option value={tramite.idTramite}>{tramite.descripcion}</option>
            )
        }
    })


    function editarDepartamento() {


        //console.log(document.getElementById("select").value)
        // setTramitesDEP( tramitesDEP => tramitesDEP.concat( document.getElementById("select").value) )
        tramitesDEP.push(document.getElementById("select").value)
        console.log(tramitesDEP)

        // Nuevo objeto para actualizar usuario
        const actualizardepartamento = {
            idDepartamento: idDEP,
            nombre: nombre,
            descripcion: descripcion,
            correo: correo,
            telefono: telefono,
            estado: estado,
            tramites: tramitesDEP
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
    }


    return (

        <div>
            {/*<NavBar */}
            
            <div className='acomodar-resultados-2'>
                {listatramitesdep}
            </div>

            <div className='sticky'>
                <h3 className='Titulos'> Tramites de Departamento</h3>
                <a className="btn-insertar" href="/agregartramite">Crear Tramite</a>
                <br />
                <hr></hr>

                <select id="select" className="btn-seleccion" aria-label="Default select example" >
                    {listatramites}
                </select>
                <br />
                <button className="btn btn-success" onClick={editarDepartamento}>Agregar Tramite Existente</button>
                <br /> 
                <hr/>
            </div>

            

            {/* <ul className="nav nav-tabs">
                <li className="tabs">
                    <a className="nav-link" href={`/editardepartamento/${idDEP}`}>Informacion Departamento</a>
                </li>
                <li className="tabs">
                    <a className="nav-link active" aria-current="page" href="#">Tramites</a>
                </li>
                <li className="tabs">
                    <a className="nav-link" href={`/editarempleadosdepartamento/${idDEP}`}>Empleados</a>
                </li>
            </ul> */}

            <div>
                <nav className="nav-tabs navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
                    <div className="container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                            <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        <a className="navbar-brand" href="/departamentos"> Departamentos</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href={`/editardepartamento/${idDEP}`}>Informacion Departamento</a>
                                </li>
                                <li className="nav-item">
                                    <a className="tabs" aria-current="page">Tramites</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={`/editarempleadosdepartamento/${idDEP}`}>Empleados</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

    )
}


export default Tramitesdepartamento