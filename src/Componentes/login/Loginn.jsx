import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  // Añadir y remover la clase login-page al body
  useEffect(() => {
    document.body.classList.add('login-page');
    
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleLogin = () => {
    // Hacer una solicitud POST a la API
    fetch('http://127.0.0.1:8000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario: username, // O cédula si tu API requiere eso
        cedula: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al validar las credenciales');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos de la API:', data); // Aquí se loguea la data que llega desde la API
        // Comparar la contraseña ingresada con la devuelta por la API
        if (data.contraseña === password) {
          if (rememberMe) {
            // Guardar las credenciales si "Recordarme" está marcado
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
          } else {
            clearStoredCredentials();
          }

          // Redirigir al usuario a la página principal
          navigate('/principal');
        } else {
          setError('Contraseña incorrecta. Por favor, intenta de nuevo.');
        }
      })
      .catch((error) => {
        setError('Error de autenticación: ' + error.message);
      });
  };

  const clearStoredCredentials = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, [navigate]);

  return (
    <div className='wrapper'>
      <form>
        <h1>Login</h1>
        {/* Mostrar mensaje de error solo si existe */}
        {error && <div className="error-message">{error}</div>}
        <div className="input-box">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>
        <div className='remember-forgot'>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Recordarme
          </label>
          <a href="#" onClick={clearStoredCredentials}>¿Olvidaste tu contraseña?</a>
        </div>
        <button type="button" onClick={handleLogin}>Ingresar</button>
        <div className='register-link'>
          <p> ¿No tienes cuenta? <a href="#">Register</a> </p> 
        </div>
      </form>
    </div>
  );
}

export default Login;
