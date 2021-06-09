const express = require('express')

const router = express.Router()
const {createWorkout,getWorkout, getWorkoutByUser} = require('../Controllers/workout')
const {isAuthenticated} = require('../Controllers/authentication')

router.post('/workouts', isAuthenticated, createWorkout)

router.get('/workouts', isAuthenticated,  getWorkout)


module.exports = router