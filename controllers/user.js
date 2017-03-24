var express = require('express');
var user = require('../models/user');

module.exports = {
  getUsers: function(req,res){
    user.find()
    .then(function(data){
      res.json(data)
    })
  },
  getUser: function(req,res){
    user.find({username:req.params.username})
    .then(function(data){
      res.json(data)
    })
  },
  createUser: function(req,res){
    user.findOne({username: req.body.username})
    .then(function(data){
      if(data) {
        res.send('use other username')
      } else {
        let newUser = new User({
          username: req.body.username,
          skills: []
        })
        console.log(newUser);
        newUser.save()
        .then(function(data){
          res.json(data)
        })
      }
    })
  }
}
