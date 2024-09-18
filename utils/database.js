import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    return mongoose.connection; 
  }

  const mongoURI = process.env.MONGODB_URI;
  
  await mongoose.connect(mongoURI);

  isConnected = true;

  return mongoose.connection;
};
