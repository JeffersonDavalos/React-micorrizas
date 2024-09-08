import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, Checkbox, message } from 'antd';  // Importamos componentes de Ant Design
import { UserOutlined, LockOutlined } from '@ant-design/icons';  // Iconos de Ant Design

const { Option } = Select;  // Para el combo de perfil

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [perfilOptions, setPerfilOptions] = useState([]); // Estado para almacenar las opciones de perfil
  const [selectedPerfil, setSelectedPerfil] = useState(''); // Estado para el perfil seleccionado

  // Función para manejar las llamadas a la API
  const fetchPerfil = async (usuario) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/perfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario }), // Enviamos solo el usuario
      });

      if (!response.ok) {
        throw new Error('Error al obtener el perfil');
      }

      const data = await response.json();
      console.log(data);

      if (data && data.length === 1) {
        setSelectedPerfil(data[0].id_perfil);  // Seleccionamos el perfil automáticamente
      }

      setPerfilOptions([data]);  // Como el objeto es único, lo envuelvo en un array para mapearlo más adelante
    } catch (error) {
      console.error('Error al obtener el perfil: ', error.message);  // Solo loguea el error en la consola
    }
  };

  useEffect(() => {
    if (username) {
      fetchPerfil(username);
    }
  }, [username]); 

  const handleUsernameChange = (e) => {
    const inputValue = e.target.value.toUpperCase(); 
    const cleanedValue = inputValue.replace(/[0-9]/g, ''); 
    setUsername(cleanedValue);
  };

  const handleLogin = () => {
    fetch('http://127.0.0.1:8000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario: username,
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
        if (data.contraseña === password) {
          if (rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
          } else {
            clearStoredCredentials();
          }
          message.success('Inicio de sesión exitoso');
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Form
        name="login"
        layout="vertical"
        style={{ width: 400, padding: 40, backgroundColor: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
        onFinish={handleLogin}
      >
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Iniciar Sesión</h1>
        
        {error && (
          <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <Form.Item
          label="Usuario"
          name="username"
          rules={[{ required: true, message: 'Por favor ingresa tu usuario!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            value={username}
            onChange={handleUsernameChange}  // Usamos la función que transforma el texto a mayúsculas y elimina números
            placeholder="Ingresa tu usuario"
          />
        </Form.Item>
        
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </Form.Item>

        <Form.Item
          label="Perfil"
          name="perfil"
          rules={[{ required: true, message: 'Por favor selecciona un perfil!' }]}
        >
          <Select
            value={selectedPerfil}
            onChange={(value) => setSelectedPerfil(value)}
            placeholder="Selecciona un perfil"
          >
            {perfilOptions.map((perfil) => (
              <Option key={perfil.id_perfil} value={perfil.id_perfil}>
                {perfil.descripcion}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={rememberMe}
            onChange={handleRememberMeChange}
          >
            Recordarme
          </Checkbox>
          <a href="#" style={{ float: 'right' }} onClick={clearStoredCredentials}>
            Olvidé mi contraseña
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
