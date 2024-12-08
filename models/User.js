import mongoose from "mongoose";
import { userSchema } from "../schemas/userSchema";
import { zodValidationMiddleware } from "../middleware/validateMiddleware";

const mongooseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "client"], default: "client" },
    favoriteRooms: { type: [String], default: [] },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

mongooseSchema.pre("save", zodValidationMiddleware(userSchema));
const User = mongoose.model("User", mongooseSchema);

export { User };
