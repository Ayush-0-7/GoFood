
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        order_data:{
            type:Array,
            required:true
        },

    }
);

const orders = mongoose.model('orders',OrderSchema);
module.exports=orders;