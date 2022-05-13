import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePass from './paginas/OlvidePass';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPass from './paginas/NuevoPass';
import {AuthProvider} from './context/AuthProvider';
import {PacientesProvider} from './context/PacientesProvider';
import RutaProtegida from './layout/RutaProtegida';
import AdministrarPacientes from './paginas/AdministrarPacientes';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPass from './paginas/CambiarPass';

function App() {

  //Las variables de entorno se acceden de la siguiente manera, y deben de empezar con VITE
  //console.log(import.meta.env.VITE_BACKEND_URL);

  return (

    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
                {/*index se utiliza para indicar a autlayout que tome el contenido del componente login*/}
                <Route index element={<Login />} />
                <Route path="registrar" element={<Registrar />} />
                <Route path="recuperar" element={<OlvidePass />} />
                <Route path="recuperar/:token" element={<NuevoPass />} />
                <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/admin" element={<RutaProtegida />}>
                <Route index element={<AdministrarPacientes />}/>
                <Route path="perfil" element={<EditarPerfil />}/>
                <Route path="cambiar-pass" element={<CambiarPass />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
