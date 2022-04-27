const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        lastname: {
            type: String,
            required: true,
        },

        email: {
            type: String, 
            required: true,
        },
            
        password: {
            type:String,
            required: true,
        },
    },
    { 
        timestamps: true,
    }
);

userSchema.pre('save', async function(){
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
});

const User = model('User', userSchema);
module.exports = User;