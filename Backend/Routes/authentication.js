const express = require('express')
const {signup, signout}  = require('../Controllers/authentication')
const router = express.Router()
const {body, validationResult} = require('express-validator')

router.get('/signout', signout)

router.post('/signup',[
    body("name", "Name should be atleast 3 char long").isLength({min:3}),
    body("email", "valid email should be entered").isEmail(),
    body("password", "password should be atleast 5 char long").isLength({min:5}),
], signup)




// every request linked with router will be thrown out by exporting router
module.exports = router