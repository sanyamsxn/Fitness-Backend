const express = require('express')
const {signup, signout,signin, isSignedIn, isAuthenticated}  = require('../Controllers/authentication')
const router = express.Router()
const {body, validationResult} = require('express-validator')

router.get('/signout', isAuthenticated, signout)

router.post('/signup',[
    body("email", "Please enter a valid email").isEmail(),
    body("password", "password should be atleast 5 char long").isLength({min:5}),
], signup)

router.post('/signin',[
    body("email", "valid email should be entered").isEmail(),
    body("password", "password should be entered").isLength({min:1}),
],signin)



// every request linked with router will be thrown out by exporting router
module.exports = router