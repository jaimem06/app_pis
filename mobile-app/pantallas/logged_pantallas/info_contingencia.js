import APILinks from '../../directionsAPI';
import React from 'react';
import { Image } from 'react-native';
import { styles } from '../styles/styles_info';
import { Text, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useEffect, useState } from 'react';


const Info_Contingencia = () => {

  const [plan, setPlan] = useState(null);
  useEffect(() => {
    fetch(APILinks.URL_PlanEmergencia)
      .then(response => response.json())
      .then(data => setPlan(data[0]))

      .catch(error => console.error(error));
  }, []);

  return (
    <ScrollView style={{marginRight:'1%'}}>
      <View style={styles.container}>
        {plan && (
          <View style={styles.planContainer}>
             <Image source={{ uri: plan.imagen }} style={styles.image} />
            <Text style={styles.title}>{plan.titulo}</Text>
            <Text style={styles.text}>{plan.resumen}</Text>
            <TouchableOpacity style={styles.link }
              onPress={() => Linking.openURL(plan.link)}
            >
              <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, }}>Plan de Emergencia</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

    </ScrollView >
  )
}
export default Info_Contingencia