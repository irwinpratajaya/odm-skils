const express = require('express');
const router = express.Router();
const user = require('../controllers/user')

/* GET home page. */
router.post('/seed',user.seedData)
router.get('/', user.getUsers)
router.get('/user/:username', user.getUser)
router.post('/', user.createUser)
router.put('/:username', user.updateUser)
router.delete('/:username', user.deleteUser)

router.get('/skills/:username', user.getSkills)
router.post('/skills/:username', user.addSkills)

module.exports = router;
