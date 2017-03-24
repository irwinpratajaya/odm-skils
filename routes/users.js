var express = require('express');
var router = express.Router();

var user = require('../controllers/user');

router.get('/', user.getUsers);
router.get('/:username', user.getUser);
// router.get('/:username/skills', user.getSkills);
router.post('/', user.createUser);
// router.put('/:username/addskill', user.addSkill);
// router.put('/:username/removeskill', user.removeSkill);
// router.delete('/:username', user.deleteUser);

module.exports = router;
