const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../models/user-model');
const jwt = require('jsonwebtoken');
const secretKey = "mskdjasdmacoalnnflas21343490iot";
const {body,validationResult} = require('express-validator');
router.route('/createuser').post(
    body('email').isEmail(),
    //body(key_Schema,msg for displaying , if validation fails.).isLength({min:5}),
    body('password','Invalid Password.').isLength({min:5}),
   async(req,res)=>{
        // error is an array.
        const error = validationResult(req);
        if(!error.isEmpty()){

            return res.status(400).json({errors:error.array()})

        }
        try {
        await user.create({
            name:req.body.name,
            email:req.body.email,
            location:req.body.location,
            password:req.body.password
        })
        res.json({sucess:true});
} catch (error) {
    res.json({sucess:false});

}
});
router.route('/login').post(
    [body('email').isEmail(),
    body('password').isLength({min:6})],
    async (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){

            return res.status(400).json({errors:error.array()})

        }
      let userExist =await  user.findOne({email:req.body.email});
try {
          if(!userExist){
            return res.status(400).json({msg:"Invalid credentials."});
          }
          if((bcrypt.compareSync( req.body.password,userExist.password))===false){
            return res.status(400).json({msg:"Invalid password."});
    
          }
          const data = {
            user:{
                id:userExist.id
            }
          }
        let authToken = jwt.sign(data,secretKey);
          return res.json({success:true,authToken});
} catch (error) {
    console.log(error);
    res.json({success:false});
 }

    }
);
module.exports = router;