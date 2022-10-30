const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },

  gender: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
    minLength: 10,
  },

  message: {
    type: String,
    required: true,
    minLength: 3,
  },

  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  confirmpassword: {
    type: String,
    required: true,
    minLength: 4,
  },
});

const Register = mongoose.model("Register", userSchema);
module.exports = Register;
