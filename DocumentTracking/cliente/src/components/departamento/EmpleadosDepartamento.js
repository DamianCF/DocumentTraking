
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
            <br />
            <br />
            <br />
            <h3> Empleados de Departamento</h3>
            
            <div >
                <br />
                <select id="select" className="form-select" aria-label="Default select example" >
                    {listaempleados}
                </select>
                <br />
                <button className="btn btn-success" onClick={editarDepartamento}>Agregar Empleado Existente</button>
                <br />
                <a className="nav-link" href="/agregarempleado">Crear Empleado</a>
            </div>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    {/* <a className="nav-link" href="#">Informacion Departamento</a> */}
                    <a className="nav-link" href={`/editardepartamento/${idDEP}`}>Informacion Departamento</a>
                </li>
                <li className="nav-item">
                    {/* <a className="nav-link" href="/">Empleados</a> */}
                    <a className="nav-link" href={`/editarempleadosdepartamento/${idDEP}`}>Empleados</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Empleados</a>
                </li>
            </ul>


            <div>
                {listaempleadosdep}
            </div>

        </div>

    )
}


export default EmpleadosDepartamento