import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buscarButton: {
        backgroundColor: '#B3DFE8',
        padding: 5,
        width: "88%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 15,
    },
    mapViewContainer: {
        borderWidth: 8,
        borderColor: 'white',
        borderRadius: 10,
        height: '65%',
        width: '90%',
        marginTop: 10,
        alignSelf: 'center',
    },
    buscarText: {
        color: '#2A364E',
        fontSize: 20
    },
    infoRuta: {
        width: '90%',
        marginTop: 10,
        height: "14%",
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#B3DFE8',
        borderWidth: 2, 
      },
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30,
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'red',
            paddingRight: 30,
        },
});