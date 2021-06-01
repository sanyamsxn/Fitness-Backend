const express =require('express')
const dotenv = require('dotenv')
const dbConnection = require('./DB_Connection/dbConnect')
const colors = require('colors')
const authRoutes = require('./Routes/authentication')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dotenv.config()
const app = express();

//librarymiddlewares
app.use(bodyParser.json()) // will parse the req body
app.use(cookieParser())    // parse the cookies value as json cookies
app.use(cors())            // cross origin resource sharing

//custom middleware : prefixing every authentication routes with /api
app.use('/api', authRoutes)

//Port
const Port = process.env.PORT

//starting a server
app.listen(Port,console.log(`server is running on : ${Port}`.yellow))
dbConnection()