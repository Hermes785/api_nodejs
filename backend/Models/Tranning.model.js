const mongoose = require('mongoose');

const formationShema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true

        },

        description: {
            type: String,
            required: true

        },
        duration: {
            type: Number,
            required: true
        },
        outlet: {
            type: [String],
            required: true
        },
        price: {
            type: Number,
            required: true
        },

        picture: {
            type: String,
            //required: true
        },
        city: {
            type: String,
            required: true
        },
        school: {
            type: String,
            required: true
        },

        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    },

    {
        timestamps: true
    }

);
module.exports = mongoose.model('formation', formationShema)