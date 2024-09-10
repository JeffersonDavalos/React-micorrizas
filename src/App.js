import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Componentes/login/Loginn';
import Principal from './Componentes/Principal/Principal';
import PrivateRoute from './Componentes/login/PrivateRoute';
import ActualizarUsuario from './Componentes/Principal/ActualizarUsuario';
import Reporte_usuario from './Componentes/Principal/Reporte_usuario';
import Register from './Componentes/login/Register';
import Modelo from './Componentes/Principal/Modelo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} /> 
        <Route path="/principal" element={<PrivateRoute element={Principal} />} />
        <Route path="/actualizar-usuario" element={<ActualizarUsuario />} /> 
        <Route path="/usuario" element={<Reporte_usuario />} /> 
        <Route path="/modelo-micorrizas" element={<Modelo />} /> 
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
