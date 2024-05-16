const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
/*
_id
663e173fa4bdf759cac21e67
CategoryName
"Biryani/Rice"
name
"Veg Biryani"
img
"https://media.istockphoto.com/photos/veg-biryani-picture-id1363306527?…"

options
Array (1)

0
Object
half
"150"
full
"260"
description
"Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer…"
*/
const UserSchema = new mongoose.Schema(
    {
        name:{
           type:String,
           required:true
        },
        email:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        Date:{
          type:Date,
          default:Date.now  
        }
    }
)
UserSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified("password")){
      next();
    }
    try {
      user.password =  await bcrypt.hash(user.password,10);
    } catch (error) {
      console.log("Encrpytion Unsuccessful.");
      next(error);
    }
  })
const user = mongoose.model('user',UserSchema);
module.exports = user;