const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

dotenv.config();

const registerUser = (req, res) => {

  const { name, email, password} = req.body;

  // Basic validation
  if(!name || !email || !password){
    return res.status(400).json({success: false, message: 'Please enter all fields'}); 
  }

  // Check for existing user
  User.findOne({email})
    .then(user =>{
      if(user) return res.status(400).json({success: false, message: 'This email has already existed'});
    
      const newUser = new User({
        name,
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;

          newUser.password = hash;
          newUser.save()
            .then(user => {

              jwt.sign(
                {id : user.id},
                process.env.jwtSecret,
                {expiresIn: 24*3600 },
                (err, token) =>{
                  if(err) throw err;
                  res.json({
                    token: token,
                    name: user.name,
                    userId: user._id
                    
                  })
                }
              )

              
            })
        })
      })
    })
  


}

const loginUser = (req, res) => {
  const { email, password} = req.body;

  // Basic validation
  if(!email || !password){
    return res.status(400).json({success: false, message: 'Please enter all fields'}); 
  }

  User.findOne({email})
    .then(user =>{
      if(!user) return res.status(400).json({success: false, message: 'User does not exist'});
    
      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({success: false, message: 'Incorrect password'});
        
          jwt.sign(
            {id : user.id},
            process.env.jwtSecret,
            {expiresIn: 24*3600 },
            (err, token) =>{
              if(err) throw err;
              res.json({
                token: token,
                name: user.name,
                userId: user._id
                
              })
            }
          )
          
        })
      

      
              
           
    })
  
}

const getProfile = (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
    
    
}

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({error: "User not found"});
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordReset/${resetToken}`;

    const message = `
      <h1>重新設定密碼</h1>
      <p>請使用以下網址發起PUT Request更新密碼</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `

    try{
      sendEmail({
        to: user.email,
        subject: "重新設定密碼",
        text: message
      })
      res.status(200).json({ success: true, data: "Email Sent"});
    }
    catch(err){
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      return res.status(500).json({ error: "Email could not be sent"});
    }

  }
  catch(err){
    next(err);
  }
}

const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({error :"Invalid Token"});
      }
  
      // user.password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
    
      await user.save();
  
      res.status(201).json({
        success: true,
        data: "Password Updated Success",
      });
    } catch (err) {
      next(err);
    }
}
 
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword
}