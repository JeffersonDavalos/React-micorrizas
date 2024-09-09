import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Componentes/login/Loginn';
import CrearCita from './Componentes/Principal/Crear_cita';
import Calendario from './Componentes/Principal/Calendario';
import Principal from './Componentes/Principal/Principal';
import Consultarcitas from './Componentes/Principal/Consultarcitas';
import PrivateRoute from './Componentes/login/PrivateRoute';
import ActualizarUsuario from './Componentes/Principal/ActualizarUsuario';
import Reporte_usuario from './Componentes/Principal/Reporte_usuario';
import Register from './Componentes/login/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} /> 
        <Route path="/principal" element={<PrivateRoute element={Principal} />} />
        <Route path="/crear-cita" element={<PrivateRoute element={CrearCita} />} />
        <Route path="/calendario" element={<PrivateRoute element={Calendario} />} />
        <Route path="/consultarCita" element={<PrivateRoute element={Consultarcitas} />} />
        <Route path="/actualizar-usuario" element={<ActualizarUsuario />} /> 
        <Route path="/usuario" element={<Reporte_usuario />} /> 

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
