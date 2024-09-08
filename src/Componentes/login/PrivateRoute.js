import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const userData = localStorage.getItem('userData');
  
  if (userData) {
    const user = JSON.parse(userData);  // Deserializar la información de localStorage
    console.log('respuesta ',user);
    console.log('Usuario:', user.usuario);
    console.log('Perfil:', user.id_perfil);
    
    const isAuthenticated = user.usuario && user.contraseña && user.id_perfil;
    return isAuthenticated ? <Element /> : <Navigate to="/" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
