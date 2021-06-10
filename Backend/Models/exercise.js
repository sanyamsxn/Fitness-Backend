const mongoose = require('mongoose')


const secondaryMusclesSchema = new mongoose.Schema({
    title : String,
    bodyParts : String,

})

const exerciseSchema = new mongoose.Schema({
    ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
        required : true
	},
    title : {
        type :String,
        required : true
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
        required:true
    },
    secondaryMuscles : [secondaryMusclesSchema],
    type : {
        type:String,
        required:true
    }
})


const Exercise = mongoose.model("Exercise", exerciseSchema)


module.exports = Exercise