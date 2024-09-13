import React, { useState } from 'react';
import { Layout, Card, Row, Col, Spin, Upload, Button, message, Modal, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MigajasdePan from './MigajasdePan';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';

const { Content, Sider } = Layout;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Modelo = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [prediction, setPrediction] = useState(null); // Esto guardará el valor de predicción
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [base64Image, setBase64Image] = useState(null);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64Image(reader.result);
        const fileUrl = URL.createObjectURL(file);
        setImageUrl(fileUrl);

        // Solo mostrar el mensaje una vez, si se ha cargado un archivo nuevo.
        if (newFileList.length === 1) {
          message.success(`${newFileList[0].name} subido con éxito.`);
        }
      };
    } else {
      // Si el fileList está vacío, limpiamos la previsualización
      setImageUrl(null);
      setBase64Image(null);
    }
  };

  const handlePredict = async () => {
    if (!base64Image) {
      message.error('Por favor, sube una imagen.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      const data = await response.json();

      console.log(data);
      if (data.prediccion) {
        setPrediction(data.prediccion); // Establecemos la predicción recibida
      } else {
        message.error('Error en la predicción.');
      }
    } catch (error) {
      message.error('Ocurrió un error al hacer la predicción.');
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Subir Imagen</div>
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <MenuLateral collapsed={collapsed} />
      </Sider>

      <Layout>
        <MenuSuperior />

        <Content style={{ margin: '16px' }}>
          <Row>
            <Col>
              <MigajasdePan paginas={[{ nombre: 'Modelo Micorrizas', ruta: '' }]} />
            </Col>
          </Row>

          {/* Título debajo de las migas de pan */}
          <Row justify="center">
            <Col span={24} style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>
              <h1>Modelo Micorrizas</h1>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={24} sm={16} md={12} lg={8}>
              <Card title="Subir Imagen de Micorrizas" style={{ textAlign: 'center' }}>
                <Upload
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleUpload}
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith('image/');
                    if (!isImage) {
                      message.error('Solo puedes subir archivos de imagen.');
                    }
                    return isImage || Upload.LIST_IGNORE;
                  }}
                  maxCount={1}
                >
                  {fileList.length < 1 && uploadButton}
                </Upload>

                {loading ? (
                  <Spin tip="Cargando..." />
                ) : (
                  imageUrl && (
                    <div>
                      <img
                        src={imageUrl}
                        alt="Micorrizas"
                        style={{ width: '100%', maxWidth: '300px', marginTop: 20, borderRadius: '10px' }}
                      />
                      {prediction !== null && (
                        <p style={{ marginTop: '20px', fontSize: '16px' }}>
                          {/* Comparar predicción como cadena de texto */}
                          Clase predicha: {prediction === '0' ? 'Endomicorriza' : 'Ectomicorriza'}
                        </p>
                      )}
                    </div>
                  )
                )}

                <Button 
                  type="primary"
                  onClick={handlePredict}
                  disabled={loading}
                  style={{ marginTop: 20, width: '100%' }}
                >
                  {loading ? 'Prediciendo...' : 'Predecir'}
                </Button>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Layout>
  );
};

export default Modelo;
