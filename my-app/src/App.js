import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/login/login";
import Registro from "./components/registro/registro";
import Home from "./components/home/home";
import Emergencia from './components/emergencia/emergencia';
import Interprete from './components/interpretacion/interpretacion';
import NotFound from './components/notfound/notfound';
import Diccionario from './components/diccionario/diccionario';
import CatFam from './components/diccionario/catfam';
//no se porque aparece con un error (el error es por el uso de mayusculas y minusculas pero está bien escrito), pero funciona que es lo importante
import { AuthProvider, useAuth } from './components/AuthContext/AuthContext';

// Componente de ruta protegida
function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Registro/>;
  }

  return element;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route exact path="*" element={<NotFound />} />

          {/* Rutas protegidas */}
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/interprete" element={<ProtectedRoute element={<Interprete />} />} />
          <Route path="/emergencia" element={<ProtectedRoute element={<Emergencia />} />} />
          <Route path="/diccionario" element={<ProtectedRoute element={<Diccionario />} />} />
          <Route path="/catfam" element={<ProtectedRoute element={<CatFam />} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
