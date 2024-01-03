const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Evaluar inicio de Sesion para la app mobile
router.post('/login_mobile', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Añadir correo electrónico o contraseña" });
    }
    const savedUser = await User.findOne({ email: email })

    if (!savedUser) {
        return res.status(422).json({ error: "Credenciales no válidas" });
    }

    try {
        bcrypt.compare(password, savedUser.password, (err, result) => {
            if (result) {
                console.log("Contraseña correcta");
                const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                res.send({ token });
            }
            else {
                console.log('La contraseña no coincide');
                return res.status(422).json({ error: "Credenciales no válidas" });
            }
        })
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;