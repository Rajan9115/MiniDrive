const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        trim: true,
        lowercase:true,
        minLength:[3,'Username must be atleast 3 characters long']
    },

    email:{
        type:String,
        required: true,
        trim: true,
        lowercase:true,
        unique:true,
        minLength:[10,'Email must be atleast 10 characters long']
    },

    password:{
        type:String,
        required: true,
        trim: true,
        minLength:[5,'Password must be atleast 5 characters long']
    }
})

//user is collection name and it uses userSchea to create user
const user = mongoose.model('user',userSchema)


module.exports = user;


