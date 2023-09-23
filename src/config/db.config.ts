import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables.');
    }

    const options: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(MONGODB_URI, options);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};
