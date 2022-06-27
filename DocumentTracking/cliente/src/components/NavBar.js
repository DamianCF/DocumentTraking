import React from 'react'


function NavBar() {
    return (

        <div>
            <nav className="nav-tabs navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
                <div className="container">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-house-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                    <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                </svg>
                    <a className="navbar-brand" href="/principal"> Inicio</a>
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
                            <li className="nav-item">
                                <a className="nav-link" href="casos">Casos</a>
                            </li>
                        </ul>
                       
                    </div>
                </div>
            </nav>
            <footer > Proyecto final ® JRD </footer>
        </div>
    )
}


export default NavBar