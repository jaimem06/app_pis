import { useState, useEffect } from 'react';
import {
    createNodoRequest,
    readallNodoRequest,
    deleteNodoRequest,
    searchNodoRequest,
    updateNodoRequest
} from '../api/auth'; //CRUD NODES

export const useNodos = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showMap, setShowMap] = useState(false); // Llamar al mapa
    const [nodo, setNodo] = useState({
        type: 'Feature',
        properties: {
            nombre: '',
            facultad: '',
            tipo: '',
            conexiones: []
        },
        geometry: {
            type: 'Point',
            coordinates: []
        }
    });

    const [nodos, setNodos] = useState([]);

    useEffect(() => {
        const fetchNodos = async () => {
            const response = await readallNodoRequest();
            setNodos(response.data);
        };

        fetchNodos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "coordinates") {
            setNodo(prevState => ({
                ...prevState,
                geometry: {
                    ...prevState.geometry,
                    coordinates: value.split(',').map(Number)
                }
            }));
        } else if (name in nodo.properties) {
            setNodo(prevState => ({
                ...prevState,
                properties: {
                    ...prevState.properties,
                    [name]: value
                }
            }));
        } else if (name in nodo.geometry) {
            setNodo(prevState => ({
                ...prevState,
                geometry: {
                    ...prevState.geometry,
                    [name]: value
                }
            }));
        } else {
            setNodo(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }
    //Agregar un nodo
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nodo.properties.facultad || !nodo.properties.tipo) {
            alert('Por favor, seleccione una facultad y un tipo.');
            return;
        }

        try {
            const response = await createNodoRequest(nodo);
            console.log(response.data);
            setNodos(prevNodos => [...prevNodos, response.data]);
            setShowForm(false);
            alert('Nodo creado exitosamente!');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Ocurrió un error al crear el nodo.');
            }
        }
    }

    //Cancelar formulario
    const handleCancel = () => {
        setShowForm(false);
    }

    //Eliminar un nodo
    const handleDelete = (index) => {
        const nodoToDelete = nodos[index];
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar el nodo ${nodoToDelete.properties.nombre}?`);
        if (confirmDelete) {
            deleteNodoRequest(nodoToDelete.geometry.coordinates)
                .then(response => {
                    console.log(response.data);
                    // Actualiza el estado de los nodos después de eliminar el nodo
                    const newNodos = nodos.filter((nodo, i) => i !== index);
                    setNodos(newNodos);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };
    const handleSearch = async (event) => {
        event.preventDefault();
        const searchQueryLower = searchQuery.toLowerCase();
        try {
            const response = await searchNodoRequest(searchQueryLower);
            if (response.data.length === 0) {
                setErrorMessage('Los datos no existen en la base');
            } else {
                setErrorMessage('');
                setNodos(response.data.filter(nodo =>
                    nodo.properties.nombre.toLowerCase().includes(searchQueryLower) ||
                    nodo.properties.facultad.toLowerCase().includes(searchQueryLower) ||
                    nodo.properties.tipo.toLowerCase().includes(searchQueryLower)
                ));
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Verifique los datos ingresados, error en la busqueda');
        }
    };

    const [showEditForm, setShowEditForm] = useState(false);
    const handleEdit = (index) => {
        const nodoToEdit = nodos[index];
        setNodo(nodoToEdit);
        setShowEditForm(true);
    };

    //Actualizar nodo
    const handleUpdate = async () => {
        try {
            const updatedNodo = {
                nombre: nodo.properties.nombre,
                facultad: nodo.properties.facultad,
                tipo: nodo.properties.tipo,
                geometry: nodo.geometry
            };
            await updateNodoRequest(nodo._id, updatedNodo);
            // Actualiza el estado de los nodos después de actualizar el nodo
            loadNodos();
            setShowEditForm(false);
        } catch (error) {
            console.error(error);
            setErrorMessage('Error al actualizar el nodo');
        }
    };
    return {
        searchQuery,
        setSearchQuery,
        errorMessage,
        showForm,
        setShowForm,
        showMap,
        setShowMap,
        nodos,
        handleChange,
        handleSubmit,
        handleCancel,
        handleDelete,
        handleSearch,
        handleEdit,
        handleUpdate,
        showEditForm, 
        setShowEditForm, 
        nodo,
        setNodo
    };
};