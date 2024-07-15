require('dotenv').config();
const express = require('express');
const connectDB = require('./Utils/db');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;
const user = require('./models/user-model');
const router = require('./Routes/createUser');
const router1 = require('./Routes/DisplayData');
const router2 = require('./Routes/Oderdata');
const cors = require('cors');
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With , Content-Type , Accept"
  );
  next();
})
app.route('/').get((req, res) => {
  res.send("Hello World.");
});


app.use(express.json());

app.use(cors());
app.use('/api',router);
app.use('/ayush',router1);
app.use('/ayush',router2);


connectDB()
  .then( () => {
    app.listen(PORT,async () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Connection not established.");
  });
