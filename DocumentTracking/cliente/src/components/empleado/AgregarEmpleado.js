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
            <div className='container'>
                <h1> CREAR UN EMPLEADO</h1>
                <div className='row'>
                    <h2 className='mt-4'> Crear nuevo empleado</h2>
                </div>

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
                        {/* 
        <div className='mb-3'>
            <label htmlFor='tramites' className='form-label'>Tramites</label>
            <input type="text" className='form-control' value = {tramites} onChange = {(e)=>{setTramites(e.target.value )}}></input>
        </div> */}
          
                    
                    <hr/>
        <button onClick={agregarEmpleados} className='btn btn-success'>Guardar empleado</button>

                    </div>
                </div>
            </div>
        </>

    )
}

export default AgregarEmpleados