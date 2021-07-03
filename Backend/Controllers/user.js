
const User = require('../Models/user')
const formidable = require('formidable')
const fs = require('fs')



exports.updateUser = (req, res)=>{
    id = req.body.user._id

    User.updateOne({_id : id},
                { $set: {name : req.body.name, age : req.body.age, gender : req.body.gender, bodyWeight : req.body.bodyWeight, bio: req.body.bio, imageUrl : req.body.imageUrl}}, 
                    function(err,res){if(err){console.log("Error is : " , err)}else{console.log("updated")}}
            )

    res.status(200).json({message : "User updated"})
}