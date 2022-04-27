const { Schema, model } = require('mongoose');

const fav = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String, 
        required: true,
    },
        
    link: {
        type:String,
        required: true,
    },
})

const favSchema = new Schema(
    {
        user:
        {
            type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            required: true
        },

        name: {
            type: String,
            required: true,
        },

        favs:
        {
            type: [fav],
            required: true
        },       
    },
    { 
        timestamps: true,
    }
);

const Fav = model('Fav', favSchema);
module.exports = Fav;