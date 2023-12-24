import React from 'react';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../logged_pantallas/home';
import Registrar from '../logged_pantallas/registrar';
import Info_Brigadista from '../logged_pantallas/info_brigadista';
import Info_Contingencia from '../logged_pantallas/info_contingencia';
import { StyleSheet, Text } from 'react-native';
import MenuButtonItem from '../../components/MenuButtonItem';
import About_App from '../logged_pantallas/about_app';


const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuItems {...props} />}
    >
      <Drawer.Screen name="Mapa" component={Home} />
      <Drawer.Screen name="Nuevo Usuario" component={Registrar} />
      <Drawer.Screen name="Brigadista" component={Info_Brigadista} />
      <Drawer.Screen name="Plan Contingencia" component={Info_Contingencia} />
      <Drawer.Screen name = "Informacion" component={About_App} />
    </Drawer.Navigator>
  );
}

const MenuItems = ({ navigation }) => {
  return (
    
    <DrawerContentScrollView
      style={styles.container}
    >
      <Text style={styles.title}>MENU FREDUNL</Text>
      <MenuButtonItem
        text="Mapa"
        onPress={() => navigation.navigate('Mapa')} iconName="map-search"
      />
      <MenuButtonItem
        text="About App"
        onPress={() => navigation.navigate('Informacion')} iconName="information-outline"
      />

      <Text style={{marginTop: 25, marginBottom: 10, fontWeight: 'bold'}} >ADMINISTRACION:</Text>
      <MenuButtonItem
        text="Nuevo Usuario"
        onPress={() => navigation.navigate('Nuevo Usuario')} iconName="account-multiple-plus"
      />

      <MenuButtonItem
        text="Brigadista"
        onPress={() => navigation.navigate('Brigadista')} iconName={"account-hard-hat"}
      />

      <MenuButtonItem
        text="Plan Contingencia"
        onPress={() => navigation.navigate('Plan Contingencia')} iconName={"alarm-light"}
      />
       <Text style={{marginTop: 25, marginBottom: 10, fontWeight: 'bold'}}>BOTONES:</Text>
      <MenuButtonItem
        text="Cerrar sesión"
        onPress={() => navigation.navigate('login')} // Asume que 'Login' es el nombre de la ruta de la pantalla de inicio de sesión
        iconName="logout"
        buttonColor="#3C89C8"
      />

    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    padding: 15,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
 
})