import React, { useState } from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../NavBar';

function AgregarEmpleados() {

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


    function agregarEmpleados() {
        var empleado = {

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
            idEmpleado: uniquid()
         
          

        }

        console.log(empleado)

        axios.post('/api/usuario/agregarempleado', empleado)
            .then(res => {
                //alert(res.data)
                Swal.fire('Felicidades', 'El empleado se creo con exito')
            })
            .then(err => { console.log(err) })
    }


    return (

        <>
            <NavBar />
            <h1 className='Titulos'> CREAR UN EMPLEADO</h1>
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
                        <button onClick={agregarEmpleados} className='btn btn-success'>Guardar empleado</button>

                        </div>
                    </div>
                </table>
            </center>
        </>
    )
}

export default AgregarEmpleados