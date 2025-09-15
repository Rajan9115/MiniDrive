const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    path:{
        type:String,
        required:[true,'Path is required']
    },
    originalname:{
        type:String,
        required:[true,'Original name is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,'User is requires']
    },
    public_id: { 
        type: String, 
        required: true 
    },
      uploadDate: {
        type: Date,
        default: Date.now   // This automatically stores the current date and time when a new document is created
    }
})


const file =mongoose.model('file',fileSchema)

module.exports=file;