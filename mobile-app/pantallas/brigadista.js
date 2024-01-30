import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { handleNotificationResponse } from '../components/event_Notification';
import APILinks from '../directionsAPI';

const Brigadista = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [brigadista, setBrigadista] = useState([]);
  const navigation = useNavigation();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const subscription = handleNotificationResponse(navigation, setMarkers);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const fetchBrigadistas = async () => {
      try {
        const response = await fetch(APILinks.URL_Brigadista + (selectedArea ? `/area/${selectedArea}` : ''));
        const data = await response.json();
        setBrigadista(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrigadistas();
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
      <Text style={styles.titleP}>Brigadistas de rutas de evacuación</Text>
      <Dropdown
        style={styles.dropdown}
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
        <FlatList
          data={brigadista}
          keyExtractor={(item) => item._id}
          renderItem={({ item: brigadista }) => (
            <Card containerStyle={styles.outerCard}>
              <Card.Title style={styles.cardTitle}>NOMBRES DE LOS MIEMBROS BRIGADA DE EVACUACIÓN</Card.Title>
              <Card containerStyle={styles.innerCard}>
                {brigadista.titular.map((titular, index) => (
                  <Text style={styles.text} key={`titular-${index}`}>
                    Titular {titular.nroTitular} : {titular.nombresCompletos}
                  </Text>
                ))}
                {brigadista.reemplazo.map((reemplazo, index) => (
                  <Text style={styles.text} key={`reemplazo-${index}`}>
                    Reemplazo {reemplazo.nroReemplazo} : {reemplazo.nombresCompletos}
                  </Text>
                ))}
                <Card.Divider />
                <Text style={styles.text}>Área/Piso donde se ubica: {brigadista.area}</Text>
              </Card>
              <Card.Title style={styles.cardTitle}>RESPONSABILIDADES</Card.Title>
              {responsabilidades.map((responsabilidad, index) => (
                <Card containerStyle={styles.innerCard} key={`responsabilidad-${index}`}>
                  <Card.Title style={styles.taskTitle}>{responsabilidad.title}</Card.Title>
                  {responsabilidad.tasks.map((task, taskIndex) => (
                    <Text style={styles.text} key={`task-${taskIndex}`}>{task}</Text>
                  ))}
                </Card>
              ))}
            </Card>
          )}
        />
      )}
    </>
  );
};

const responsabilidades = [
  {
    title: "Antes de Evacuacion",
    tasks: [
      "Elaborar un croquis Interno",
      "Determinar las Rutas de Evacuación, Salidas de emergencia.",
      "Verificar que éstas no se encuentren bloqueadas, con llave ni obstaculizadas.",
      "Prácticas diversas formas de rescate."
    ]
  },
  {
    title: "Durante Evacuacion",
    tasks: [
      "Cerrar las Llaves de agua, gas, cortar la energía eléctrica.",
      "Alejar a los compañeros del área siniestrada",
      "Conducir al Personal por la ruta de evacuación",
      "Revisar que nadie quede en el área siniestrada."
    ]
  },
  {
    title: "Después de Evacuacion",
    tasks: [
      "Pasar lista de asistencia y comprobar que no falte nadie o identificar su paradero",
      "Recorrer el inmueble ara establecer su estado y recomendar o no su utilización"
    ]
  }
];

const styles = StyleSheet.create({
  title: {
    color: '#B3DFE8',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  titleP: {
    color: '#2A364E',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '15%',
  },

  dropdown: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '10%',
    backgroundColor: 'white',
    marginBottom: '2%'
  },
  outerCard: {
    backgroundColor: 'white',
    borderRadius: 10
  },
  innerCard: {
    backgroundColor: '#2A364E',
    borderRadius: 10
  },
  cardTitle: {
    color: '#007B8D',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 'none'
  },
  taskTitle: {
    color: '#B3DFE8',
    fontSize: 14,
    fontWeight: 'bold'
  },
  text: {
    color: 'white'
  }
});

export default Brigadista;
