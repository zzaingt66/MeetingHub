import mongoose from 'mongoose';


const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};
