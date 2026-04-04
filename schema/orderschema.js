const {Schema} = require("mongoose");
const orderSchema = new Schema({
    name: String,
    price: Number,
    percent: String,
    isDown: Boolean,
});
module.exports={orderSchema};