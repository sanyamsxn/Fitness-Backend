const mongoose  = require('mongoose')


const routineSchema = new mongoose.Schema({
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
})


const Routine = mongoose.model('Routine', routineSchema)

module.exports = Routine