import NavBar from '../NavBar';
import EmpleadoIndividual from './EmpleadoIndividual';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ListarEmpleados() {
    const[dataEmpleado,setdataEmpleados] = useState([])

    useEffect( () => {
            axios.get('api/usuario/obtenerempleados').then(res => {
                console.log(res.data)
                setdataEmpleados(res.data)
            }).catch( err =>{console.log(err)}
            ) 
    },[])

    const ListadoEmpleados = dataEmpleado.map(empleado=>{
        return(
            <div>
                <EmpleadoIndividual empleado={empleado}/>
            </div>
        )
    })
    return (

        <div>
            <NavBar/>

            <div>
                <h1 class="Titulos">
                    Empleados
                </h1>
                <a className="nav-link" href="/agregarempleados">Agregar empleados</a>
                {ListadoEmpleados}
            </div>

            {/* <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                    The current link item
                </a>
                <a href="#" class="list-group-item list-group-item-action">A second link item</a>
                <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
                <a class="list-group-item list-group-item-action disabled">A disabled link item</a>
            </div> */}
        </div>

    )
}


export default ListarEmpleados