import React from 'react';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useEffect, useState } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Info = () => {
  const [plan, setPlan] = useState(null);
  useEffect(() => {
    fetch('http://192.168.1.24:3000/planemergencia/read_plan/')
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
              <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, }}>Plande Contingencia</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

    </ScrollView >
  );
}
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
    justifyContent: 'center',
    marginRight: '10%',
    
  },
  image: {
    width: '100%',
    height: '16%',
    marginTop: '65%',
    
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'justify',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
   marginLeft: '7%',
    marginRight: '15%',
  },
  link: {
    backgroundColor: 'skyblue',
    marginHorizontal: '7%',
    marginTop: "10%",
    marginBottom: '30%',
    padding: 10,
    borderRadius: 5, 
    marginRight: '15%',
  },
});
export default Info;
