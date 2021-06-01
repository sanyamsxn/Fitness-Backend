const User = require('../Models/user')
const {validationResult}  =require('express-validator')


exports.signout = (req,res) =>{
    res.json({
        "message" : "user signout successfully"
    })
}



exports.signup = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const user = new User(req.body)
    user.save((error, user)=>{
        if(error){
            console.log(error)
            return res.status(400).json({
                "message" : "NOT ABLE TO SAVE USER IN DB"
            })
        }
        res.json({
            user
        })
    })
}

