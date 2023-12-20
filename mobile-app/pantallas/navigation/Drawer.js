import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../logged_pantallas/home';
import Registrar from '../logged_pantallas/registrar';

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
  return (
    //Contenedor de la navegación
    <Drawer.Navigator>
        {/* Pantallas de navegación Laterales */}
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="registrar" component={Registrar} />
    </Drawer.Navigator>
  );
}