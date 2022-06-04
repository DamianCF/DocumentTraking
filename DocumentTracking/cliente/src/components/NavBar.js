import React, { useState } from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'
import AgregarDepartamento from './AgregarDepartamento';
import AgregarUsuario from './AgregarUsuario';
import EditarUsuario from './EditarUsuario';
import ListaUsuarios from './ListaUsuarios';

import { BrowserRouter, Routes, Route } from 'react-router-dom'


function NavBar() {
    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/"> Inicio</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="departamentos">Departamentos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="tramites">Tramites</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="documentos">Documentos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="empleados">Empleados</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default NavBar