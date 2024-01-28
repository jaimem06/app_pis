import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        textAlign: 'center',
        marginTop: '10%',
        alignContent: "center"

    },
    planContainer: {
        margin: "none",
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: "5%"
    },

    image: {
        width: 400,
        height: 110,
        resizeMode: 'contain',
        marginTop: '2%',
        marginBottom: '10%',
        marginRight: '10%',
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'justify',
        margin: "6%"
    },
    link: {
        backgroundColor: 'skyblue',
        margin: '5%',
        padding: 10,
        borderRadius: 10,
    },
});
