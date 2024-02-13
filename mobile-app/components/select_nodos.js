import React, { useState, useMemo, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';

const Item = React.memo(({ item, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{ borderBottomWidth: 1, borderBottomColor: 'white' }}
    >
        <Text style={{ fontSize: 15, color: 'white', padding: 11 }} numberOfLines={1}>{item}</Text>
    </TouchableOpacity>
));

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

    const handlePress = (value) => {
        onValueChange(value);
        setModalVisible(false);
    };

    const renderItem = ({ item }) => (
        <Item item={item} onPress={() => handlePress(item)} />
    );

    const filteredData = useMemo(() =>
        data.filter(item => item.toLowerCase().includes(debouncedSearch.toLowerCase())),
        [data, debouncedSearch]
    );

    return (
        <View>
            <View style={{ width: "99%", alignSelf: 'center', margin: 2 }}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#B3DFE8', padding: 6, borderRadius: 10 }}>
                    <Text style={{ color: '#2A364E', textAlign: 'center' }}>
                        {selectedValue ? `${selectedValue.substring(0, 30)}` : "Pulsa aqui para seleccionar el punto de inicio:"}
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
                    <View style={{ backgroundColor: '#2A364E', height: "50%", width: '80%', alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: 10 }}>
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
                            //Limita el número de elementos que se renderizan en la lista
                            initialNumToRender={10}  
                            maxToRenderPerBatch={10}  
                            removeClippedSubviews={true} 
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default CustomPicker;