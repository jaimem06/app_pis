import APILinks from '../directionsAPI';
import React from 'react';
import { Image } from 'react-native';
import { styles } from './styles/styles_info';
import { Text, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { handleNotificationResponse } from '../components/event_Notification';
const Info = () => {
  const [plan, setPlan] = useState(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const subscription = handleNotificationResponse(navigation, setMarkers, setTotalDistance, setIsLoading);
  
    return () => subscription.remove();
  }, []);


  useEffect(() => {
    fetch(APILinks.URL_PlanEmergencia)
      .then(response => response.json())
      .then(data => setPlan(data[0]))

      .catch(error => console.error(error));
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {plan && (
          <View style={styles.planContainer}>
             <Image source={{ uri: plan.imagen }} style={styles.image} />
            <Text style={styles.title}>{plan.titulo}</Text>
            <Text style={styles.text}>{plan.resumen}</Text>
            <TouchableOpacity style={styles.link }
              onPress={() => Linking.openURL(plan.link)}
            >
              <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, }}>Plan de Contingencia</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

    </ScrollView >
  );
}

export default Info;
