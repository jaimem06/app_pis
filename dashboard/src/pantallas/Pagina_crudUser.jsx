import { useForm } from "react-hook-form";
import { useAuth } from "../contexto/authcontext";
import { useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest, updateUserRequest, readallUserRequest, deleteUserRequest } from "../api/auth";
import {
    tablaStyle, filaStyle, celdaStyle, deletebutton, buttonCrearNodo, editbutton,
    celdaButtons, buttonBuscar, inputBuscar
} from '../styles/styles_pageNodo';
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import FormRegisterUser from "./forms/Form_RegisterUser";
import FormEditarUser from "./forms/Form_EditUser";
function Pagina_crudUser() {


    const [showEditForm, setShowEditForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        rol: '',
        dob: ''
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await readallUserRequest();
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    //Crear Usuario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.password || !user.rol || !user.dob) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        try {
            await registerRequest(user);
            setUsers(prevUsers => [...prevUsers, user]);
            setShowForm(false);
            alert('Usuario creado exitosamente!');
        } catch (error) {
            alert("El correo ya existe ");
        }
    }

    const handleCancel = () => {
        setShowForm(false);
    }
    const handleEdit = (index) => {
        const userToEdit = users[index];
        setUser(userToEdit);
        setShowEditForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleUpdate = async () => {
        try {
            const updatedUser = {
                name: user.name,
                email: user.email,
                password: user.password,
                rol: user.rol,
                dob: user.dob
            };
            await updateUserRequest(user._id, updatedUser);

            setShowEditForm(false);
        } catch (error) {
            console.error(error);
            setErrorMessage('Error al actualizar el usuario');
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchQueryLower = searchQuery.toLowerCase();
        try {
            const response = await readallUserRequest(searchQueryLower);
            if (response.data.length === 0) {
                setErrorMessage('Los datos no existen en la base');
            } else {
                const filteredUsers = response.data.filter(user =>
                    user.name.toLowerCase().includes(searchQueryLower) ||
                    user.email.toLowerCase().includes(searchQueryLower) ||
                    user.rol.toLowerCase().includes(searchQueryLower)
                );

                if (filteredUsers.length === 0) {
                    setErrorMessage('No se encontró al usuario');
                } else {
                    setErrorMessage('');
                    setUsers(filteredUsers);
                }
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Verifique los datos ingresados, error en la busqueda');
        }
    };

    const handleDelete = (index) => {
        const userToDelete = users[index];
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar el usuario ${userToDelete.name}?`);
        if (confirmDelete) {
            deleteUserRequest(userToDelete._id)
                .then(response => {
                    console.log(response.data);
                    // Actualiza el estado de los usuarios después de eliminar el usuario
                    const newUsers = users.filter((user, i) => i !== index);
                    setUsers(newUsers);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '25px', backgroundColor: "#2A364E", color: 'white', marginBottom: "10px" }}>Gestión de Usuario</h1>
            <div>
                <div style={{ display: 'flex', marginLeft: "50px", marginBottom: "5px" }}>
                    <form onSubmit={handleSearch}>
                        <input
                            style={inputBuscar}
                            type="text"
                            placeholder="Buscar"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            required
                        />
                        <button style={buttonBuscar} type="submit"><AiOutlineSearch /></button>
                    </form>
                    <button style={buttonCrearNodo} onClick={() => setShowForm(!showForm)}>Crear Usuario</button>
                </div>
                {errorMessage && <p style={{ color: 'red', fontSize: '16px', textAlign: 'center', paddingBottom: '5px' }}>{errorMessage}</p>}
                {showForm && (
                    <FormRegisterUser
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}
                    />
                )}
                <div style={{ display: 'flex', justifyContent: 'center', height: '85vh' }}>
                    <div style={{ overflow: 'auto', height: 'auto' }}>
                        <table style={tablaStyle}>
                            <thead>
                                <tr style={filaStyle}>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Date of Birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr style={filaStyle} key={index}>
                                        <td style={celdaStyle}>{user.name}</td>
                                        <td style={celdaStyle}>{user.email}</td>
                                        <td style={celdaStyle}>{user.rol}</td>
                                        <td style={celdaStyle}>{user.dob}</td>
                                        <td style={celdaButtons}>
                                            <button style={editbutton} onClick={() => handleEdit(index)}>
                                                <AiFillEdit style={{ color: "white", fontSize: "24px" }} />
                                            </button>

                                            <button style={deletebutton} onClick={() => handleDelete(index)}> <AiFillDelete
                                                style={{ color: "white", fontSize: "24px" }} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {showEditForm && (
                    <FormEditarUser
                        user={user}
                        setUser={setUser}
                        handleChange={handleChange}
                        handleSubmit={handleUpdate}
                        handleCancel={() => setShowEditForm(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default Pagina_crudUser;