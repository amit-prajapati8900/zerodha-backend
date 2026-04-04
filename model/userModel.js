const { model } = require("mongoose");
const logsignSchema = require("../schema/logsign");

const User = model("User", logsignSchema);

module.exports = User;   // 👈 direct model export
