const { Schema } = require("mongoose");

const logsignSchema = new Schema(
{
  username: { type: String, required: true }, // unique hata do
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = logsignSchema;   //  direct schema export
