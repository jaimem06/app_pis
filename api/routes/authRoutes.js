const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 
require('dotenv').config();
// 


router.post('/signup', async (req, res) => {
    console.log('Enviado por el cliente - ', req.body);
    const { name, email, password, dob  } = req.body;

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

router.post('/verify', (req, res) => {
    console.log('sent by client - ', req.body);
    const { name, email, password, dob,  } = req.body;
    if (!name || !email || !password || !dob) {
        return res.status(422).json({ error: "Por favor, llene todos los campos" });
    }

    User.findOne({ email: email })
        .then(async (savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Credenciales no válidas" });
            }
            try {

                let VerificationCode = Math.floor(100000 + Math.random() * 900000);
                let user = [
                    {
                        name,
                        email,
                        password,
                        dob,
                        VerificationCode
                    }
                ]
                await mailer(email, VerificationCode);
                res.send({ message: "Código de verificación enviado a su correo electrónico", udata: user });
            }
            catch (err) {
                console.log(err);
            }
        })

})

//Evaluar inicio de Sesion
router.post('/signin', async (req, res) => {
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

router.get('/get', (req, res) => {
        User
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
    
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const { name, email, password, dob} = req.body;
    User
    .updateOne({_id:id},{$set:{name: name, email: email, password: password, dob: dob}},req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get('/name/:name', (req, res) => {
    const name = req.params.facultad;
    Usert
    .find({name:name})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
//borrar user
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    User
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;