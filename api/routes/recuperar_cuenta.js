require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


router.post('/recuperar_cuenta', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send('No se encontró ningún usuario con ese correo electrónico');
    }
    // Genera un número aleatorio de 6 dígitos
    const token = Math.floor(100000 + Math.random() * 900000);

    user.TokenrecuperarCuenta = token;
    user.TokenVencimiento = Date.now() + 3600000; // 1 hora

    await user.save();

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        to: email,
        from: 'FRED-UNL',
        subject: 'Restablecimiento de contraseña',
        html: `
            <h1>FRED-UNL Restablecer Contraseña</h1>
            <p>Copia el siguiente código para restablecer tu contraseña:</p>
            <span style="font-size: 24px; color: #2A364E; border: 2px solid #B3DFE8; border-radius: 10px; padding: 5px;"><strong>${token}</strong></span>
            <p>El código expirará en 1 hora.</p>
            <p>Si no solicitaste un restablecimiento de contraseña, por favor, ignora este correo electrónico.</p>
        `
    };

    transporter.sendMail(mailOptions, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'No se pudo enviar el correo electrónico de restablecimiento de contraseña.' });
        }
        res.send({ message: 'Se ha enviado un correo electrónico con más instrucciones.' });
    });
});

router.post('/reset/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ TokenrecuperarCuenta: token, TokenVencimiento: { $gt: Date.now() } });

    if (!user) {
        return res.status(400).send('El token de restablecimiento de contraseña es inválido o ha vencido');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.TokenrecuperarCuenta = undefined;
    user.TokenVencimiento = undefined;

    await user.save();

    res.send({ message: 'Tu contraseña ha sido cambiada' });
});

module.exports = router;