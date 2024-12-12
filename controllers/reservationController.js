import { Reservation } from "../models/Reservation.js";
import { Room } from "../models/Room.js";
import { reservationSchema } from "../schemas/reservationSchema.js";
import { createError } from "../utils/erros.js";

export const getReservations = async (req, res, next) => {
  try {
    let reservations;
    
    // If user is admin, show all reservations
    if (req.user.role === 'admin') {
      reservations = await Reservation.find()
        .populate("roomId", "name description pricePerHour maxCapacity")
        .populate("userId", "name email");
    } else {
      // If regular user, show only their reservations
      reservations = await Reservation.find({ userId: req.user.id })
        .populate("roomId", "name description pricePerHour maxCapacity")
        .populate("userId", "name email");
    }

    res.status(200).json({
      message: "Reservas obtenidas con éxito",
      reservations,
    });
  } catch (err) {
    next(err);
  }
};

export const createReservation = async (req, res, next) => {
  try {
    // Override userId with authenticated user's ID
    const reservationData = {
      ...req.body,
      userId: req.user.id
    };

    const parsedData = reservationSchema.parse(reservationData);
    
    const room = await Room.findById(parsedData.roomId);
    if (!room) {
      return next(createError(404, "Sala no encontrada"));
    }

    if (parsedData.numberOfPeople > room.maxCapacity) {
      return next(createError(400, `La capacidad máxima de la sala es ${room.maxCapacity} personas.`));
    }

    const startDateTime = new Date(parsedData.date);
    startDateTime.setHours(
      parseInt(parsedData.startHour.split(":")[0]),
      parseInt(parsedData.startHour.split(":")[1])
    );

    const endDateTime = new Date(parsedData.date);
    endDateTime.setHours(
      parseInt(parsedData.endHour.split(":")[0]),
      parseInt(parsedData.endHour.split(":")[1])
    );

    const existingReservation = await Reservation.findOne({
      roomId: parsedData.roomId,
      $or: [
        {
          startDate: { $lt: endDateTime },
          endDate: { $gt: startDateTime },
        },
      ],
    });

    if (existingReservation) {
      return next(createError(400, "La sala ya está reservada para esas fechas y horas."));
    }

    const reservation = new Reservation({
      roomId: parsedData.roomId,
      userId: req.user.id,
      startDate: startDateTime,
      endDate: endDateTime,
      numberOfPeople: parsedData.numberOfPeople,
    });

    await reservation.save();

    room.bookings.push(reservation._id);
    await room.save();

    const populatedReservation = await Reservation.findById(reservation._id)
      .populate("roomId", "name description pricePerHour maxCapacity")
      .populate("userId", "name email");

    res.status(201).json({
      message: "Reserva creada con éxito",
      reservation: populatedReservation,
    });
  } catch (err) {
    next(err);
  }
};

export const getReservationById = async (req, res, next) => {
  try {
    let reservation;
    
    if (req.user.role === 'admin') {
      reservation = await Reservation.findById(req.params.id)
        .populate("roomId")
        .populate("userId");
    } else {
      reservation = await Reservation.findOne({
        _id: req.params.id,
        userId: req.user.id
      })
        .populate("roomId")
        .populate("userId");
    }

    if (!reservation) {
      return next(createError(404, "Reserva no encontrada"));
    }

    res.status(200).json({
      message: "Reserva obtenida exitosamente",
      reservation,
    });
  } catch (err) {
    next(err);
  }
};

export const updateReservation = async (req, res, next) => {
  try {
    const validatedData = reservationSchema.partial().parse(req.body);
    
    let reservation;
    
    if (req.user.role === 'admin') {
      reservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        validatedData,
        { new: true }
      )
        .populate("roomId")
        .populate("userId");
    } else {
      // If regular user, only update their own reservations
      reservation = await Reservation.findOneAndUpdate(
        { 
          _id: req.params.id, 
          userId: req.user.id 
        },
        validatedData,
        { new: true }
      )
        .populate("roomId")
        .populate("userId");
    }

    if (!reservation) {
      return next(createError(404, "Reserva no encontrada"));
    }

    res.status(200).json({
      message: "Reserva actualizada con éxito",
      reservation,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {
    let deletedReservation;
    
    // If admin, can delete any reservation
    if (req.user.role === 'admin') {
      deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    } else {
      // If regular user, only delete their own reservations
      deletedReservation = await Reservation.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id
      });
    }

    if (!deletedReservation) {
      return next(createError(404, "Reserva no encontrada"));
    }

    await Room.updateOne(
      { bookings: req.params.id },
      { $pull: { bookings: req.params.id } }
    );

    res.status(200).json({
      message: "Reserva eliminada exitosamente",
      reservation: deletedReservation,
    });
  } catch (err) {
    next(err);
  }
};