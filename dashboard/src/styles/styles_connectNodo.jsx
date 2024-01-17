export const selectstyles = {
    control: (base, state) => ({
        ...base,
        height: '40px',
        minHeight: '40px',
        width: '200px',
        minWidth: '200px',
        margin: '10px',
        backgroundColor: 'white',
        boxShadow: state.isFocused ? '0 0 0 2px ocean' : null, // Color del borde cuando el select está enfocado
        color: 'white', // Color del texto en el control
    }),
    option: (styles, { isSelected }) => {
        return {
            ...styles,
            backgroundColor: isSelected
                ? '#748FCC' // Color de fondo del elemento seleccionado
                : null,
            color: isSelected ? 'ocean' : '#2A364E', // Color del texto
        };
    },
    singleValue: (styles) => ({
        ...styles,
        color: 'black', // Color del texto del elemento seleccionado en el control
    }),
};

export const titulostyles = {
    textAlign: 'center',
    color: "white",
    backgroundColor: "#2A364E",
    fontSize: "25px"
};

export const buttonConect = {
    color: "#2A364E",
    backgroundColor: "#8bb6e2",
    margin: "10px", 
    borderRadius: "10px",
    padding: "5px",
    border: "2px solid #2A364E",
    fontWeight: 'bold',
};