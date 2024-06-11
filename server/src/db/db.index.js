import mongoose from 'mongoose'
import DB_NAME from '../constants.js'

const connectDB = async () => {
    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URL}/ ${DB_NAME}`)
        console.log(`MMONGODB connect successfully || DB host ${res.connection.host}`);
    } catch (error) {
        console.log('MONGO db can not connect',error.message);
    }
}

export default connectDB