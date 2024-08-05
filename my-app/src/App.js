import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Login from "./components/login/login"
import Registro from "./components/registro/registro"
import Home from "./components/home/home"
import CasiReg from './components/yacasireg/yacasireg'
import Emergencia from './components/emergencia/emergencia'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
      </Routes>
    </Router>
  );
}
export default App;
