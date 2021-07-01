const express = require('express');

const router = express.Router();
const {updateUser} = require('../Controllers/user')
const {isAuthenticated} = require('../Controllers/authentication')

router.post('/users', isAuthenticated, updateUser)

module.exports = router;