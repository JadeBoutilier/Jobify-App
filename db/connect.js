import mongoose from 'mongoose'

//CONNECTION STRING
// mongoose always returns a promise
const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB