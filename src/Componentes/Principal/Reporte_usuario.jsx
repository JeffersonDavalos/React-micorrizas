import React, { useState } from 'react';
import { Layout, Form, Input, Button, DatePicker, Card, Row, Col, Table, Modal, ConfigProvider, notification } from 'antd';
import { DeleteOutlined, SearchOutlined, ClearOutlined, SmileOutlined } from '@ant-design/icons';
import MigajasdePan from './MigajasdePan';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';
import locale from 'antd/es/locale/es_ES';
import moment from 'moment';
import 'moment/locale/es';

const { RangePicker } = DatePicker;
const { Content, Sider } = Layout;

const ReporteUsuario = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [api, contextHolder] = notification.useNotification(); // Inicializar notificación

  const toggleCollapsed = () => setCollapsed(!collapsed);

  // Función para mostrar notificación de éxito o error
  const showNotification = (type, messageText, descriptionText) => {
    api.open({
      message: messageText,
      description: descriptionText,
      icon: <SmileOutlined style={{ color: type === 'success' ? '#108ee9' : '#ff4d4f' }} />,
    });
  };

  // Función para llamar a la API solo cuando se haga clic en "Buscar"
  const fetchData = async (values = {}) => {
    setLoading(true);

    const rangoFecha = values.rangoFechaCreacion
      ? values.rangoFechaCreacion.map((date) => date.format('YYYY-MM-DD'))
      : null;

    const requestData = {
      usuario: values.usuario || '',
      cedula: values.cedula || '',
      fechaInicio: rangoFecha ? rangoFecha[0] : '',
      fechaFin: rangoFecha ? rangoFecha[1] : '',
    };
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reporteUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        if (response.status === 500) {
          setData([]); // Limpiar la tabla
          showNotification('error','Datos no encontrados', 'No se encontraron datos con los filtros seleccionados.');
          return;
        }
      }

      const dataResponse = await response.json();

      if (dataResponse.length > 0) {
        setData(dataResponse);
        showNotification('success', 'Datos obtenidos con éxito', 'Los datos de los usuarios han sido cargados correctamente.');
      } else {
        setData([]); // Limpiar la tabla
        showNotification('error', 'No se encontró data', 'No hay datos que coincidan con los filtros aplicados.');
      }

    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetchData cuando el formulario se envíe (solo cuando se haga clic en "Buscar")
  const handleSubmit = (values) => {
    fetchData(values);
  };

  // Resetear los filtros y limpiar la tabla
  const handleReset = () => {
    form.resetFields(); // Limpiar los campos del formulario
    setData([]); // Limpiar la tabla
  };

  const showDeleteConfirm = (record) => {
    setSelectedUser(record);
    setVisible(true); // Mostrar el modal
  };

  const handleDelete = async () => {
    try {
      showNotification('success', 'Usuario eliminado', `El usuario ${selectedUser.usuario} ha sido eliminado con éxito.`);
      setVisible(false);
    } catch (error) {
      showNotification('error', 'Error al eliminar el usuario', error.message);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // Validar que solo se tipee letras y espacios en el campo de "usuario"
  const handleKeyPressUsuario = (e) => {
    const charCode = e.charCode || e.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^[a-zA-Z\s]*$/.test(charStr)) {
      e.preventDefault();
    }
  };

  // Validar que solo se tipee números en el campo de "cédula"
  const handleKeyPressCedula = (e) => {
    const charCode = e.charCode || e.keyCode;
    if (!/^[0-9]*$/.test(String.fromCharCode(charCode))) {
      e.preventDefault();
    }
  };

  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido',
    },
    {
      title: 'Cédula',
      dataIndex: 'cedula',
      key: 'cedula',
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
    },
    {
      title: 'Perfil',
      dataIndex: 'descripcion',
      key: 'perfil',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Button
          icon={<DeleteOutlined />}
          type="danger"
          onClick={() => showDeleteConfirm(record)} // Mostrar el modal al hacer clic en eliminar
        >
          Eliminar
        </Button>
      ),
      responsive: ['md'],
    },
  ];

  return (
    <ConfigProvider locale={locale}>
      {contextHolder}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
          <MenuLateral collapsed={collapsed} />
        </Sider>

        <Layout>
          <MenuSuperior />

          <Content style={{ margin: '16px' }}>
            <Row>
              <Col span={24}>
                <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Reporte Usuario</h1>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col span={24}>
                <MigajasdePan 
                  paginas={[
                    { nombre: 'Usuarios', ruta: '' },
                    { nombre: 'Reporte usuarios', ruta: '' }
                  ]}
                />
              </Col>
            </Row>

            <Card bordered={false} style={{ marginBottom: '16px' }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label="Usuario"
                      name="usuario"
                    >
                      <Input placeholder="Ingrese el usuario" onKeyPress={handleKeyPressUsuario} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      label="Cédula"
                      name="cedula"
                    >
                      <Input
                        placeholder="Ingrese la cédula"
                        maxLength={10}
                        onKeyPress={handleKeyPressCedula}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      label="Rango de Fecha de Creación"
                      name="rangoFechaCreacion"
                    >
                      <RangePicker
                        format="DD/MM/YYYY"
                        disabledDate={(current) => current && current > moment().endOf('day')}
                      />
                    </Form.Item>
                  </Col>

                  {/* Botones de Filtrar y Limpiar */}
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button
                      onClick={handleReset}
                      icon={<ClearOutlined />}
                      style={{ marginRight: 8 }}
                    >
                      Limpiar
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<SearchOutlined />}
                    >
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>

            <Card bordered={false}>
              <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="usuario"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 768 }}
              />
            </Card>
          </Content>

          {/* Modal de confirmación para eliminar usuario */}
          <Modal
            open={visible}
            title="Confirmación de eliminación"
            onOk={handleDelete}
            onCancel={handleCancel}
            okText="Eliminar"
            cancelText="Cancelar"
          >
            <p>¿Estás seguro de que deseas eliminar al usuario {selectedUser?.usuario}?</p>
          </Modal>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ReporteUsuario;
