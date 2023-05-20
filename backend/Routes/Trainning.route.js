const express = require('express');
const { postTraining, getTraining, updateTraining, deleteTraining } = require('../Controller/Trainning.controller');

const router = express.Router();


router.get('/', getTraining);

router.post('/', postTraining);

router.put('/:id', updateTraining);

router.delete('/:id', deleteTraining);

module.exports = router;