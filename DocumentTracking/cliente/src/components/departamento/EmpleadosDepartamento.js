
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import EmpleadoIndividual from '../empleado/EmpleadoIndividual'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



function EmpleadosDepartamento() {


    var idDEP = '';
    const params = useParams()
    idDEP = params.idDepartamento;

    const navegar = useNavigate()

    var cont = 0;
    //Hooks

    // estan cargados con objects
    const [empleadosBD, setEmpleadosBD] = useState([]);
    const [dataEmpleadosDep, setdataEmpleadosDep] = useState([])

    //encargados de editar el departamento
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [estado, setEstado] = useState('A')
    const [empleadosDEP, setEmpleadosDEP] = useState([]);


    useEffect(() => {

        axios.post('/api/usuario/obtenerdatadepartamento', { idDepartamento: params.idDepartamento }).then(res => {
            const datadepartamento = res.data[0]
            setNombre(datadepartamento.nombre)
            setDescripcion(datadepartamento.descripcion)
            setCorreo(datadepartamento.correo)
            setTelefono(datadepartamento.telefono)
            setEmpleadosDEP(datadepartamento.empleados)
            var empleados1 = datadepartamento.empleados;

            if (cont < 1) {  // esto por que se duplica la lista puesto que el use efect se aplica 2 veces
                cont++;
                empleados1.map(empleado => {
                    let idEmpleado  = empleado;
                    axios.post('/api/usuario/obtenerdataempleado', { idEmpleado }).then(res => {
                        setdataEmpleadosDep(dataEmpleadosDep => dataEmpleadosDep.concat(res.data[0]));
                    })
                })
            }
        })

        axios.get('/api/usuario/obtenerempleados').then(res => {
            //console.log(res.data)
            setEmpleadosBD(res.data)
        }).catch(err => { console.log(err) }
        ) // min 1:39:38

    }, [])


    //mapear listaempleadosdep en objeto usuario
    const listaempleadosdep = dataEmpleadosDep.map(empleado => {
        return (
            <div>
                <EmpleadoIndividual empleado={empleado} />
            </div>
        )
    })


    const listaempleados = empleadosBD.map(empleado => {

        //console.log(empleado.idEmpleado);
        // console.log(empleadosDEP);
        
        if (undefined != empleadosDEP.find(element => element == empleado.idEmpleado)) {
            return <></>
        }
        else {

            return (
                <option value={empleado.idEmpleado}>{empleado.nombre}</option>
            )
         }
    })


    function editarDepartamento() {


        //console.log(document.getElementById("select").value)
        // setEmpleadosDEP( empleadosDEP => empleadosDEP.concat( document.getElementById("select").value) )
        empleadosDEP.push(document.getElementById("select").value)
        console.log(empleadosDEP)

        // Nuevo objeto para actualizar usuario
        const actualizardepartamento = {
            idDepartamento: idDEP,
            nombre: nombre,
            descripcion: descripcion,
            correo: correo,
            telefono: telefono,
            estado: estado,
            empleados: empleadosDEP
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
    }


    return (

        <div>
            <NavBar />
            <h3 className='Titulos'> Empleados de Departamento</h3>
            <div>
                <a className="btn-insertar" href="/agregarempleado">Crear Empleado</a>
                <br />
                <hr></hr>

                <select id="select" className="btn-seleccion" aria-label="Default select example" >
                    {listaempleados}
                </select>
                <br />
                <button className="btn btn-success" onClick={editarDepartamento}>Agregar Empleado Existente</button>
                <br />
            </div>
            

            {/* <ul className="nav nav-tabs">
                <li className="tabs">
                    <a className="nav-link" href={`/editardepartamento/${idDEP}`}>Informacion Departamento</a>
                </li>
                <li className="tabs">
                    <a className="nav-link" href={`/editartramitesdepartamento/${idDEP}`}>Tramites</a>
                </li>
                <li className="tabs">
                    <a className="nav-link active" aria-current="page" href="#">Empleados</a>
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
                                    <a className="nav-link" href={`/editartramitesdepartamento/${idDEP}`}>Tramites</a>
                                </li>
                                <li className="nav-item">
                                    <a className="tabs" aria-current="page">Empleados</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>


            <div className='acomodar'>
                {listaempleadosdep}
            </div>

        </div>

    )
}


export default EmpleadosDepartamento