const express = require('express');
const axios = require('axios');
const router = express.Router();

// Enviar una notificación
router.post('/send-notification', (req, res) => {
    const message = {
        to: req.body.expoPushToken,
        sound: 'default',
        title: 'Ruta de Evacuacion',
        body: 'Haga click para ver la ruta de evacuacion',
        data: { data: 'Aquí van los datos adicionales' },
    };

    axios.post('https://exp.host/--/api/v2/push/send', message)
        .then(response => {
            res.json({ message: 'Notificación enviada correctamente!' });
        })
        .catch(error => {
            console.log(error);
            res.json({ error: 'Hubo un error al enviar la notificación' });
        });
});

router.post('/handle-number', (req, res) => {
    const number = req.body.number;
  
    if (number > 7) {
      const message = {
        to: 'ExponentPushToken[Bzu3QBMPsM6kDkG5C5ZaI5]', // Reemplaza esto con el token de Expo del usuario
        sound: 'default',
        title: 'Has ingresado un número mayor a 7!',
        body: 'Cuerpo de la notificación',
        data: { data: 'Aquí van los datos adicionales' },
      };
  
      axios.post('https://exp.host/--/api/v2/push/send', message)
        .then(response => {
          res.json({ message: 'Notificación enviada correctamente!' });
        })
        .catch(error => {
          console.log(error);
          res.json({ error: 'Hubo un error al enviar la notificación' });
        });
    } else {
      res.json({ message: 'El número ingresado es 7 o menor' });
    }
  });

module.exports = router;