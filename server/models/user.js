const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  userId: String,
  img: [],
  userURI: String,
  accessToken: String,
  refreshToken: String,
  tokenExpirationTime: { type: Date, default: Date.now },
  workouts: [{ type: Schema.Types.ObjectId, ref: "workouts" }],

});

module.exports = mongoose.model("user", UserSchema);