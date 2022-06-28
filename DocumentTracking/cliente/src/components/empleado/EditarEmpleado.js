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

            <h3 className='Titulos'>Empleado</h3>
            {/* <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Infomacion Departamento</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={`/editartramitesdepartamento/${idDEP}`}>Tramites</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={`/editarempleadosdepartamento/${idDEP}`}>Empleados</a>
                </li>
            </ul> */}

            <center>
                <table>
                    <div className='boxEmpleado'>
                        <div>
                            <h2>Informacion basica</h2>
                            <tr >
                                    <input type="text" className='tablaFila' placeholder="Nombre" value={nombre} onChange={(e) => { setNombre(e.target.value) }}></input> 
                                    <input type="text" className='tablaFila' placeholder="Primer apellido" value={pApellido} onChange={(e) => { setPApellido(e.target.value) }}></input>
                                    <input type="text" className='tablaFila'  placeholder="Segundo apellido" value={sApellido} onChange={(e) => { setSApellido(e.target.value) }}></input>
                            </tr>
                                
                            <h2>Datos personales</h2>
                            <tr>
                                <input type="text" className='tablaFila' placeholder='Cedula' value={cedula} onChange={(e) => { setCedula(e.target.value) }}></input>
                                <input type="number" className='tablaFila' placeholder='Edad' value={edad} onChange={(e) => { setEdad(e.target.value) }}></input>
                                <input type="text" className='tablaFila' placeholder='Sexo' value={sexo} onChange={(e) => { setSexo(e.target.value) }}></input>
                            </tr>
                            
                            <h2>Contacto</h2>
                            <tr>
                                
                                <input type="text" className='tablaFila' placeholder='Telefono' value={telefono} onChange={(e) => { setTelefono(e.target.value) }}></input>

                                <input type="text" className='tablaFila' placeholder='Correo' value={correo} onChange={(e) => { setCorreo(e.target.value) }}></input>

                                
                            </tr>

                            <h2>Datos administrativos</h2>
                            <tr>
                            <input type="text" className='tablaFila' placeholder='Descripcion labor' value={desc_labor} onChange={(e) => { setDesc_labor(e.target.value) }}></input>
                                <input type="text" className='tablaFila' placeholder='Rol' value={rol} onChange={(e) => { setRol(e.target.value) }}></input>
                            </tr>

                            <h2>Datos inicio de sesion</h2>
                            <tr>
                                <input type="text" className='tablaFila' placeholder='Clave' value={clave} onChange={(e) => { setClave(e.target.value) }}></input>
                            </tr>
                            
                        <hr/>
                        <button onClick={editarEmpleados} className='btn btn-success'>Guardar empleado</button><br/><br/>
                        <button className="btn btn-secondary"  onClick={()=>navegar("/empleados")}>Cancelar</button>

                        </div>
                    </div>
                </table>
            </center>
        </div>
    )
}

export default EditarEmpleado