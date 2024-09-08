import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Simulación de la autenticación (esto debería reemplazarse con tu lógica real)
const isAuthenticated = () => {
  return !!localStorage.getItem('username');  // Devuelve true si hay un usuario autenticado
};

// Componente de ruta privada
const PrivateRoute = ({ element: Component, ...rest }) => {
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
