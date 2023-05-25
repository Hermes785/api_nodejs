const express = require('express');
const { postTraining, getTraining, updateTraining, deleteTraining, getSearch, getTrainingById } = require('../Controller/Trainning.controller');
const { getServers } = require('dns');

const router = express.Router();


router.get('/training', getTraining);

router.post('/training', postTraining);

router.put('/training/:id', updateTraining);

router.delete('/training/:id', deleteTraining);

router.get('/training/search', getSearch)

router.get('/trainingId/:id', getTrainingById)
module.exports = router;