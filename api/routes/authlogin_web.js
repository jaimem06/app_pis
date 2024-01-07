const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const TOKEN_SECRET = 'secret-token';

//Evaluar inicio de Sesion para la pagina WEB
router.post('/login_web', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Añadir correo electrónico o contraseña" });
    }
    const savedUser = await User.findOne({ email: email })

    if (!savedUser) {
        return res.status(422).json({message:"Credenciales no válidas"} );
    }

    try {
        bcrypt.compare(password, savedUser.password, (err, result) => {
            if (result) {
                console.log("Contraseña correcta");
                const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                res.cookie('token', token);
                res.json({ token, user: { _id: savedUser._id, name: savedUser.name, email: savedUser.email } });
                //res.send({ token });
            }
            else {
                console.log('La contraseña no coincide');
                return res.status(422).json( {message:"Credenciales no válidas"});
            }
        })
    }
    catch (err) {
        console.log(err);
    }
})

router.get('/verifyToken', (req, res) => {
    const {token} = req.cookies;
    if (!token) {
        return res.json({ error: "No se ha iniciado sesión" });
    }
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) {    
            return res.json({ error: "No se ha iniciado sesión" });
        }
        const userFound = await User.findById(user.id);
        if (!userFound) {
            return res.status(401).json({ error: "No se ha iniciado sesión" });
        }
        return  res.json({ user: { _id: userFound._id, name: userFound.name, email: userFound.email } });

    })
     

})
router.get('/logout', async (req, res) => {
    res.cookie('token','', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),  
    });
    return res.sendStatus(200);
  });


module.exports = router;