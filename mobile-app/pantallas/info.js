import React from 'react';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Info = () => {
  return (
    <ScrollView> 
    <View style={{backgroundColor:'white'}} >
      <Image style = {{
        width: windowWidth *1.0,
        height: windowHeight *0.2,
        alignSelf: "center",
        
      }} 
      source={require('../imagenes/logo_unl.png')}
      resizeMode='contain' />
      <Image style = {{
        width: windowWidth *0.5,
        height: windowHeight *0.2,
        alignSelf: "center",
        
      }}
      source={require('../imagenes/logo.png')}
      resizeMode='contain' />
     <Image style = {{
        width: windowWidth *0.5,
        height: windowHeight *0.2,
        alignSelf: "center",
        
      }}
      source={require('../imagenes/unl.png')}
      resizeMode='contain' />
      <Text
        style={{
          fontSize: 25,
          textAlign: "center",
          marginBottom: "5%",
          marginHorizontal : "5%", 
        }}
        
      >      PLAN DE EMERGENCIA 
      DE LA UNIVERSIDAD NACIONAL DE LOJA
                  2022-2023
      </Text>
       <Text style={{
          fontSize: 25,
          textAlign: "justify",
          justifyContent: "center",
          marginHorizontal: "5%",
          marginTop: "50%",
          
        }}
      >El Plan de Emergencia Institucional de la Universidad Nacional de Loja tiene como objetivo principal cumplir con las disposiciones legales establecidas por la ley. Este plan se ha diseñado para hacer frente a diversas situaciones adversas, con el fin de salvaguardar la integridad física y la salud de todas las personas que se encuentren dentro de la institución, incluyendo personal docente, administrativo, trabajadores, estudiantes, visitantes y otros.</Text>

<Text style={{
          fontSize: 25,
          textAlign: "justify",
          marginTop: "20%",
          marginHorizontal: "5%"
          
        }}
      >El documento también busca cumplir con el Artículo 14 del Reglamento de Higiene y Seguridad de la Universidad Nacional, que establece directrices para la prevención de amenazas naturales y riesgos antrópicos.</Text>

<Text style={{
          fontSize: 25,
          textAlign: "justify",
          marginTop: "20%",
          marginHorizontal: "5%"
        }}
      > El Plan de Seguridad aborda tanto eventos naturales como sismos, como también desastres provocados por acciones humanas, tales como incendios, derrames de sustancias químicas, delincuencia, pandillaje, convulsiones sociales y accidentes de trabajo. Para cada uno de estos escenarios, se ha establecido un Plan de Contingencia que describe las acciones específicas a tomar.</Text>

<Text style={{
          fontSize: 25,
          textAlign: "justify",
          marginTop: "20%",
          marginHorizontal: "5%"
        }}
      >Adicionalmente, se incluye un Plan de Evacuación que detalla el procedimiento para abandonar las edificaciones de manera rápida y efectiva. Se han identificado zonas seguras externas previamente establecidas para que todo el personal se desplace hacia ellas durante una emergencia.</Text>

<Text style={{
          fontSize: 25,
          textAlign: "justify",
          marginTop: "20%",
          marginHorizontal: "5%"
        }}
      >La implementación de este plan cuenta con una organización bien estructurada, cuyos miembros están capacitados y entrenados adecuadamente. Cada miembro tiene responsabilidades y funciones específicas para actuar de manera efectiva en caso de una emergencia. Además, se cuentan con los medios de comunicación adecuados para coordinar y comunicar eficientemente durante situaciones de crisis.</Text>
    </View>
    </ScrollView >
  );
}

export default Info;
