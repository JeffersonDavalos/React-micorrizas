import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'; 
import backgroundImage from '../Imagenes/register.jpg';

const Register = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Formulario enviado:', values);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/registrarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Respuesta de la API:', data);
        setModalInfo({
          title: 'Registro Exitoso',
          content: '¡El registro fue exitoso!',
          icon: <CheckCircleOutlined style={{ color: 'green', fontSize: '100px' }} />, 
          onOk: () => navigate('/'),  // Redirige al login cuando el registro es exitoso
        });
      } else {
        setModalInfo({
          title: 'Error en el Registro',
          content: 'El usuario ya está registrado.',
          icon: <ExclamationCircleOutlined style={{ color: 'red', fontSize: '100px' }} />, 
        });
      }

      setIsModalVisible(true);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      message.error('Hubo un problema al registrar el usuario');
    }
  };

  const handleTextInput = (e) => {
    const char = String.fromCharCode(e.keyCode || e.which);
    const pattern = /^[a-zA-Z\s]*$/; 
    if (!pattern.test(char)) {
      e.preventDefault();
    }
  };

  const handleChangeToUpper = (fieldName, e) => {
    const value = e.target.value.toUpperCase();
    form.setFieldsValue({ [fieldName]: value });
  };

  const handleNumberInput = (e) => {
    const char = String.fromCharCode(e.keyCode || e.which);
    const pattern = /^[0-9]*$/; 
    if (!pattern.test(char)) {
      e.preventDefault();
    }
  };

  return (
    <Row
      style={{
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Col
        xs={24}
        sm={18}
        md={12}
        lg={8}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginRight: '50px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Registro de Usuario</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Usuario"
            name="usuario"
            rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
          >
            <Input 
              placeholder="Ingrese su usuario"
              onKeyPress={handleTextInput}
              onChange={(e) => handleChangeToUpper('usuario', e)}
            />
          </Form.Item>

          {/* Nombre */}
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
          >
            <Input 
              placeholder="Ingrese su nombre"
              onKeyPress={handleTextInput}
              onChange={(e) => handleChangeToUpper('nombre', e)}
            />
          </Form.Item>
          <Form.Item
            label="Apellido"
            name="apellido"
            rules={[{ required: true, message: 'Por favor ingrese su apellido' }]}
          >
            <Input 
              placeholder="Ingrese su apellido"
              onKeyPress={handleTextInput}  
              onChange={(e) => handleChangeToUpper('apellido', e)} 
            />
          </Form.Item>
          <Form.Item
            label="Cédula"
            name="cedula"
            rules={[
              { required: true, message: 'Por favor ingrese su cédula' },
              { len: 10, message: 'La cédula debe tener 10 dígitos' },
            ]}
          >
            <Input 
              placeholder="Ingrese su cédula" 
              maxLength={10} 
              onKeyPress={handleNumberInput}
            />
          </Form.Item>
          <Form.Item
            label="Correo"
            name="correo"
            rules={[
              { required: true, message: 'Por favor ingrese su correo' },
              { type: 'email', message: 'Por favor ingrese un correo válido' },
            ]}
          >
            <Input placeholder="Ingrese su correo" />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="contraseña"
            rules={[
              { required: true, message: 'Por favor ingrese su contraseña' },
              { min: 5, message: 'La contraseña debe tener al menos 5 caracteres' },
            ]}
          >
            <Input.Password placeholder="Ingrese su contraseña" />
          </Form.Item>
          <Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Button type="primary" htmlType="submit" block>
                  Registrar
                </Button>
              </Col>
              <Col span={12}>
                <Button block onClick={() => window.history.back()}>
                  Regresar
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
      <Modal
        open={isModalVisible}
        title={null}
        onOk={() => {
          setIsModalVisible(false);
          if (modalInfo.onOk) {
            modalInfo.onOk();
          }
        }}
        onCancel={() => setIsModalVisible(false)}
        centered
        width={400}
        footer={[
          <Button key="ok" type="primary" onClick={() => {
            setIsModalVisible(false);
            if (modalInfo.onOk) {
              modalInfo.onOk(); 
            }
          }}>
            Aceptar
          </Button>
        ]}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          {modalInfo.icon}
          <h2 style={{ textAlign: 'center', fontSize: '24px', marginTop: '16px' }}>{modalInfo.title}</h2>
          <p style={{ textAlign: 'center', fontSize: '18px' }}>{modalInfo.content}</p>
        </div>
      </Modal>
    </Row>
  );
};

export default Register;
