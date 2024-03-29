let receiveDato = null; // Variable para guardar los datos recibidos

const SerialPort = require('serialport').SerialPort;
const Readline = require('@serialport/parser-readline').ReadlineParser;

const port = new SerialPort({
    path: 'COM6',
    baudRate: 9600,
    autoOpen: false // No abrir puerto automáticamente al crear la instancia de SerialPort
});

const parser = new Readline();
port.pipe(parser);

// Agrega un manejador de eventos para el evento 'data'
parser.on('data', data => {
    //console.log('Magnitud:', data);
    receiveDato = data; // Guarda los datos recibidos en la variable
    
}

);

// Función para abrir el puerto
function openPort() {
    if (!port.isOpen) {
        port.open(error => {
            if (error) {
                console.error(error.message);
                return;
            }
            console.log('Puerto listo...');
        });
    }
}

module.exports = {
    openPort: openPort,
    // Exporta la variable como una función para obtener los datos recibidos
    receiveDato: () => receiveDato 
};