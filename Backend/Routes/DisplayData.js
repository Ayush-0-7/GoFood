const express = require('express');
const router = express.Router();
router.route('/fooddata').post((req,res)=>{
     try {
        res.send([global.data1_g,global.data2_g]);
     } catch (error) {
        console.log("DATA NOT FOUND");
     }
})
module.exports = router;