import React, { useState } from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'
import AgregarDepartamento from './AgregarDepartamento';
import AgregarUsuario from './AgregarUsuario';
import EditarUsuario from './EditarUsuario';
import ListaUsuarios from './ListaUsuarios';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './NavBar';


function ListarDepartamentos() {
    return (

        <div>
            <NavBar/>

            <div>
                <h1>
                    Departamentos
                </h1>
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


export default ListarDepartamentos