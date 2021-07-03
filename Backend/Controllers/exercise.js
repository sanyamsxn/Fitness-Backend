const Exercise = require('../Models/exercise')


exports.createExercise =(req,res)=>{
    const exercise = new Exercise(req.body)
    exercise.save((error, exercise)=>{
        if(error){
            return res.status(400).json({
                error : "Not able to create exercise"
            })
        }
        return res.status(200).json({
            exercise,
            message : "exercise successfully created"
        })
    })
}


exports.getExercises = (req,res)=>{
    const exercisesByUser = req.body.exercises
    Exercise.find({ownerId : "60e029a6ede3d7145654b3e0"}).exec((error, exercises)=>{
        if(error || !exercises){
            return res.status(400).json({
                message : "No exercise was found"
            })
        }
        const totalExercises  = [...exercises, ...exercisesByUser]
        return res.json(totalExercises)
    })
}



// custom middleware for getting exercises created by the user
exports.getExercisesByUser = (req, res, next) => {
    const userid  = req.body.user._id
    Exercise.find({ownerId :userid }).exec((error, exercises)=>{
        if(error){
            return res.status(400).json({
                message : "No exercise"
            })
        }
        req.body.exercises = exercises;
        next()
    })
    
}
