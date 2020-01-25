// const mongoose = require('mongoose');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

// const { Schema } = mongoose;

// const UsersSchema = new Schema({
//   email: String,
//   hash: String,
//   salt: String,
// });

// UsersSchema.methods.setPassword = function(password) {
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// UsersSchema.methods.validatePassword = function(password) {
//   const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//   return this.hash === hash;
// };

// UsersSchema.methods.generateJWT = function() {
//   const today = new Date();
//   const expirationDate = new Date(today);
//   expirationDate.setDate(today.getDate() + 60);

//   return jwt.sign({
//     email: this.email,
//     id: this._id,
//     exp: parseInt(expirationDate.getTime() / 1000, 10),
//   }, 'secret');
// }

// UsersSchema.methods.toAuthJSON = function() {
//   return {
//     _id: this._id,
//     email: this.email,
//     token: this.generateJWT(),
//   };
// };

// mongoose.model('Users', UsersSchema);

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({ 
  name: {
    type: String, 
    required: true
  }, 
  email: { 
    type: String, 
    required: true
  }, 
  password : { 
    type: String, 
    required: true
  }, 
  date: { 
    type: Date, 
    default: Date.now
  }
})

module.exports = User = mongoose.model("users", UserSchema)