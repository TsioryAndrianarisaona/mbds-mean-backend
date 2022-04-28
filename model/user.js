var mongoose = require('mongoose');  
var User = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  isAdmin :Boolean,
  image: String
});
mongoose.model('User', User);

module.exports = mongoose.model('User');