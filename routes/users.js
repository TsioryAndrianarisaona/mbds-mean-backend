let User = require("../model/user");
//jwt config
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
const Matiere = require("../model/matiere");

// create new user
function create(req, res) {
   
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : req.body.isAdmin ? true : false
        }, 
        function (err, user) {
            if (err) return res.status(500).send(err);
            var token = jwt.sign({sub: user}, config.secret, {
                expiresIn: config.tokenDuration
              });
              res.status(200).send({ auth: true, token: token, user:user });
        });
}

 // find one suer
function login(req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, user) {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send("No user found.");
        var token = jwt.sign({ sub: user }, config.secret, {
            expiresIn: config.tokenDuration
          });
         
          if(user.isAdmin){
           Matiere.find({prof : user.name},(err,matiere)=>{
                return res.status(200).send({ auth: true, token: token, user:user,matiere: matiere });
            });
          }
          else{
           return res.status(200).send({ auth: true, token: token, user:user });
          }
       
    });
}
//logout
function logOut(req,res){
    res.status(200).send({ auth: false, token: null });
}
module.exports = {
    create,
    login,
    logOut
  };
  
