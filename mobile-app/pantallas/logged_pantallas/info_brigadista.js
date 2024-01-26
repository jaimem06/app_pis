import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { FlatList, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';


const Info_Brigadista = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [brigadista, setBrigadista] = useState([]);
  useEffect(() => {
    const fetchBrigadistas = async () => {
      try {
        const response = await fetch('http://192.168.1.24:3000/brigadista/read_brigadista');
        const data = await response.json();
        setBrigadista(data); // Aquí cambiamos data[0] por data
        console.log(selectedArea);

      } catch (error) {
        console.error(error);
      }
    };
    fetchBrigadistas();
  }, []);

  useEffect(() => {
    const fetchBrigadistas = async () => {
      try {
        const response = await fetch(`http://192.168.1.3:3000/brigadista/read_brigadista/area/${selectedArea}`);
        const data = await response.json();
        setBrigadista(data);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(selectedArea);
    if (selectedArea) {
      fetchBrigadistas();
    }
  }, [selectedArea]);

  const facultades = [
    "Administración Central",
    "Bienestar Universitario",
    "Educación a Distancia",
    "Agropecuaria y de Recursos Nat Renovables",
    "Energía, las Ind y los Recursos Nat No Renovables",
    "Educación el Arte y la Comunicación",
    "Jurídica, Social y Administrativa",
    "Salud Humana"
  ];

  return (
    <>
      <Text style={styles.title}>Brigadistas de rutas de evacuación</Text>
      <Dropdown
      style={{ width: 200 , marginLeft: '5%', marginTop: '5%',width:'90%',backgroundColor:'white',marginBottom:'2%'}}
      data={facultades.map((facultad, index) => ({ label: facultad, value: index + 1 }))}
        search
        searchPlaceholder="Search"
        labelField="label"
        valueField="value"
        placeholder="Select Area"
        value={selectedArea}
        onChange={(item) => setSelectedArea(item.label)}
      />
      {Array.isArray(brigadista) && (
        <>
          <FlatList style={{ margin: '1%' }}
            data={brigadista}
            keyExtractor={(item) => item._id}
            renderItem={({ item: brigadista }) => (
              <Card>
                <>
                  <Card.Title>NOMBRES DE LOS
                    MIEMBROS BRIGADA DE
                    EVACUACIÓN</Card.Title>
                  <Card>

                    {brigadista.titular.map((titular, index) => (

                      <Text key={`titular-${index}`}>
                        Titular {titular.nroTitular} : {titular.nombresCompletos}
                      </Text>
                    ))}
                    {brigadista.reemplazo.map((reemplazo, index) => (
                      <Text key={`reemplazo-${index}`}>
                        Reemplazo {reemplazo.nroReemplazo} : {reemplazo.nombresCompletos}
                      </Text>
                    ))}
                    <Card.Divider />
                    <Text>Áre/Piso donde se ubica: {brigadista.area}</Text>
                  </Card>
                  <Card.Title>RESPONSABILIDADES</Card.Title>
                  <Card>

                    <Card.Title>Antes de Evacuacion</Card.Title>
                    <Text>Elaborar un croquis Interno</Text>
                    <Text>Determinar las Rutas de Evacuación, Salidas de emergencia.</Text>
                    <Text>Verificar que éstas no se encuentren bloqueadas, con llave ni obstaculizadas.</Text>
                    <Text>Prácticas diversas formas de rescate.</Text>
                  </Card>

                  <Card>
                    <Card.Title>Durante Evacuacion</Card.Title>
                    <Text>Cerrar las Llaves de agua, gas, cortar la energía eléctrica.</Text>
                    <Text>Alejar a los compañeros del área siniestrada</Text>
                    <Text>Conducir al Personal por la ruta de evacuación</Text>
                    <Text>Revisar que nadie quede en el área siniestrada.</Text>
                  </Card>

                  <Card>
                    <Card.Title>Después de Evacuacion</Card.Title>
                    <Text>Pasar lista de asistencia y comprobar que no falte nadie o identificar su paradero</Text>
                    <Text>Recorrer el inmueble ara establecer su estado y recomendar o no su utilización</Text>
                  </Card>
                </>

              </Card>
            )}
          />
        </>

      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    textAlign: 'center',
    marginTop: '10%',

  },
  planContainer: {
    width: 412,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '5%',

  },
  responsable: {
    backgroundColor: 'skyblue',
    marginHorizontal: '7%',
    marginTop: "10%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    marginRight: '15%',
    width: '85%',
  },
});


export default Info_Brigadista