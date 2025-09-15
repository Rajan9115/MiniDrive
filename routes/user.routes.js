//routes is created to create routes we use this route via app.js
//we will not create many routes in app.js,simple expoet it and require in app.js

const express = require('express');
const router =express.Router();
//for validation of data
// install package npm i express-validator
const { body,validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')







router.get('/',(req,res)=>{
    res.render('register')

})

//for storing data and validation
router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min:5}),
    body('username').trim().isLength({min:3}),
    
  async    (req,res) => {
      const errors =validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid data'
        })
      }

     const { email,username,password } = req.body;

     const hashPassword =await bcrypt.hash(password,10)
     const newUser = await userModel.create({
        email,
        username,
        password:hashPassword
     })
     console.log(newUser)
     
     //res.json is used at industry level to data exchange in json format
     res.redirect('/login');
})

 router.get('/login',(req,res)=>{
    res.render('login')
 })

router.post('/login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({ min:5}),
   async (req,res)=>
    {
        const errors =validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()){
          return res.status(400).json({
              errors: errors.array(),
              message: 'Invalid data'
          })
        }

        const { username,password } = req.body;
      //find user from database
        const user = await  userModel.findOne({
         username:username 
        })
      //if username is incorrect show this on ui
      if(!user){
        return res.status(400).json({
            message:'Incorrect username or password'
        })
      }
      
      const isMatch = await bcrypt.compare(password,user.password)
      //it will return true if password is correct otherwise false
      if(!isMatch){
        return res.status(400).json({
             message:'Incorrect username or password'
        })
      }

      //if password is matched we generate a token using jwt(insall jwt)
      const token = jwt.sign({
        userId:user._id,
        email:user.email,
        username:user.username
       },
        process.env.JWT_SECRET,
      )

       res.cookie('token', token, {
            httpOnly: true,
       });
   
       res.redirect('/home')
  }
)

//logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the authentication token cookie
    res.redirect('/login');   // Redirect to the login page after logout
});

module.exports=router