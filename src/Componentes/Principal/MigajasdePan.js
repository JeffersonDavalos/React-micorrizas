import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

// Función para convertir la primera letra de cada palabra en mayúscula
const capitalizeFirstLetterEachWord = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const MigajasdePan = (props) => {
  const [Migaja, setMigaja] = useState([]);
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Asegúrate de que props.paginas esté definido y sea un array
    const paginas = props.paginas || []; // Si props.paginas es undefined, usa un array vacío

    if (Array.isArray(paginas) && paginas.length > 0) {
      let mig = [{ nombre: 'Inicio', ruta: '/principal' }];
      for (let i = 0; i < paginas.length; i++) {
        mig[i + 1] = paginas[i];
      }
      let info = mig.map((x, y, key) => {
        if (mig.length === y + 1) {
          return (
            <Breadcrumb.Item
              key={key}
              style={{ fontWeight: 300, borderBottom: '2px double #3498DB' }}
            >
              <Link to={x.ruta} className="text-dark">
                {capitalizeFirstLetterEachWord(x.nombre)}
              </Link>
            </Breadcrumb.Item>
          );
        } else {
          return (
            <Breadcrumb.Item key={key} style={{ fontWeight: 300 }}>
              <Link to={x.ruta} className="text-dark">
                {x.nombre === 'Inicio' ? (
                  <>
                    <HomeOutlined
                      key="icono"
                      style={{ fontSize: '15px', marginBottom: '5px' }}
                      className="align-middle"
                    />
                    {' Inicio'}
                  </>
                ) : (
                  capitalizeFirstLetterEachWord(x.nombre)
                )}
              </Link>
            </Breadcrumb.Item>
          );
        }
      });
      setMigaja(info);
    }
  }, [props.paginas]);

  return (
    <Row className={"justify-content-between px-3"}>
      <div>
        <Breadcrumb
          separator={
            <>
              &nbsp;<span style={{ color: '#3498DB' }}>&gt;</span>&nbsp;
            </>
          }
          className="mt-2"
        >
          {Migaja}
        </Breadcrumb>
      </div>
    </Row>
  );
};

export default MigajasdePan;
