const user = require('../models/user');
const seed = require('../seeder/seed')

let users = {}

users.seedData = function (req,res) {
  user.create(seed, function (err,data) {
    if(err) {
      res.json(err)
    } else {
      res.json(data)
    }
  })
}

users.getUsers = function (req,res) {
  user.find({}).then(function (data) {
    if (!data) {
      res.json('username not found')
    } else {
      res.json(data)
    }
  }).catch(function (err) {
    res.json(err)
  })
}

users.getUser = function (req,res) {
  user.findOne({
    username: req.params.username
  }).then(function (data) {
    if (!data) {
      res.json('username not found')
    } else {
      res.json(data)
    }
  }).catch(function (err) {
    res.json(err)
  })
}

users.createUser = function (req,res) {
  user.findOne({
    username: req.body.username
  }).then(function (username) {
    if (username) {
      res.json('username already used')
    } else {
      user.create({
        username: req.body.username,
        skills: []
      }).then(function (data) {
        res.json(data)
      }).catch(function (err) {
        if (err) res.json(err)
      })
    }
  })
}

users.updateUser = function (req,res) {
  user.findOne({
    username: req.body.username
  }).then(function (data) {
    if(!data) {
      res.json('username not found')
    } else {
      data.update(req.body).then(function (userdata) {
        res.json(userdata)
      }).catch(function (err) {
        res.json(err)
      })
    }
  })
}

users.deleteUser = function (req,res) {
  user.findOne({
    username: req.body.username
  }).then(function (data) {
    if(!data) {
      res.json('username not found')
    } else {
      data.remove(req.params.username).then(function (result) {
        res.json(`${result.username} has been deleted`)
      }).catch(function(err) {
        res.json(err)
      })
    }
  })
}

users.addSkills = function (req,res) {
  user.findOne({
    username: req.params.username
  }).then (function (data) {
    let skillArr = []
    data.skills.forEach(function (skill) {
      skillArr.push(skill.name)
    })

    if (skillArr.indexOf(req.body.skill) >= 0) {
      res.json('skill is already in used')
    } else if( req.body.score > 10) {
      res.json('score max 10')
    } else if (req.body.score < 1) {
      res.json ('skill min 1')
    } else {
      user.findOneAndUpdate({
        username: req.params.username
      }, {
        $push: {
          name: req.body.skill,
          score: req.body.score
        }
      },{
        new: true
      }).then(function (result) {
        res.json(result)
      }).catch(function (err) {
        res.json(err)
      })
    }
  })
}

users.getSkills = function (req,res) {
  user.find({
    username: req.params.username
  }).then(function (data) {
    res.json(data[0].skills)
  })
}

users.deleteSkill = function (req,res) {
  user.findOne({
    username: req.params.username
  }).then(function (data) {
    let skillArr = []
    data.skills.forEach(function (skill) {
      skillArr.push(skill.name)
    })

    if(skillArr.indexOf(req.body.skill) == -1) {
      res.json('skill not found')
    } else {
      user.findOneAndUpdate({
        username: req.params.username
      },{
        $push: {
          skills: {
            name: req.body.skill
          }
        }
      },{
        new: true
      }).then(function (data) {
        res.json(data)
      })
    }
  })
}

module.exports = users
