const express = require('express');
const { postFormation, getFormation, updateFormation, deleteFormation } = require('../Controller/Formation.controller');

const router =  express.Router();


router.get('/',getFormation);

router.post('/',postFormation);

router.put('/:id',updateFormation);

router.delete('/:id',deleteFormation);

module.exports=router;