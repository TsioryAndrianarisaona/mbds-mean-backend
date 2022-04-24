var mongoose = require('mongoose');  
var Matiere = new mongoose.Schema({  
  name: String,
  prof: String,
  image: String
});
mongoose.model('Matiere', Matiere);

module.exports = mongoose.model('Matiere');