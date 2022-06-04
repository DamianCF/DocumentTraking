import logo from './logo.svg';
import './css/App.css';
import ListaUsuarios from './components/Login';
import Principal from './components/Principal';

import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Login from './components/Login';

function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
          <Route path= '/' element = {<Principal/>} exact ></Route>
          <Route path= '/principal' element = {<Principal/>} exact ></Route>

      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
