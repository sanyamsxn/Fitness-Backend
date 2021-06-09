const mongoose = require('mongoose')


const secondaryMusclesSchema = new mongoose.Schema({
    title : String,
    bodyParts : String,

})

const exerciseSchema = new mongoose.Schema({
    ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
        require : true
	},
    title : {
        type :String,
        require : true
    },
    imageUrl : {
        type:String
    },
    videoUrl : String,
    primaryMuscle : {
        type:Object,
        properties :{
            title :String,
            bodyParts : String
        },
        require:true
    },
    secondaryMuscles : [secondaryMusclesSchema],
    type : {
        type:String,
        require:true
    }
})


const Exercise = mongoose.model("Exercise", exerciseSchema)


module.exports = Exercise