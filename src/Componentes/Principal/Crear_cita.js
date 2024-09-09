import React, { useState } from 'react';
import { Layout, Menu, Select, Form, Row, Col, Input, Button, message } from 'antd';
import { Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PlusOutlined, CalendarOutlined, SaveOutlined,SearchOutlined ,UserOutlined } from '@ant-design/icons';
import './Crear_cita.css';

const { Header, Content, Sider } = Layout;
const { Option } = Select;

const Crear_cita = () => {
  const [expanded, setExpanded] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState('cedula');
  const [documento, setDocumento] = useState('');

  const handlePeriodChange = (value) => {
    console.log("Período seleccionado:", value);
  };

  const handleInsertarClick = () => {
    if (tipoDocumento === 'cedula') {
      if (!validarCedula(documento)) {
        message.error('La cédula ingresada no es válida');
        return;
      }
    } else {
      if (!validarRUC(documento)) {
        message.error('El RUC ingresado no es válido');
        return;
      }
    }
    message.success('Datos insertados correctamente');
  };

  const validarCedula = (cedula) => {
    if (cedula.length !== 10) {
      return false;
    }

    if (!/^\d+$/.test(cedula)) {
      return false;
    }

    if (/^(\d)\1+$/.test(cedula)) {
      return false;
    }
    const digitos = cedula.split('').map(Number);
    const verificador = digitos.pop();
    const suma = digitos.reduce((acc, curr, idx) => {
      const temp = curr * ((idx % 2 === 0) ? 2 : 1);
      return acc + (temp > 9 ? temp - 9 : temp);
    }, 0);
  
    const residuo = suma % 10;
    const resultado = residuo === 0 ? 0 : 10 - residuo;
  
    return resultado === verificador;
  };
  
  const validarRUC = (ruc) => {
    return true; 
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={expanded ? 200 : 80}
        theme='dark'
        collapsible
        collapsed={!expanded}
        onCollapse={(collapsed) => setExpanded(!collapsed)}
        collapsedWidth={80}
      >
        <div className='logo' />
        <Menu theme='dark' mode='vertical'>
        <Menu.Item key='logout' icon={<UserOutlined />}>
            <Link to='/Loginn'>Salir</Link>
          </Menu.Item>
          <Menu.Item key='crearCita' icon={<PlusOutlined />}>
            <Link to='/crear-cita'>Crear una cita</Link>
          </Menu.Item>
          <Menu.Item key='calendario' icon={<CalendarOutlined />}>
            <Link to='/calendario'>Calendario</Link>
          </Menu.Item>
          <Menu.Item key='consultarCita'icon={<SearchOutlined />}>
            <Link to='/consultarCita'>Consultar una cita</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
        <h2 className="text-left font-medium mb-3">Ingrese datos paciente</h2>
        <div className='form-container'>
            <div className='form-content'>
            <Form layout="vertical">
    
              <Form>
              <Card>
                <div style={{ padding: '16px' }}>
                  <Row gutter={[16,6]}>
                    <Col md={18} lg={16}>
                   
                      <Form.Item
                        label="Cédula / RUC:"
                        name="cedulaRUC"
                        rules={[
                          { required: true, message: 'Seleccione un tipo de documento' }
                        ]}
                      >
                        <Input.Group compact>
                          <Select 
                            defaultValue="cedula" 
                            style={{ width: '30%' }}
                            onChange={(value) => setTipoDocumento(value)}
                          >
                            <Option value="cedula">Cédula</Option>
                            <Option value="ruc">RUC</Option>
                          </Select>
                          <Input 
                            style={{ width: '70%' }} 
                            placeholder={tipoDocumento === 'cedula' ? 'Ingrese su cédula' : 'Ingrese su RUC'}
                            maxLength={tipoDocumento === 'cedula' ? 10 : 13}
                            onChange={(e) => setDocumento(e.target.value)}
                            onKeyPress={(e) => {
                              // Permite solo números si es cédula
                              if (tipoDocumento === 'cedula') {
                                const regex = new RegExp('^[0-9]+$');
                                const key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                                if (!regex.test(key)) {
                                  e.preventDefault();
                                  return false;
                                }
                              }
                            }}
                          />
                        </Input.Group>
                      </Form.Item>
                      <Form.Item
                        label="Nombre:"
                        name="nombre"
                        rules={[{ required: true, message: 'Ingrese su nombre' }]}
                      >
                        <Input placeholder="Ingrese su nombre" />
                      </Form.Item>
                      <Form.Item
                        label="Apellido:"
                        name="apellido"
                        rules={[{ required: true, message: 'Ingrese su apellido' }]}
                      >
                        <Input placeholder="Ingrese su apellido" />
                      </Form.Item>
                      <Form.Item
                        label="Número de Celular:"
                        name="celular"
                        rules={[
                          { required: true, message: 'Ingrese su número de celular' },
                          { pattern: /^[0-9]+$/, message: 'Ingrese solo números' },
                          { len: 10, message: 'El número de celular debe tener 10 dígitos' }
                        ]}
                      >
                        <Input placeholder="Ingrese su número de celular" />
                      </Form.Item>
                      <Form.Item
                        label="Correo Electrónico:"
                        name="correo"
                        rules={[
                          { required: true, message: 'Ingrese su correo electrónico' },
                          { type: 'email', message: 'Ingrese un correo electrónico válido' }
                        ]}
                      >
                        <Input placeholder="Ingrese su correo electrónico" />
                      </Form.Item>
                      <Form.Item
                        label="Observaciones de Síntomas:"
                        name="observaciones"
                        rules={[{ required: true, message: 'Ingrese observaciones de síntomas' }]}
                      >
                        <Input.TextArea rows={4} placeholder="Ingrese observaciones de síntomas" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="end">
                 
                  </Row>
                </div>
              </Card>
              
            </Form>
            
            <Button
    className="ml-2 float-right" // O puedes usar "text-right" en lugar de "float-right"
    htmlType="submit"
    style={{ backgroundColor: 'blue', borderColor: 'blue', color: 'white', marginTop: '32px' }}
    onClick={handleInsertarClick}
>
    <SaveOutlined />
    Insertar
</Button>

                   
            </Form>
          </div>
          </div>

        </Content>
      </Layout>
    </Layout>
  );
};

export default Crear_cita;
