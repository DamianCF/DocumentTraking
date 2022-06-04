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


function Principal() {
    return (

        <div>
            <NavBar/>
            <div>
                <h1>
                    Inicio Empresa
                </h1>
            </div>


        </div>
    )
}


export default Principal