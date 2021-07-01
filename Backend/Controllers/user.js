const User = require('../Models/user')
const formidable = require('formidable')
const fs = require('fs')

exports.updateUser = (req, res) => {
    console.log("entered into update user : 1")
    const id = req.body.user._id   // getting id so that we can know which user to upload
    console.log("Got the id : ", id)
    let form = new formidable.IncomingForm();   //creating a form
    form.keepExtensions = true              //keeping extension of file

    console.log("part 2")

    form.parse(req, (error, fields, file) => {      //parsing the form
        console.log("entered into parsing")
        if(error){
            return res.status(400).json({
                error: "problem with image"
            })
        }
        console.log("no error")
        // destructure the fields
        const {name, bio, gender, bodyWeight, age} = fields

        // restrictions

        if(
            !name || !bio || !gender || !bodyWeight || !age
        ) {
            return res.status(400).json({
                error : "please include all fields"
            })
        }


        // handle file
        if(file.imageUrl){
            if(file.imageUrl.size > 3000000){
                return res.status(400).json({
                    error : "File size too big"
                })
            }
            console.log("image is there")
        }
        // save to the DB
        User.updateOne({_id : id},
            { $set: {name : name, age : age, gender : gender, bodyWeight : bodyWeight, bio: bio }}, 
            function(err,res){if(err){console.log("Error is : " , err)}else{console.log("updated")}}
        )
    })
}