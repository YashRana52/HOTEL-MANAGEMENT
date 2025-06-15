import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        mongoose.connection.on('connected', () =>
            console.log('Database connected')
        );

        await mongoose.connect(`${process.env.MONGO_DB_URI}/Hotel-management`);
    } catch (error) {
        console.log('MongoDB Connection Error:', error.message);
    }
};

export default connectDb;
