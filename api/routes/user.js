const express = require('express');
const userSchema = require('../models/User.js');
const router = express.Router();

router.post('/', (req, res) => {    
    const user =userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }	));
}   );

router.get('/', (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get('/name/:name', (req, res) => {
    const name = req.params.facultad;
    userSchema
    .find({name:name})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const { name, email, password, dob} = req.body;
    userSchema
    .updateOne({_id:id},{$set:{name: name, email: email, password: password, dob: dob}},req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});   
//borrar nodo
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    userSchema
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;