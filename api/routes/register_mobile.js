const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.post('/register_mobile', async (req, res) => {
    console.log('Enviado por el cliente - ', req.body);
    const { name, email, password, dob } = req.body;

    // Comprobar si ya existe un usuario con este correo electrónico
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Ya existe un usuario con este correo electrónico" });
    }

    const user = new User({
        name,
        email,
        password,
        dob
    })

    try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.send({ message: "Usuario registrado correctamente", token });
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;