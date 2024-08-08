import { connect } from 'mongoose'



const connectDB = async (): Promise<void> => {

    await connect(process.env.MONGO_URI!)
    console.log('MongoDB Connected')
}  


export default connectDB