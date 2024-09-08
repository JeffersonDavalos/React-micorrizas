import React, { useState } from 'react';
import { Layout, Form, Input, Button, DatePicker, Select, Card, Row, Col } from 'antd';
import MigajasdePan from './MigajasdePan';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Content, Sider } = Layout;

const ActualizarUsuario = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();

  const toggleCollapsed = () => setCollapsed(!collapsed);

  // Manejo de la función de envío de datos
  const handleSubmit = (values) => {
    console.log('Datos del formulario:', values);
    // Aquí puedes agregar la lógica para enviar los datos a la API
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <MenuLateral collapsed={collapsed} />
      </Sider>

      <Layout>
        <MenuSuperior />

        <Content style={{ margin: '16px' }}>
          {/* Título arriba de las migas de pan */}
          <Row>
            <Col span={24}>
              <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Actualizar Usuario</h1>
            </Col>
          </Row>

          {/* Migas de Pan */}
          <Row className="mb-2">
            <Col span={24}>
              <MigajasdePan 
                paginas={[
                  { nombre: 'Usuarios', ruta: '' }, // Sin redirección
                  { nombre: 'Actualizar Usuario', ruta: '' }
                ]}
              />
            </Col>
          </Row>

          {/* Formulario de Actualización */}
          <Card bordered={false} style={{ width: '100%' }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Row gutter={16}>
                {/* Cédula */}
                <Col span={12}>
                  <Form.Item
                    label="Cédula"
                    name="cedula"
                    rules={[{ required: true, message: 'Por favor ingresa la cédula' }]}
                  >
                    <Input placeholder="Ingrese la cédula" />
                  </Form.Item>
                </Col>

                {/* Nombre */}
                <Col span={12}>
                  <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
                  >
                    <Input placeholder="Ingrese el nombre" />
                  </Form.Item>
                </Col>

                {/* Apellido */}
                <Col span={12}>
                  <Form.Item
                    label="Apellido"
                    name="apellido"
                    rules={[{ required: true, message: 'Por favor ingresa el apellido' }]}
                  >
                    <Input placeholder="Ingrese el apellido" />
                  </Form.Item>
                </Col>

                {/* Usuario */}
                <Col span={12}>
                  <Form.Item
                    label="Usuario"
                    name="usuario"
                    rules={[{ required: true, message: 'Por favor ingresa el usuario' }]}
                  >
                    <Input placeholder="Ingrese el usuario" />
                  </Form.Item>
                </Col>

                {/* Correo */}
                <Col span={12}>
                  <Form.Item
                    label="Correo"
                    name="correo"
                    rules={[{ type: 'email', required: true, message: 'Por favor ingresa un correo válido' }]}
                  >
                    <Input placeholder="Ingrese el correo electrónico" />
                  </Form.Item>
                </Col>

                {/* Contraseña */}
                <Col span={12}>
                  <Form.Item
                    label="Contraseña"
                    name="contraseña"
                    rules={[{ required: true, message: 'Por favor ingresa la contraseña' }]}
                  >
                    <Input.Password placeholder="Ingrese la contraseña" />
                  </Form.Item>
                </Col>

                {/* Perfil */}
                <Col span={12}>
                  <Form.Item
                    label="Perfil"
                    name="perfil"
                    rules={[{ required: true, message: 'Por favor selecciona un perfil' }]}
                  >
                    <Select placeholder="Selecciona el perfil">
                      <Option value="1">Administrador</Option>
                      <Option value="2">Usuario</Option>
                      {/* Agrega más perfiles según sea necesario */}
                    </Select>
                  </Form.Item>
                </Col>

                {/* Estado */}
                <Col span={12}>
                  <Form.Item
                    label="Estado"
                    name="estado"
                    rules={[{ required: true, message: 'Por favor selecciona un estado' }]}
                  >
                    <Select placeholder="Selecciona el estado">
                      <Option value="A">Activo</Option>
                      <Option value="I">Inactivo</Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* Rango de Fecha de Creación */}
                <Col span={24}>
                  <Form.Item
                    label="Fecha de Creación"
                    name="rangoFechaCreacion"
                    rules={[{ required: true, message: 'Por favor selecciona el rango de fecha' }]}
                  >
                    <RangePicker format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>

                {/* Botón de enviar */}
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Actualizar Usuario
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ActualizarUsuario;
