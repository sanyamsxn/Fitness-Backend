const Routine = require('../Models/routine')

exports.createRoutine = (req,res)=>{
    const routine = new Routine(req.body)
    routine.save((error, routine)=>{
        if(error || !routine){
            return res.status(400).json({
                message : "Unable to create routine"
            })
        }
        return res.status(200).json({
            message : "Routine created successfully"
        })
    })
}

exports.getRoutine = (req,res)=>{
    const Id = req.body.user._id
    console.log("Id from middleware is: ", Id)

    Routine.find({ownerId : Id}).exec((error,routine)=>{
        if(error || !routine){
            return res.status(400).json({
                message : "Unable to find routine"
            })
        }
        return res.status(200).json({
            message : "Routine loaded"
        })
    })
}