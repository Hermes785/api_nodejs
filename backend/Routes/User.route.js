const express = require('express')

const { getUser, createUser, UpdateUser, DeleteUser, getUserById } = require('../Controller/Usercontroller')

const router = express.Router();

router.post('/user/', getUser);

router.post('/user/create', createUser);

router.put('/user/:id', UpdateUser);

router.delete('/user/:id', DeleteUser);

router.get('/user/:id', getUserById)

module.exports = router;