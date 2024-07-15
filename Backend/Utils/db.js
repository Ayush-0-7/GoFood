const mongoose = require('mongoose');
const express = require('express');
let URI = process.env.URI;
const connectDB = async(req,res)=>{
    try {
        await mongoose.connect(URI);
        console.log("Connection to DB is successful.");
        //foodData fetching.
        let fetched_data = mongoose.connection.db.collection('foodData');
        let data1 = await fetched_data.find({}).toArray();
        global.data1_g=data1;
        //foodCat fetching.
        let fetched_cat = mongoose.connection.db.collection("foodCat");
        let data2 = await fetched_cat.find({}).toArray();
        global.data2_g=data2;


       

    } catch (error) {
        throw error;
    }
}
module.exports=  connectDB;