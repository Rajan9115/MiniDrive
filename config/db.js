const mongoose = require('mongoose');


function connectToDB(){
mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
       console.log('Connected to database') 
    })
}





module.exports = connectToDB;