const { model } = require("mongoose");
const { orderSchema } = require("../schema/orderschema"); // destructure karo
const OrderModel = model("order", orderSchema); // capital letter convention
module.exports = { OrderModel };
