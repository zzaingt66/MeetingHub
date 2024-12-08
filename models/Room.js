import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  photos: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  capacity: {
    type: Number,
    required: true,
    min: 2, 
  },
  place: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    number: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
  },
  isActive: {
    type: Boolean,
    default: true, 
  },
  desc: {
    type: String,
    required: true,
    minlength: 3,
  },
  reservations: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: "Reservation",
    default: [],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
});

export const Room = mongoose.model("Room", roomSchema);
