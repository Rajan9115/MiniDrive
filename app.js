const express = require('express')
const app = express()
app.set("view engine",'ejs')
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//use env variable anywhere in app install dotenv and require here
const dotenv = require('dotenv');
dotenv.config();
//express-fileupload  to upload file on cloudinary
const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/' // or any folder you prefer
}));

const authMiddleware = require('./middlewares/authe')
const fileModel = require('./models/files.model');

//custom middleware to clear the token on every request
app.use((req, res, next) => {
  if (req.path === '/' || req.path === '/logout') {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }
  next();
});
//connect app to db
const connectToDB = require('./config/db')
connectToDB();
const cloudinaryConnect =require("./config/cloudinary.config");
cloudinaryConnect();
const cookieParser =require('cookie-parser')
app.use(cookieParser())





//we will not create any direct here we use it from routes folder
app.use('/',indexRouter)
app.use('/',userRouter)


// Define /home route 
app.get('/home', authMiddleware,async (req, res) => {
    const files = await fileModel.find({ user: req.user.userId }); // or just `[]` for testing
    res.render('home', { files });
});



app.listen(4001,()=>{
    console.log("server is running on port 4001")
})