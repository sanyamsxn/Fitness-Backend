const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require : true,
        trim:true,
    },
    email : {
        type:String,
        require:true,
        unique:true
    },
    encrypt_password : {
        type:String,
        require:true
    },
    salt : String,
},{timestamps:true})


userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encrypt_password = this.securePassword(password);  // this encrypt_password name should be same as mentioned in the model
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {

    authenticate : function(plainpassword){
        return this.securePassword(plainpassword)===this.Encrypt_password
    },
    securePassword : function(plainpassword){
        if(!plainpassword){return "Enter Something"}
        try {
                return crypto.createHmac('sha256', this.salt)
               .update(plainpassword)
               .digest('hex');

        } catch (error) {
            console.log(`error : ${error}`)
        }
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User