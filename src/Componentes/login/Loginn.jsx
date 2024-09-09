import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { Form, Input, Select, Button, message, Row, Col } from 'antd';  
import { UserOutlined, LockOutlined } from '@ant-design/icons';  
import backgroundImage from '../Imagenes/portada.jpg'; 

const { Option } = Select;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [perfilOptions, setPerfilOptions] = useState([]); 
  const [selectedPerfil, setSelectedPerfil] = useState(''); 

  const fetchPerfil = async (usuario) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/perfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario }),
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener el perfil');
      }
  
      const data = await response.json();
      const perfiles = Array.isArray(data) ? data : [data];
      
      if (perfiles.length === 1) {
        setSelectedPerfil(perfiles[0].id_perfil);
      }
  
      setPerfilOptions(perfiles);
    } catch (error) {
      console.error('Error al obtener el perfil: ', error.message);
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

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: username,
          cedula: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al validar las credenciales');
      }

      const data = await response.json();
      
      if (data.contraseña === password) {
        localStorage.setItem('userData', JSON.stringify(data));
        message.success('Inicio de sesión exitoso');
        navigate('/principal');
      } else {
        setError('Contraseña incorrecta. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      setError('Error de autenticación: ' + error.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Form
        name="login"
        layout="vertical"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
        onFinish={handleLogin}
      >
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Iniciar Sesión</h1>
        
        {error && (
          <div style={{
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '20px', 
            textAlign: 'center',
          }}>
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
            onChange={handleUsernameChange}  
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
            {Array.isArray(perfilOptions) && perfilOptions.length > 0 ? (
              perfilOptions.map((perfil) => (
                <Option key={perfil.id_perfil} value={perfil.id_perfil}>
                  {perfil.descripcion}
                </Option>
              ))
            ) : (
              <Option disabled>Cargando perfiles...</Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Iniciar Sesión
          </Button>
        </Form.Item>

        <Row justify="space-between">
          <Col>
            <Link to="/registro">
              <Button type="link">Registrar</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/forgot-password">
              <Button type="link">Olvidé mi contraseña</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Login;
