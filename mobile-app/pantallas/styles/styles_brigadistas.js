import { StyleSheet } from 'react-native';

export const facultades = [
    "Administración Central",
    "Bienestar Universitario",
    "Educación a Distancia",
    "Agropecuaria y de Recursos Nat Renovables",
    "Energía, las Ind y los Recursos Nat No Renovables",
    "Educación el Arte y la Comunicación",
    "Jurídica, Social y Administrativa",
    "Salud Humana"
  ];

export const responsabilidades = [
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
  
  export const styles = StyleSheet.create({
    title: {
      color: '#B3DFE8',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  
    titleP: {
      color: '#2A364E',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '10%',
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
  