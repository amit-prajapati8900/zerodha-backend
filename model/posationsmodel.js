const { model } = require("mongoose");
const { posationSchema } = require("../schema/posotionsschema");

const posationModel = model("Posation", posationSchema);
module.exports = { posationModel };
