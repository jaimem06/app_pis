const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

router.post('/register', async (req, res) => {
    console.log('Enviado por el cliente - ', req.body);
    const { name, email, password,rol, dob } = req.body;

    // Comprobar si ya existe un usuario con este correo electrónico
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json(["Ya existe un usuario con este correo electrónico"]);
    }

    const user = new User({
        name,
        email,
        password,
        rol,
        dob
    })

    try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.json({ token, user: { _id: user._id, name: user.name, email: user.email ,rol :user.rol } });
        //res.send({ message: "Usuario registrado correctamente", token });
    }
    catch (err) {
        console.log(err);
    }
})


router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
})

router.get('/read_users', async (req, res) => {
    const user = await User.find();
    res.send(user);
  });

// Actualizar usuario
router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, rol, dob } = req.body;

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = { name, email, password: hashedPassword, rol, dob };
    await User.findByIdAndUpdate(id, user);
    
    res.json({ message: "Usuario actualizado correctamente" });
}) 

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "Usuario eliminado correctamente" });
}
)


module.exports = router;