const mongoose = require('mongoose')
const colors = require('colors')
// const DB_URI = process.env.MongoDB_URI

const dbConnection = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MongoDB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true

        })

        console.log(`MongoDb is connected, ${conn.connection.host}`.cyan.bold)
    }catch(error){
        console.log(`error : ${error.message}`.red.underline)
    }
}

module.exports = dbConnection