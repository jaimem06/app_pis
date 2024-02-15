import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    modal: {
        backgroundColor: '#2A364E',
        padding: 35,
        borderRadius: 10,
        borderColor: '#B3DFE8',
        borderWidth: 3,
    },
    message: {
        color: '#B3DFE8',
        marginBottom: 20,
        fontSize: 16,
    },
    BtnSolicitar: {
        backgroundColor: '#B3DFE8',
        borderRadius: 10,
        padding: 10,
    },
    BtnSolicitarText: {
        color: '#2A364E',
        textAlign: 'center',
        fontSize: 17,
    },
    input: {
        height: 40,
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 10,
    },
});