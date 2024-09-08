import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Componentes/login/Loginn';
import CrearCita from './Componentes/Principal/Crear_cita';
import Calendario from './Componentes/Principal/Calendario';
import Principal from './Componentes/Principal/Principal';
import Consultarcitas from './Componentes/Principal/Consultarcitas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/principal" element={<Principal />} />
        <Route path="/" element={<Login />} />
        <Route path="/crear-cita" element={<CrearCita />} />
        <Route path="/calendario" element={<Calendario />} /> 
        <Route path="/consultarCita" element={<Consultarcitas />} /> 
        <Route path="/Loginn" element={<Login />} /> 


      </Routes>
    </Router>
  );
}

export default App;
