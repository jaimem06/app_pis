// sismo.js
const express = require('express');
const router = express.Router();

router.post('/simular_sismo', (req, res) => {
    // Número aleatorio entre 1 y 10 con dos decimales
    const magnitud = (Math.random() * 9 + 1).toFixed(2); 
    res.json({ magnitud });
});

module.exports = router;
