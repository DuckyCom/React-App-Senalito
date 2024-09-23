import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Login from "./components/login/login"
import Registro from "./components/registro/registro"
import Home from "./components/home/home"
import CasiReg from './components/yacasireg/yacasireg'
import Emergencia from './components/emergencia/emergencia'
import Interprete from './components/interpretacion/interpretacion'
import NotFound from './components/notfound/notfound'
import Diccionario from './components/diccionario/diccionario'
import CatFam from './components/diccionario/catfam'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/interprete" element={<Interprete />} />
        <Route path="/emergencia" element={<Emergencia />} />
        <Route path="/diccionario" element={<Diccionario />} />
        <Route path="/catfam" element={<CatFam />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
