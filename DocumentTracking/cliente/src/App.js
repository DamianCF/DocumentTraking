import logo from './logo.svg';
import './css/App.css';
import ListaUsuarios from './components/Login';
import {BrowserRouter,Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
          <Route path= '/' element = {<ListaUsuarios/>} exact ></Route>
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
