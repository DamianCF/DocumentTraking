import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../NavBar'
import Swal from 'sweetalert2'
var idDEP = '';

function EditarEmpleado() {

    const params = useParams()


    //Hooks 
    const [nombre, setNombre] = useState('')
    const [pApellido, setPApellido] = useState('')
    const [sApellido , setSApellido] = useState('')
    const [cedula, setCedula]= useState('')
    const [edad, setEdad]= useState('')
    const [sexo, setSexo]= useState('')
    const [desc_labor, setDesc_labor]=useState('')
    const [rol, setRol]  = useState('')
    const [telefono, setTelefono]  = useState('')
    const [correo, setCorreo]= useState('')
    const [clave, setClave]= useState('')


    // para volver atras a pagina principal
    const navegar = useNavigate()


    useEffect(() => {
        axios.post('/api/usuario/obtenerdataempleado', { idEmpleado: params.idEmpleado }).then(res => {
            //console.log(res.data[0])
            const dataempleado = res.data[0]
            setNombre(dataempleado.nombre)
            setPApellido(dataempleado.pApellido)
            setCedula(dataempleado.cedula)
            setSApellido(dataempleado.sApellido)
            setSexo(dataempleado.sexo)
            setEdad(dataempleado.edad)
            setDesc_labor(dataempleado.desc_labor)
            setClave(dataempleado.clave)
            setCorreo(dataempleado.correo)
            setRol(dataempleado.rol)
            setTelefono(dataempleado.telefono)
            idDEP = params.idEmpleado;
        })
    }, [])

    //funcion que actualiza

    function editarEmpleados() {
        // Nuevo objeto para actualizar usuario
        const actualizardepartamento = {
            idEmpleado: params.idEmpleado,
            nombre : nombre,
            pApellido: pApellido,
            sApellido: sApellido,
            cedula: cedula,
            edad:edad,
            sexo: sexo,
            desc_labor: desc_labor,
            rol: rol,
            telefono: telefono,
            correo : correo,
            clave : clave,
        }

        // hacer peticion usando axios
        axios.post('/api/usuario/actualizardepartamento', actualizardepartamento)
            .then(res => {
                // console.log("exito")
                // console.log(res.data)
                // alert(res.data)
                // navegar('/')
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Departamento Editado',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
            .then(err => { 

                if(err){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se ha podido actualizar el departamento!',
                      })
                }
                // console.log("fallo")
                // console.log(err)
             })
    }


    return (

        <div>
            <NavBar />

            <h3>Departamento</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Infomacion Departamento</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={`/editartramitesdepartamento/${idDEP}`}>Tramites</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={`/editarempleadosdepartamento/${idDEP}`}>Empleados</a>
                </li>
            </ul>


            <div className='container'>

            <div className='row'>
                    <div className='col-sm-6 offset-3'>


                        <div className='mb-3'>
                            <label htmlFor='nombre' className='form-label'>Nombre</label>
                            <input type="text" className='form-control' value={nombre} onChange={(e) => { setNombre(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='pApellido' className='form-label'>Primer Apellido</label>
                            <input type="text" className='form-control' value={pApellido} onChange={(e) => { setPApellido(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='sApellido' className='form-label'>Segundo Apellido</label>
                            <input type="text" className='form-control' value={sApellido} onChange={(e) => { setSApellido(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='cedula' className='form-label'>Cedula</label>
                            <input type="text" className='form-control' value={cedula} onChange={(e) => { setCedula(e.target.value) }}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='edad' className='form-label'>Edad</label>
                            <input type="number" className='form-control' value={edad} onChange={(e) => { setEdad(e.target.value) }}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='sexo' className='form-label'>Sexo</label>
                            <input type="text" className='form-control' value={sexo} onChange={(e) => { setSexo(e.target.value) }}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='desc_labor' className='form-label'>Descripcion de la labor </label>
                            <input type="text" className='form-control' value={desc_labor} onChange={(e) => { setDesc_labor(e.target.value) }}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='rol' className='form-label'>Rol </label>
                            <input type="text" className='form-control' value={rol} onChange={(e) => { setRol(e.target.value) }}></input>
                        </div>
                      

                        <div className='mb-3'>
                            <label htmlFor='telefono' className='form-label'>Telefono </label>
                            <input type="text" className='form-control' value={telefono} onChange={(e) => { setTelefono(e.target.value) }}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='correo' className='form-label'>Correo </label>
                            <input type="text" className='form-control' value={correo} onChange={(e) => { setCorreo(e.target.value) }}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='clave' className='form-label'>Clave </label>
                            <input type="text" className='form-control' value={clave} onChange={(e) => { setClave(e.target.value) }}></input>
                        </div>

                        <button onClick={editarEmpleados} className='btn btn-success'>Editar Empleados </button>
                        &nbsp;
                        <button className="btn btn-secondary">Cancelar</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarEmpleado