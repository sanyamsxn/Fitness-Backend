const Routine = require('../Models/routine')

exports.createRoutine = (req,res)=>{
    const routine = new Routine(req.body)
    routine.save((error, routine)=>{
        if(error){
            console.log("error is : ", error)
            return res.status(400).json({
                message : "Unable to create routine"
            })
        }
        return res.status(200).json({
            routineId: routine._id,
            message : "Routine created successfully"
        })
    })
}

exports.getRoutine = (req,res)=>{
    const Id = req.body.user._id

    Routine.find({ownerId : Id}).exec((error,routines)=>{
        if(error){
            return res.status(400).json({
                message : "Unable to find routine"
            })
        }
        return res.status(200).json({
            routines
        })
    })
}