const express = require('express');
const router = express.Router();
const SerialPort = require('serialport').SerialPort;
const Readline = require('@serialport/parser-readline').ReadlineParser;


router.get('/com', (req, res) => {
    const port = new SerialPort( {
        path:'COM11',
        baudRate: 9600
    });

    const parser = new Readline();
    port.pipe(parser);

    parser.on('data', data => {
        console.log(data);
      });

    port.write('Hola, mundo!\n', error => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }
        res.send({ message: 'Mensaje enviado' });
    });
});

module.exports = router;