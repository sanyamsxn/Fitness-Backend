const express = require('express')

const router = express.Router()
const {createExercise,getExercises, getExercisesByUser} = require('../Controllers/exercise')
const {isAuthenticated} = require('../Controllers/authentication')

router.post('/exercises',isAuthenticated, createExercise)

router.get('/exercises', isAuthenticated, getExercisesByUser, getExercises)


module.exports = router