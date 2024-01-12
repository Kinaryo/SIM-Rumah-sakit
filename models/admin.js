const mongoose = require('mongoose');
const Schema = mongoose.Schema
// const bcrypt = require('bcrypt'); 

const AdminSchema = new Schema({ 
  username: String,
  email: String,
  password: String,
});


module.exports = mongoose.model('Admin' , AdminSchema)