import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roomRoutes from "./routes/roomRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

// COFIGURACION DE DOTENV QUE PERMITE INTERACTUAR CON VAIRALBES DE ENTORNO
dotenv.config();

// VARIABLES DE ENTORNO
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// INSTANCIADO EXPRESS EN APP
const app = express();

// MIDDLEWARES FOR CORS, BODY-PARSER, MORGAN FOR REGISTRO IN CONSOLE AND THE ERROR MIDDLEWARE
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// CONECTION WITH MONGODB ATLAS
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
    process.exit(1);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// CONEXION AL PUERTO Y EJECUCION DE LA CONEXION A LA DB, SE HACE AQUI
app.listen(PORT, () => {
  connectDB();
});

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

export default app;
