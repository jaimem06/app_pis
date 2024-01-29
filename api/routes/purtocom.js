const express = require('express');
const router = express.Router();
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

router.get('/com', (req, res) => {
    const port = new SerialPort('COM3', {
        baudRate: 9600
    });

    const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

    parser.on('data', data => {
        console.log(data);
        // Aquí puedes manipular los datos recibidos
    });

    port.write('Hola, mundo!\n', error => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }
        res.send({ message: 'Mensaje enviado' });
    });
});

module.exports = router;