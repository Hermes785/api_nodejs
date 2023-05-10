const FormationModel = require('../Models/formation.model');

module.exports.getFormation = async (req, res) => {
    const formation = await FormationModel.find();
    res.status(200).json(formation)
}
const multer = require('multer');
const upload = multer({ dest: './backend/uploads' }); // configure le dossier de destination des fichiers uploadés

//this fuction create a new formation in the database
module.exports.postFormation = async (req, res) => {
    upload.single('picture')(req, res, async function (err) {

        if (err) {

            res.status(400).json({ message: 'une errur est survenu' });
        }
        const formation = await FormationModel.create({

            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            outlet: req.body.outlet,
            price: req.body.price,
            picture: req.file.path,
            ville: req.body.ville,

        })

        if (formation) {
            console.log(req.body);
            return res.status(200).json(formation);
        } else {

            res.status(400).json({ message: 'une errur est survenu' });
        }
    });
};



//this function  delete a formation in the database the first about this function verify if the id exist in the database 
module.exports.deleteFormation = async (req, res) => {
    const formation = await FormationModel.findById(req.params.id);
    if (!formation) {
        res.status(404).json({ message: 'formation non trouvée' });
    }
    await FormationModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'formation supprimé' });
};



// this function update a formation in the database the first about this function verify if the id exist in the database 
module.exports.updateFormation = async (req, res) => {
    const formation = await FormationModel.findById(req.params.id);
    if (!formation) {
        res.status(404).json({ message: 'formation non trouvée' });
    }
    const UpdateFormation = await FormationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(UpdateFormation);
};



// this function  list all the formation in the database
module.exports.getFormationById = async (req, res) => {
    const formation = await FormationModel.findById(req.params.id);
    res.status(200).json(formation);
};


