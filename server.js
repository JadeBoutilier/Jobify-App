import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
// below package replaces try and catch in authController.js - errorhandler is still receiving errors
import 'express-async-errors'
//morgan shows routes and controllers in terminal making it easier to catch spelling mistakes or bad routes
import morgan from 'morgan'

mongoose.set('strictQuery', true)

//db and authenticateUser
import connectDB from './db/connect.js'

//routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

//MIDDLEWARE
//Not-found-middleware (looking for requests)
import notFoundMiddleware from './middleware/not-found.js' // need .js for SERVER / node imports
//Error-middleware looking for errors in existing routes - always placed last
import errorHandlerMiddleware from './middleware/error-handler.js'
import mongoose from 'mongoose'

if(process.env.NODE_ENV !== 'production') {
    //using 'dev' type - shows colors in terminal
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
   res.json({msg: 'Welcome'}) 
})

app.get('/api/v1', (req, res) => {
    res.json({msg: 'API!'}) 
 })

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

//if all HTTP methods don't exist then use:
app.use(notFoundMiddleware) 
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000

//listen port moved to MONGOOSE 
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}...`)
// })

//async because mongoose connect returns a promise
const start= async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()