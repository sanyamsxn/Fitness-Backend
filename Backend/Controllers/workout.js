
const Workout = require('../Models/workout')


exports.createWorkout = (req,res) => {
    
    const workout = new Workout(req.body)
    workout.save((error, workout)=>{
        if(error){
            return res.status(400).json({
                error,
                message : "Not able to create workout"
            })
        }
        return res.status(200).json({
            workoutId: workout._id,
            message : "workout successfully created"
        })
    })
}

exports.getWorkout = (req, res) => {
    const userid  = req.body.user._id
    
    Workout.find({ownerId :userid }).exec((error, workouts)=>{
        if(error){
            return res.status(400).json({
                message : "No workouts"
            })
        }
        return res.status(200).json({
            workouts
        })
    })
    
}