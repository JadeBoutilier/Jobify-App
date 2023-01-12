import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
    select: false,
  },
  lastName: { type: String, maxLength: 20, trim: true, default: "last name" },
  location: { type: String, maxLength: 20, trim: true, default: "my city" },
});

//This allows us to grab the password before saving the document since we want to hash the password before saving.
//Must use anonymous function for second parameter - arrow function wont work
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//JWT = Json Web Token (authorization (making sure user is the same as the one that signed up) - not authentication (loggin in) making sure user and password match)
// using JWT instead of session / cookies
// JWT is encoded and serialized - nothing is stored on the server -  stored as a web token on client side
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
};
export default mongoose.model("User", UserSchema);
