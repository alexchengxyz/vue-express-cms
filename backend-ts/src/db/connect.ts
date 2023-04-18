import mongoose from 'mongoose';

const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);

    console.log('MongoDB is Connected...');
  } catch (error: unknown) {
    console.error((error as Error).message);
  }
};

export default connectDB;
