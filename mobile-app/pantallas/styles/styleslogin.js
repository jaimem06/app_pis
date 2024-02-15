import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  //Estilos de la pantalla.
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 130,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'rgba(143, 142, 142, 0.30)',
    backgroundColor: 'rgba(143, 142, 142, 0.35)', // 35% de transparencia
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 35, // Ajusta el margen derecho para el icono del ojo
    borderRadius: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  button: {
    backgroundColor: '#2A364E',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 50,
    color: '#2A364E',
    
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'normal',
  },

  bottomButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },

  bottomButton: {
    flex: 1, // Asegura que cada botón ocupe la mitad del espacio disponible
    backgroundColor: '#2A364E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  forgotPasswordText: {
    color: '#868686',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },

});