import app from "./app.js";
import connectDB from "./db/db.index.js";
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})

connectDB().
then(() => {
    app.on('error', (error) => {
        console.log('MongoDB connection error',error.message);
    })
    app.listen(process.env.PORT || 3000 , () => {
        console.log(`Server is running PORT ${process.env.PORT || 3000 }` );
    })
}).
catch(
    app.use((error) => {
        console.log('mongoDB error !!',error.message);
    })
)






export default app