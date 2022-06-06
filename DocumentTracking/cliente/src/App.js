import './css/App.css';
import Principal from './components/Principal';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import ListarDepartamentos from './components/departamento/ListarDepartamentos';
import ListarTramites from './components/tramite/ListarTramites';
import ListarDocumentos from './components/documento/ListarDocumentos';
import ListarEmpleados from './components/empleado/ListarEmpleados';
import EditarDepartamento from './components/departamento/EditarDepartamento';
import AgregarDepartamento from './components/departamento/AgregarDepartamento';
import Tramitesdepartamento from './components/departamento/TramitesDepartamento';
import EmpleadosDepartamento from './components/departamento/EmpleadosDepartamento';


function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
          <Route path= '/' element = {<Principal/>} exact ></Route>
          <Route path= '/principal' element = {<Principal/>} exact ></Route>
          <Route path='/departamentos' element={<ListarDepartamentos />} exact></Route>
          <Route path='/agregardepartamento' element={<AgregarDepartamento/>} exact></Route>
          <Route path='/editardepartamento/:idDepartamento' element={<EditarDepartamento />} exact></Route>
          <Route path='/editartramitesdepartamento/:idDepartamento' element={<Tramitesdepartamento />} exact></Route>
          <Route path='/editarempleadosdepartamento/:idDepartamento' element={<EmpleadosDepartamento />} exact></Route>
          <Route path='/tramites' element={<ListarTramites />} exact></Route>
          <Route path='/documentos' element={<ListarDocumentos />} exact></Route>
          <Route path='/empleados' element={<ListarEmpleados />} exact></Route>

          {/* <Route path='/editarusuario/:idusuario' element={<EditarUsuario />} exact></Route>
          <Route path='/agregardepartamento' element={<AgregarDepartamento />} exact></Route> */}
      
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
