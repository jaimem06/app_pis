import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MenuButtonItem = ({ text, onPress, iconName, buttonColor }) => {
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: buttonColor || '#2A364E' }]}
            onPress={onPress}
        >
            <MaterialCommunityIcons name={iconName} size={27} color="#B3DFE8"
            />
            <Text style={styles.text}> {text} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    buttonContainer: {
        alignItems: 'center',
        padding: 7,
        marginBottom: 8,
        borderRadius: 15,
        flexDirection: 'row', //Para que se muestre todo en horizontal
    },

    text: {
        color: '#B3DFE8',
        fontWeight: 'medium',
    }
});

export default MenuButtonItem