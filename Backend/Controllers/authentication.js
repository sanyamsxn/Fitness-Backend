const User = require('../Models/user')
const {validationResult}  =require('express-validator')
const jwt =require('jsonwebtoken')
const expressJwt = require('express-jwt')

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


exports.signin = (req,res)=>{
    const errors = validationResult(req);
    if(!errors){
        return res.status(400).json({
            error : errors.array()[0].msg
        })
    }


    //destructuring email and password from the req body
    const {email,password} = req.body

    //checking from the DB with email field
    User.findOne({email}, (error,user)=>{
        if(error || !user){
            return res.status(400).json({
                error : "Email does not exist"
            })
        }
        // checking for the password check of the user from the Db
        if(!user.authenticate(password)){
            return res.json({
                message : "password and email does not match"
            })
        }

        //creating token 
        const token = jwt.sign({_id : user._id}, process.env.Secret)

        //put this token in cookies using cookie parser
        res.cookie("token", token, {expire : new Date() +9999})


        //sending response to frontend
        const {_id, name, email} = user;  // destructing the user we get back from the DB
        return res.json({
            token, user:{_id, name, email}
        })

    })
}