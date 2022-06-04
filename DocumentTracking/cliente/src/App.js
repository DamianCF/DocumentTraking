import logo from './logo.svg';
import './css/App.css';
import ListaUsuarios from './components/Login';
import Principal from './components/Principal';

import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import ListarDepartamentos from './components/ListarDepartamentos';
import NavBar from './components/NavBar';
import ListarTramites from './components/ListarTramites';
import ListarDocumentos from './components/ListarDocumentos';
import ListarEmpleados from './components/ListarEmpleados';

function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
          <Route path= '/' element = {<Principal/>} exact ></Route>
          <Route path= '/principal' element = {<Principal/>} exact ></Route>
          <Route path='/departamentos' element={<ListarDepartamentos />} exact></Route>
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
