import { useForm } from "react-hook-form";
import { useAuth } from "../contexto/authcontext";
import { useState, useEffect } from "react";
import { createBrigadistaRequest, readallBrigadistaRequest, updateBrigadistaRequest, deleteBrigadistaRequest } from "../api/auth";
import {
    tablaStyle, filaStyle, celdaStyle, deletebutton, buttonCrearNodo, editbutton,
    celdaButtons, buttonBuscar, inputBuscar
} from '../styles/styles_pageNodo';
import { formCrearBrigadista, formEditarBrigadista } from '../styles/styles_brigadista';
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import ForCrearBrigadista from "./forms/Form_CrearBrigadista";
import Form_EditBrigadista from "./forms/Form_EditBrigadista";
function Pagina_crudBrigadista() {
    const [showEditForm, setShowEditForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [brigadista, setBrigadista] = useState({
        titular: [{ nombresCompletos: '', nroTitular: null }],
        reemplazo: [{ nombresCompletos: '', nroReemplazo: null }],
        area: ''
    });
    const [selectedBrigadistaId, setSelectedBrigadistaId] = useState(null);
    const [brigadistas, setBrigadistas] = useState([]);

    useEffect(() => {
        const fetchBrigadistas = async () => {
            const response = await readallBrigadistaRequest();
            setBrigadistas(response.data);
        };

        fetchBrigadistas();
    }, []);
    //Crear Brigadista
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(brigadista);
        if (!brigadista || !brigadista.area) {
            alert('Por favor, complete todos los campos1.');
            return;
        }

        for (let i = 0; i < brigadista.titular.length; i++) {
            if (!brigadista.titular[i].nombresCompletos || !brigadista.titular[i].nroTitular) {
                alert('Por favor, complete todos los campos2.');
                return;
            }
        }

        for (let i = 0; i < brigadista.reemplazo.length; i++) {
            if (!brigadista.reemplazo[i].nombresCompletos || !brigadista.reemplazo[i].nroReemplazo) {
                alert('Por favor, complete todos los campos3.');
                return;
            }
        }

        try {
            await createBrigadistaRequest(brigadista);
            setBrigadistas(prevBrigadistas => [...prevBrigadistas, brigadista]);
            setShowForm(false);
            alert('Brigadista creado exitosamente!');
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancel = () => {
        setShowForm(false);
    }
    const handleEdit = (index) => {
        const brigadistaToEdit = brigadistas[index];
        setBrigadista(brigadistaToEdit);
        setSelectedBrigadistaId(brigadistaToEdit._id);
        setShowEditForm(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrigadista(prevBrigadista => {
            const updatedBrigadista = { ...prevBrigadista };

            if (name.startsWith('nombresCompletosTitular')) {
                const index = parseInt(name.replace('nombresCompletosTitular', '')) - 1;
                if (!updatedBrigadista.titular[index]) {
                    updatedBrigadista.titular[index] = { nombresCompletos: '', nroTitular: index + 1 };
                }
                updatedBrigadista.titular[index].nombresCompletos = value;
                updatedBrigadista.titular[index].nroTitular = index + 1;  // Asegúrate de que nroTitular se establezca después de que el objeto titular haya sido creado
            } else if (name.startsWith('nombresCompletosReemplazo')) {
                const index = parseInt(name.replace('nombresCompletosReemplazo', '')) - 1;
                if (!updatedBrigadista.reemplazo[index]) {
                    updatedBrigadista.reemplazo[index] = { nombresCompletos: '', nroReemplazo: index + 1 };
                }
                updatedBrigadista.reemplazo[index].nombresCompletos = value;
                updatedBrigadista.reemplazo[index].nroReemplazo = index + 1;  // Asegúrate de que nroReemplazo se establezca después de que el objeto reemplazo haya sido creado
            } else {
                updatedBrigadista[name] = value;
            }
            return updatedBrigadista;
        });
    };

    const handleUpdate = async () => {
        try {
            const updatedBrigadista = {
                titular: brigadista.titular.map(titular => ({
                    nombresCompletos: titular.nombresCompletos,
                    nroTitular: titular.nroTitular
                })),
                reemplazo: brigadista.reemplazo.map(reemplazo => ({
                    nombresCompletos: reemplazo.nombresCompletos,
                    nroReemplazo: reemplazo.nroReemplazo
                })),

                area: brigadista.area
            };
            await updateBrigadistaRequest(brigadista._id, updatedBrigadista);
            // Actualiza el estado de los brigadistas después de actualizar el brigadista
            fetchBrigadistas();
            setShowEditForm(false);
        } catch (error) {
            console.error(error);
            setErrorMessage('Error al actualizar el brigadista');
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchQueryLower = searchQuery.toLowerCase();
        try {
            const response = await readallBrigadistaRequest(searchQueryLower);
            if (response.data.length === 0) {
                setErrorMessage('Los datos no existen en la base');
            } else {
                setErrorMessage('');
                setBrigadistas(response.data.filter(brigadista =>
                    brigadista.titular[0].nombresCompletos.toLowerCase().includes(searchQueryLower) ||
                    brigadista.reemplazo[0].nombresCompletos.toLowerCase().includes(searchQueryLower) ||
                    brigadista.area.toLowerCase().includes(searchQueryLower)
                ));
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Verifique los datos ingresados, error en la busqueda');
        }


    }
    const handleDelete = async (index) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este brigadista?')) {
          try {
            await deleteBrigadistaRequest(brigadistas[index]._id);
            setBrigadistas(prevBrigadistas => prevBrigadistas.filter((brigadista, i) => i !== index));
          } catch (error) {
            console.error(error);
            setErrorMessage('Error al eliminar el brigadista');
          }
        }
      };
    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '25px', backgroundColor: "#2A364E", color: 'white', marginBottom: "10px" }}>Gestión de Brigadistas</h1>
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
                    <button style={buttonCrearNodo} onClick={() => setShowForm(!showForm)}>Crear Brigadista</button>
                </div>
                {errorMessage && <p style={{ color: 'red', fontSize: '16px', textAlign: 'center', paddingBottom: '5px' }}>{errorMessage}</p>}
                {showForm && (
                    <ForCrearBrigadista
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}
                    />
                )}
                <div style={{ overflow: 'auto', height: '100%', marginLeft: '2%', flexWrap: 'wrap', justifyContent: 'inherit', display: 'flex',}}>
                    {Array.isArray(brigadistas) && brigadistas.map((brigadista, index) => (
                        <div key={brigadista._id} style={{ display: 'flex', alignContent: 'start', flexBasis: '18rem', margin: '1%' }}>
                            <div className="card" style={{ width: "100%", height: '100%', color: 'black', border: '2px black solid',backgroundColor:'white', borderRadius: '2%', marginTop: '2%' }} key={index}>
                                <div className="card-body">

                                    <div className="card-text">
                                        {brigadista.titular.map((titular, index) => (
                                            <p key={`titular-${index}`}>
                                                Titular {titular.nroTitular} : {titular.nombresCompletos}
                                            </p>
                                        ))}
                                        {brigadista.reemplazo.map((reemplazo, index) => (
                                            <p key={`reemplazo-${index}`}>
                                                Reemplazo {reemplazo.nroReemplazo} : {reemplazo.nombresCompletos}
                                            </p>
                                        ))}
                                        <p>Área: {brigadista.area}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button style={{ ...editbutton, marginRight: '2px' }} onClick={() => handleEdit(index)}>
                                            <AiFillEdit style={{ color: "white", fontSize: "24px" }} />
                                        </button>

                                        <button style={{ ...deletebutton, marginLeft: '2px' }} onClick={() => handleDelete(index)}>
                                            <MdDelete style={{ color: "white", fontSize: "24px" }} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                           
                        </div>

                    ))}

                </div>
                {selectedBrigadistaId === brigadista._id && showEditForm && (
                                <div style={formCrearBrigadista} >
                                    <Form_EditBrigadista
                                        brigadista={brigadista}
                                        setBrigadista={setBrigadista}
                                        handleSubmit={handleUpdate}
                                        handleCancel={() => {
                                            setShowEditForm(false);
                                            setSelectedBrigadistaId(null); // Reseteamos el ID del brigadista seleccionado cuando se cancela la edición
                                        }}
                                    />
                                </div>
                            )}
            </div>
        </div>
    )
}


export default Pagina_crudBrigadista;