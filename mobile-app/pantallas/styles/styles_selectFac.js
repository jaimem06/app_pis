import { StyleSheet } from 'react-native';

export const options = [
    "Administración Central",
    "Educación a Distancia",
    "Agropecuaria y de Recursos Nat Renovables",
    "Energía, las Ind y los Recursos Nat No Renovables",
    "Educación el Arte y la Comunicación",
    "Jurídica, Social y Administrativa",
    "Salud Humana"
  ];

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 10,
      backgroundColor: "#2A364E",
      borderRadius: 20,
      alignItems: "stretch",
    },
    separator: {
      borderBottomColor: '#B3DFE8',
      borderBottomWidth: 1,
      width: '100%',
    },
    modalText: {
      marginBottom: 15,
      color: 'white',
      fontSize: 14,
      margin: 10,
    },
    modalButton: {
      alignItems: "center",
      backgroundColor: "#2A364E",
      padding: 10,
      margin: 10,
      borderRadius: 14,
    },

  });