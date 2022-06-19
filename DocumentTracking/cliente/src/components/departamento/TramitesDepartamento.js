
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

    //FALTA QUE FILTRE POR DEPARTAMENTO EN ESPECIFICO
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
                        setdataTramitesDep(dataTramitesDep => dataTramitesDep.concat(res.data[0]));
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
                <TramiteIndividual tramite={tramite} />
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

            <NavBar />
            <br />
            <br />
            <br />
            <h3> Tramites de Departamento</h3>

            <div >
                <br />
                <select id="select" className="form-select" aria-label="Default select example" >
                    {listatramites}
                </select>
                <br />
                <button className="btn btn-success" onClick={editarDepartamento}>Agregar Tramite Existente</button>
                <br />
                <a className="nav-link" href="/agregartramite">Crear Tramite</a>
            </div>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link" href={`/editardepartamento/${idDEP}`}>Informacion Departamento</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Tramites</a>
                </li>
                <li className="nav-item">
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