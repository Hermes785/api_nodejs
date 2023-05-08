const express = require('express')

const { getUser, createUser, UpdateUser, DeleteUser } = require('../Controller/Usercontroller')

const router =  express.Router();

router.get('/',getUser);

router.post('/create',createUser);

//router.put('/:id',UpdateUser);

router.delete('/:id',DeleteUser);

module.exports= router;