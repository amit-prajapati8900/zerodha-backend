const {model} = require("mongoose");
const {holdingSchema} = require("../schema/handelschema");
const holdeingModel = new model("holding",holdingSchema);
module.exports ={holdeingModel};