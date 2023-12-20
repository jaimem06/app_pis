import React, { useEffect } from 'react';
import { View, BackHandler, StyleSheet } from 'react-native';
import { DrawerNavigation } from './navigation/Drawer';

const Logged = () => {
  useEffect(() => {
    const backAction = () => {
      return true; // Esto previene la navegación hacia atrás
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove(); // Limpia el listener al desmontar el componente
  }, []);

  return (  
    //Trae el contenedor de navegación lateral    
    <DrawerNavigation/>
  );
};

export default Logged;