const mongoose = require('mongoose')



const workoutSchema = new mongoose.Schema({
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    title : {
        type:String,
        required:true
    }, 
    description : {
        type : String,
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
        required:true
    },
    date : {
        type : Date,
        required:true
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
