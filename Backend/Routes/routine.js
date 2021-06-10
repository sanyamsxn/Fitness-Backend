const express = require('express')
const router = express.Router()
const {createRoutine, getRoutine} = require('../Controllers/routine')
const {isAuthenticated} = require('../Controllers/authentication')

router.post('/routines', isAuthenticated, createRoutine)
router.get('/routines', isAuthenticated, getRoutine)


module.exports = router