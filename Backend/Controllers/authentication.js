const User = require('../Models/user')
const {validationResult}  =require('express-validator')
const jwt =require('jsonwebtoken')
const expressJwt = require('express-jwt')





exports.signup = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const user = new User(req.body)
    user.save((error, user)=>{
        if(error){
            const err = `E11000 duplicate key error collection: fitness.users index: email_1 dup key: { email: "${req.body.email}" }`
            console.log(err)
            if(error.message===err){
                return res.status(409).json({
                    message : "User already exists!"
                })
            }
            return res.status(400).json({
                message : "NOT ABLE TO SAVE USER IN DB"
            })
        }
        const token = jwt.sign({_id : user._id}, process.env.Secret)
        res.status(200).json({
            userId : user._id,
            token : token
        })
    })
}

exports.signin = (req,res)=>{
    const errors = validationResult(req);
    if(!errors){
        return res.status(400).json({
            message : errors.array()[0].msg
        })
    }


    //destructuring email and password from the req body
    const {email,password} = req.body

    //checking from the DB with email field
    User.findOne({email}, (error,user)=>{
        if(error || !user){
            return res.status(404).json({
                message : "User does not exist!"
            })
        }
        // checking for the password check of the user from the Db
        if(!user.authenticate(password)){
            return res.status(401).json({
                message : "Invalid email or password!"
            })
        }

        //creating token 
        const token = jwt.sign({_id : user._id}, process.env.Secret)
        //put this token in cookies using cookie parser
        // res.cookie("token", token, {expire : new Date() +9999})


        //sending response to frontend
        const {_id,email} = user;  // destructuring the user we get back from the DB
        
        User.updateOne({_id : user._id},
            { $set: {isSignedIn : true}}, 
            function(err,res){if(err){console.log(error)}else{console.log("updated to true")}}
        )

        return res.json({
            userId:_id,
            token 
        })
    })
}


// TODO : check whether its working or not 
exports.signout = (req,res)=>{
    const Id = req.body.user._id;

    User.updateOne({_id : Id,},
        {$set: {isSignedIn : false}}, 
        function(err,res){
        if(err){console.log("error is : ", err)}
        else{console.log("updated to false")}}
    )

    res.status(200).json({
        message : "sign out successfull"
    })
}







// authentication middleware
exports.isAuthenticated = (req, res , next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        jwt.verify(token, process.env.Secret, async (err, user) => {
            // not verified
            if (err)
                return res.status(401).json({ message: "You must be logged in." });
    
            // verified
            const userDetails= await User.findById(user._id);
            // run the next function
            req.body.user = userDetails
            next();
        })
    }catch{
        res.status(400).json({message: "invalid request"})
    }
}


// exports.isSignedIn = (req, res, next) =>{
//     const Id = req.body.user._id;
//     const user = User.findById(Id);
//     console.log(user)


//     next();
// }