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
import AgregarDocumento from './components/documento/AgregarDocumentos'; 
import AgregarDocumentos from './components/documento/AgregarDocumentos';
import EditarDocumento from './components/documento/EditarDocumento';


//Casos
import ListarCasos from './components/caso/ListarCasos';
import AgregarCaso from './components/caso/AgregarCaso';
import EditarCaso from './components/caso/EditarCaso';
//Login
import Login from './components/Login';
import EditarTramite from './components/tramite/EditarTramite';
import Casostramite from './components/tramite/CasosTramite';
import DocumentosTramite from './components/tramite/DocumentosTramite';
import Agregarempleados from './components/empleado/AgregarEmpleado';
import EditarEmpleado from './components/empleado/EditarEmpleado';



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
          <Route path='/agregardocumentos' element={<AgregarDocumentos />} exact></Route>
          <Route path= '/editarDocumento/:idDocumento' element={<EditarDocumento/>} exact></Route>


          {/*Empleados*/}
          <Route path='/empleados' element={<ListarEmpleados />} exact></Route>
          <Route path='/agregarEmpleados' element={<Agregarempleados />} exact></Route>
          <Route path ='/editarempleado/:idEmpleado' element = {<EditarEmpleado/>} exact></Route>

          {/*Casos*/}
          <Route path='/casos' element={<ListarCasos />} exact></Route>
          <Route path='/agregarCaso' element={<AgregarCaso />} exact></Route>
          <Route path='editarCaso/:idCaso'element={<EditarCaso/>} exact></Route>
          
          {/*Tramites*/}
          <Route path='/agregartramite' element={<AgregarTramite/>} exact></Route>
          <Route path='/editartramite/:idTramite' element={<EditarTramite />} exact></Route>
          <Route path='/editarcasostramite/:idTramite' element={<Casostramite />} exact></Route>
          <Route path='/editardocumentostramite/:idTramite' element={<DocumentosTramite />} exact></Route>


          {/* <Route path='/editarCaso' element={<EditarCaso />} exact></Route> */}
      </Routes>     
    </BrowserRouter>
    </div>
  );
}

export default App;

// {/* <Route path='/editarusuario/:idusuario' element={<EditarUsuario />} exact></Route>
// <Route path='/agregardepartamento' element={<AgregarDepartamento />} exact></Route> */}