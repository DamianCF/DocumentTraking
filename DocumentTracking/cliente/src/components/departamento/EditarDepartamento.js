import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import uniquid from 'uniquid'
import NavBar from '../NavBar'
import NavBarDep from './NavBarDep'


function EditarDepartamento() {

    const params = useParams()


    //Hooks 
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')

    // para volver atras a pagina principal
    const navegar = useNavigate()


    useEffect(() => {
        axios.post('/api/usuario/obtenerdatadepartamento', { idDepartamento: params.idDepartamento }).then(res => {
            console.log(res.data[0])
            const datadepartamento = res.data[0]
            setNombre(datadepartamento.nombre)
            setDescripcion(datadepartamento.descripcion)
            setCorreo(datadepartamento.correo)
            setTelefono(datadepartamento.telefono)

        })
    }, [])

    //funcion que actualiza

    function editarUsuario() {
        // Nuevo objeto para actualizar usuario
        const actualizarusuario = {
            nombre: nombre,
            descripcion: descripcion,
            correo: correo,
            telefono: telefono,
            idusuario: params.idusuario
        }

        // hacer peticion usando axios
        axios.post('/api/usuario/actualizausuario', actualizarusuario)
            .then(res => {
                console.log(res.data)
                alert(res.data)
                navegar('/')
            })
            .then(err => { console.log(err) })
    }


    return (
        <div className='container'>
       <NavBar/> 
        <NavBarDep/>

            {/* <div className='row'>
                <h4 className='mt-4'> Editar depatamento</h4>
            </div> */}

            <div className='row'>
                <div className='col-sm-6 offset-3'>

                    <div className='mb-3'>
                        <label htmlFor='nombre' className='form-label'>Nombre</label>
                        <input type="text" className='form-control' value={nombre} onChange={(e) => { setNombre(e.target.value) }}></input>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='descripcion' className='form-label'>Descripcion</label>
                        <input type="text" className='form-control' value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }}></input>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='correo' className='form-label'>Correo</label>
                        <input type="correo" className='form-control' value={correo} onChange={(e) => { setCorreo(e.target.value) }}></input>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='telefono' className='form-label'>Telefono</label>
                        <input type="text" className='form-control' value={telefono} onChange={(e) => { setTelefono(e.target.value) }}></input>
                    </div>

                    <button onClick={editarUsuario} className='btn btn-success'>Editar Departamento</button>
                    <button  className="btn btn-secondary">Cancelar</button>

                </div>
            </div>
        </div>
    )
}

export default EditarDepartamento