const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  avatar: String,
  workouts: [{ type: Schema.Types.ObjectId, ref: "workouts" }],

});

module.exports = mongoose.model("user", UserSchema);