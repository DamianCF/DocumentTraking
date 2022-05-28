import logo from './logo.svg';
import './App.css';
import ListaUsuarios from './ListaUsuarios';
import AgregarUsuario from './AgregarUsuario';
import EditarUsuario from './EditarUsuario';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import AgregarDepartamento from './AgregarDepartamento';

function App() {
  return (
    <div className="App">
          <nav className ="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/"> Crud Mern Stack</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="agregarusuario">Agregar Usuario</a>
                </li>
                
                <li className="nav-item">
                  <a className="nav-link" href="agregardepartamento">Agregar Departamento</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

    <BrowserRouter>
      <Routes>
          <Route path= '/' element = {<ListaUsuarios/>} exact ></Route>
          <Route path= '/agregarusuario' element = {<AgregarUsuario/>} exact></Route>
          <Route path= '/editarusuario/:idusuario' element = {<EditarUsuario/>} exact></Route>
          <Route path= '/agregardepartamento' element = {<AgregarDepartamento/>} exact></Route>
      </Routes>

    </BrowserRouter>

    </div>
  );
}

export default App;
