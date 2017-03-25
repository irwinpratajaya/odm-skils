const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  username: {
    type:String,
    required:true,
    unique:true
  },
  skills:[{
    name:{
      type:String,
      required:true,
      unique:true
    },
    score: Number
  }]
},{
  timestamps: true
});

var user = mongoose.model('user',userSchema)

module.exports = user
