const mongoose  = require('mongoose')


const routineSchema = new mongoose.Schema({
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
})


const Routine = mongoose.model('Routine', routineSchema)

module.exports = Routine