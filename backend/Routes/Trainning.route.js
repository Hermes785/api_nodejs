const express = require('express');

const { getTraining, postTraining, updateTraining, deleteTraining, getTrainingById, getSearch } = require('../Controller/Trainning.controller');

const router = express.Router();


router.get('/training', getTraining);

router.post('/training', postTraining);

router.put('/training/:id', updateTraining);

router.delete('/training/:id', deleteTraining);

router.get('/trainingId/:id', getTrainingById);

router.get('/training/search', getSearch)

module.exports = router;