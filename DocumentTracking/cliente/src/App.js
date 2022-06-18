import './css/App.css';
import Principal from './components/Principal';
import {BrowserRouter,Routes, Route} from 'react-router-dom'


//Departamentos
import EditarDepartamento from './components/departamento/EditarDepartamento';
import AgregarDepartamento from './components/departamento/AgregarDepartamento';
import Tramitesdepartamento from './components/departamento/TramitesDepartamento';
import EmpleadosDepartamento from './components/departamento/EmpleadosDepartamento';
import ListarDepartamentos from './components/departamento/ListarDepartamentos';

//Tramites
import ListarTramites from './components/tramite/ListarTramites';
import AgregarTramite from './components/tramite/AgregarTramite';

//Documentos
import ListarDocumentos from './components/documento/ListarDocumentos';
import ListarEmpleados from './components/empleado/ListarEmpleados';

//Casos
import ListarCasos from './components/caso/ListarCasos';
import AgregarCaso from './components/caso/AgregarCaso';
import EditarCaso from './components/caso/EditarCaso';
//Login
import Login from './components/Login';


function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
          <Route path= '/' element = {<Login/>} exact ></Route>
          <Route path= '/principal' element = {<Principal/>} exact ></Route>

          {/*Departamentos*/}
          <Route path='/departamentos' element={<ListarDepartamentos />} exact></Route>
          <Route path='/agregardepartamento' element={<AgregarDepartamento/>} exact></Route>
          <Route path='/editardepartamento/:idDepartamento' element={<EditarDepartamento />} exact></Route>
          <Route path='/editartramitesdepartamento/:idDepartamento' element={<Tramitesdepartamento />} exact></Route>
          <Route path='/editarempleadosdepartamento/:idDepartamento' element={<EmpleadosDepartamento />} exact></Route>

          {/*Departamentos*/}
          <Route path='/tramites' element={<ListarTramites />} exact></Route>

          {/*Documentos*/}
          <Route path='/documentos' element={<ListarDocumentos />} exact></Route>

          {/*Empleados*/}
          <Route path='/empleados' element={<ListarEmpleados />} exact></Route>

          {/*Casos*/}
          <Route path='/casos' element={<ListarCasos />} exact></Route>
          <Route path='/agregarCaso' element={<AgregarCaso />} exact></Route>
          <Route path='editarCaso/:idCaso'element={<EditarCaso/>} exact></Route>
          
          {/*Tramites*/}
          <Route path='/agregartramite' element={<AgregarTramite/>} exact></Route>


          {/* <Route path='/editarCaso' element={<EditarCaso />} exact></Route> */}
      </Routes>     
    </BrowserRouter>
    </div>
  );
}

export default App;

// {/* <Route path='/editarusuario/:idusuario' element={<EditarUsuario />} exact></Route>
// <Route path='/agregardepartamento' element={<AgregarDepartamento />} exact></Route> */}