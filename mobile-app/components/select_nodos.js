import React, { useState, useMemo, useEffect, useCallback } from 'react';  // Importa useCallback
import { Modal, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';

const Item = React.memo(({ item, onPress }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
            style={{ borderBottomWidth: 1, borderBottomColor: 'white' }}
        >
            <Text style={{ fontSize: 15, color: 'white', padding: 11 }} numberOfLines={1}>{item}</Text>
        </TouchableOpacity>
    );
});

const CustomPicker = ({ data, selectedValue, onValueChange }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [search]);

    const handleValueChange = (value) => {
        onValueChange(value);
        setModalVisible(false);
    };

    const renderItem = useCallback(({ item }) => (
        <Item item={item} onPress={handleValueChange} />
    ), [handleValueChange]);

    const filteredData = useMemo(() =>
        data.filter(item => item.toLowerCase().includes(debouncedSearch.toLowerCase())),
        [data, debouncedSearch]
    );

    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#B3DFE8', padding: 8, borderRadius: 10, margin: 5 }}>
                    <Text style={{ color: '#2A364E', textAlign: 'center' }}>
                        {selectedValue ? `${selectedValue.substring(0, 40)}` : "Pulsa aquí para seleccionar el punto de partida"}
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(false)}>
                    <View style={{ backgroundColor: '#2A364E', height: "50%", width: '90%', alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: 10 }}>
                        <TextInput
                            style={{ height: 40, color: "white", borderRadius: 20, borderColor: '#B3DFE8', borderWidth: 3, width: '100%', marginBottom: 10, paddingLeft: 10 }}
                            onChangeText={text => setSearch(text)}
                            value={search}
                            placeholder="Search"
                            placeholderTextColor="#ccc"
                        />
                        <FlatList
                            data={filteredData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default CustomPicker;