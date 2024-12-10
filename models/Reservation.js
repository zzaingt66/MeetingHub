import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 1, 
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

export const Reservation = mongoose.model("Reservation", ReservationSchema);