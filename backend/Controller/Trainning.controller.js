const FormationModel = require('../Models/Tranning.model');

module.exports.getTraining = async (req, res) => {
    const formation = await FormationModel.find();
    res.status(200).json(formation)
}
const multer = require('multer');
const upload = multer({ dest: './backend/uploads' }); // configure le dossier de destination des fichiers uploadés

//this fuction create a new formation in the database
module.exports.postTraining = async (req, res) => {
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
            city: req.body.city,
            school: req.body.school
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
module.exports.deleteTraining = async (req, res) => {
    const formation = await FormationModel.findById(req.params.id);
    if (!formation) {
        res.status(404).json({ message: 'formation non trouvée' });
    }
    await FormationModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'formation supprimé' });
};



// this function update a formation in the database the first about this function verify if the id exist in the database 
module.exports.updateTraining = async (req, res) => {
    const formation = await FormationModel.findById(req.params.id);
    if (!formation) {
        res.status(404).json({ message: 'formation non trouvée' });
    }
    const UpdateFormation = await FormationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(UpdateFormation);
};



// this function  list all the formation in the database
module.exports.getTrainingById = async (req, res) => {
    const formation = await FormationModel.findById(req.params.id);
    res.status(200).json(formation);
};


