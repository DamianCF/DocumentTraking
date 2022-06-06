import React, {useState} from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../NavBar';

function AgregarDepartamento(){

    //Hooks 
    const[nombre,setNombre] = useState('')
    const[correo,setEmail]= useState('')
    const[telefono,setTelefono]= useState('')


    function agregarDepartamento(){
        var departamento = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            idUsuario: uniquid()
        }

        console.log(departamento)

        axios.post('/api/usuario/agregardepartamento', departamento)
        .then(res =>{
            //alert(res.data)
            Swal.fire('Felicidades', 'El departamento se creo con exito')
        })
        .then(err => {console.log(err)})
    }

    return(
        <div className='container'>
            <NavBar/>

            <div className='row'>
                    <h2 className='mt-4'> Crear nuevo departamento</h2>
            </div>

            <div className='row'>
                <div className='col-sm-6 offset-3'>

                    <div className='mb-3'>
                        <label htmlFor='nombre' className='form-label'>Nombre</label>
                        <input type="text" className='form-control'  value = {nombre} onChange = {(e)=>{setNombre(e.target.value )}}></input>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='correo' className='form-label'>Email</label>
                        <input type="correo" className='form-control'  value = {correo} onChange = {(e)=>{setEmail(e.target.value )}}></input>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='telefono' className='form-label'>Telefono</label>
                        <input type="text" className='form-control' value = {telefono} onChange = {(e)=>{setTelefono(e.target.value )}}></input>
                    </div>

                    <button onClick={agregarDepartamento} className='btn btn-success'>Guardar Departamento</button>

                </div>
            </div>
        </div>
    )
}

export default AgregarDepartamento