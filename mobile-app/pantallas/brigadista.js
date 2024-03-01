import React, { useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { handleNotificationResponse } from '../components/event_Notification';
import APILinks from '../directionsAPI';
import { responsabilidades, facultades, styles } from './styles/styles_brigadistas';

const Brigadista = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [brigadista, setBrigadista] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const subscription = handleNotificationResponse(navigation, setMarkers, setTotalDistance, setIsLoading);
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
                      <Text style={styles.text} key={`task-${taskIndex}`}>
                        {'\u2022 '}{task}
                      </Text>
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

export default Brigadista;
