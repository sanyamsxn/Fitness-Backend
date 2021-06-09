const mongoose = require('mongoose')



const workoutSchema = new mongoose.Schema({
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        require : true
    },
    title : {
        type:String,
        require:true
    }, 
    description : {
        type : String,
        require:true
    },
    exercisesWithData : {
        type:Array,
        properties:{
            exerciseId :{
                type : mongoose.Schema.Types.ObjectId,
                ref : "Exercise"
            },
            sets: {
                type :Array,
                default : []
            }
        }
        
    },
    duration : {
        type : Number,
        require:true
    },
    date : {
        type : Date,
        require:true
    },
})



const Workout = mongoose.model("Workout", workoutSchema)

module.exports = Workout



// id,
// ownerId,
// title,
// description,
// exercisesWithData,
// duration,
// date
