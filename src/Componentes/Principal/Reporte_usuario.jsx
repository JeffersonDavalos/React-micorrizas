import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, DatePicker, Card, Row, Col, Table, Modal, ConfigProvider, notification, Select, Spin } from 'antd';
import { SearchOutlined, ClearOutlined, SmileOutlined, EditOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import MigajasdePan from './MigajasdePan';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';
import locale from 'antd/es/locale/es_ES';
import moment from 'moment';
import 'moment/locale/es';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Content, Sider } = Layout;

const ReporteUsuario = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [perfiles, setPerfiles] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [modalInfo, setModalInfo] = useState({}); 

  const fetchPerfiles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/listarPerfiles');
      const perfilesData = await response.json();
      setPerfiles(perfilesData);
    } catch (error) {
      console.error('Error al cargar los perfiles:', error);
    }
  };

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

      const dataResponse = await response.json();
      if (response.ok && dataResponse.length > 0) {
        setData(dataResponse);
        notification.success({
          message: 'Datos obtenidos con éxito',
          description: 'Los datos de los usuarios han sido cargados correctamente.',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      } else {
        setData([]);
        notification.error({
          message: 'No se encontró data',
          description: 'No hay datos que coincidan con los filtros aplicados.',
          icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfiles(); 
  }, []);

  const showEditModal = (record) => {
    setSelectedUser(record);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleSaveChanges = async (values) => {
    setModalLoading(true);
    try {
      const requestData = {
        usuario: selectedUser.usuario,
        cedula: selectedUser.cedula,  
        perfil: values.perfil,         
        estado: values.estado,         
      };

      const response = await fetch('http://127.0.0.1:8000/api/actualizarEstado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setModalInfo({
          title: 'Usuario Actualizado',
          content: `El usuario ${selectedUser.usuario} ha sido actualizado correctamente.`,
          icon: <CheckCircleOutlined style={{ color: 'green', fontSize: '100px' }} />,
        });
        setIsModalVisible(true); 
        setEditModalVisible(false); 
        fetchData(); 
      } else {
        setModalInfo({
          title: 'Error en la Actualización',
          content: data.error || 'Ocurrió un error al actualizar el usuario.',
          icon: <ExclamationCircleOutlined style={{ color: 'red', fontSize: '100px' }} />,
        });
        setIsModalVisible(true); 
      }
    } catch (error) {
      setModalInfo({
        title: 'Error en la Actualización',
        content: 'Ocurrió un error inesperado al intentar actualizar el usuario.',
        icon: <ExclamationCircleOutlined style={{ color: 'red', fontSize: '100px' }} />,
      });
      setIsModalVisible(true); 
    } finally {
      setModalLoading(false); 
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
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
      title: 'Fecha',
      dataIndex: 'fecha_creacion',
      key: 'fecha',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Button
          icon={<EditOutlined />}
          type="primary"
          onClick={() => showEditModal(record)} 
        >
          Editar
        </Button>
      ),
      responsive: ['md'],
    },
  ];

  return (
    <ConfigProvider locale={locale}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
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
                onFinish={(values) => {
                  fetchData(values);
                }}
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label="Usuario"
                      name="usuario"
                    >
                      <Input placeholder="Ingrese el usuario" />
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

                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button
                      onClick={() => form.resetFields()}
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
            <Modal
              open={editModalVisible}
              title="Editar Usuario"
              onCancel={handleEditCancel}
              footer={null}
            >
              <Spin spinning={modalLoading}>
                <Form layout="vertical" onFinish={handleSaveChanges}>
                  <Form.Item label="Perfil" name="perfil" initialValue={selectedUser?.perfil}>
                    <Select placeholder="Seleccione el perfil">
                      {perfiles.map((perfil) => (
                        <Option key={perfil.value} value={perfil.value}>{perfil.label}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Estado" name="estado" initialValue={selectedUser?.estado}>
                    <Select placeholder="Seleccione el estado">
                      <Option value="A">Activo</Option>
                      <Option value="E">Eliminado</Option>
                      <Option value="I">Inactivo</Option>
                    </Select>
                  </Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Guardar Cambios
                  </Button>
                </Form>
              </Spin>
            </Modal>
            <Modal
              open={isModalVisible}
              onOk={handleModalOk}
              onCancel={handleModalOk}
              centered
              width={400}
              footer={[
                <Button key="ok" type="primary" onClick={handleModalOk}>
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
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ReporteUsuario;
