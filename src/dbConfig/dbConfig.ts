import getErrorMessage from '@/utils/getErrorMessage';
import { get } from 'http';
import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error:unknown) {
        console.log('Something goes wrong!');
        return new Error(getErrorMessage(error));
        
    }


}