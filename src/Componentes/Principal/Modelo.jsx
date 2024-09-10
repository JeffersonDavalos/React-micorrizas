import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Spin, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MigajasdePan from './MigajasdePan';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';

const { Content, Sider } = Layout;

const Modelo = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [imageUrl, setImageUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleUpload = ({ fileList: newFileList }) => {
    console.log('Subiendo archivo:', newFileList);
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      console.log('Archivo subido correctamente:', file);

      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onloadend = () => {
        setBase64Image(reader.result);
        const fileUrl = URL.createObjectURL(file);
        setImageUrl(fileUrl);
        setImageFile(file);
        console.log('URL de la imagen:', fileUrl);
        console.log('Imagen en base64:', reader.result); 

        message.success(`${newFileList[0].name} subido con éxito.`);
      };
    } else {
      message.error('No se pudo subir la imagen.');
    }
  };

  const handlePredict = async () => {
    if (!base64Image) {
      message.error('Por favor, sube una imagen.');
      console.log('No se ha cargado ninguna imagen.');
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
      console.log('Respuesta de la API:', data);

      if (data.prediccion) {
        setPrediction(data.prediccion);
      } else {
        message.error('Error en la predicción.');
      }
    } catch (error) {
      console.error('Error al hacer la predicción:', error);
      message.error('Ocurrió un error al hacer la predicción.');
    } finally {
      setLoading(false);
    }
  };

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
              <h1>Modelo Micorrizas</h1>
              <MigajasdePan paginas={[{ nombre: 'Modelo Micorrizas', ruta: '' }]} />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Subir Imagen de Micorrizas" style={{ textAlign: 'center' }}>
                <Upload
                  name="file"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUpload}
                  beforeUpload={() => false} 
                >
                  {fileList.length < 1 && <Button icon={<UploadOutlined />}>Subir Imagen</Button>}
                </Upload>

                {loading ? (
                  <Spin tip="Cargando..." />
                ) : (
                  imageUrl && (
                    <div>
                      <img
                        src={imageUrl}
                        alt="Micorrizas"
                        style={{ width: '100%', maxWidth: '300px', marginTop: 20 }}
                      />
                      {prediction !== null && (
                        <p>Clase predicha: {prediction === 0 ? 'Endomicorriza' : 'Ectomicorriza'}</p>
                      )}
                    </div>
                  )
                )}

                <Button type="primary" onClick={handlePredict} style={{ marginTop: 20 }}>
                  Predecir
                </Button>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Modelo;
