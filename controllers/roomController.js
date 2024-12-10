import { roomSchema } from "../schemas/roomSchema";
import { Room } from "../models/Room";

export const createRoom = async (req, res) => {
  try {
    const validatedData = roomSchema.parse(req.body);
    const room = new Room(validatedData);
    const roomSaved = await room.save();

    res.status(201).json({ 
      message: "Se ha creado la sala correctamente!", 
      room: roomSaved 
    });
  } catch (err) {
    res.status(400).json({ 
      message: "Ocurrió un error creando la sala", 
      error: err.message 
    });
  }
};

export const updateRoom = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID de sala inválido" });
  }
  try {
    const validatedData = roomSchema.partial().parse(req.body);
    const roomUpdated = await Room.findByIdAndUpdate(id, validatedData, { new: true });
    res.status(200).json({ 
      message: "Se ha actualizado la sala correctamente!", 
      room: roomUpdated 
    });
  } catch (err) {
    res.status(400).json({ 
      message: "Ocurrió un error actualizando la sala", 
      error: err.message 
    });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }
    res.status(200).json({ 
      message: "Se encontró la sala correctamente", 
      room 
    });
  } catch (err) {
    res.status(404).json({ 
      message: "No se pudo encontrar la sala", 
      error: err.message 
    });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ 
      message: "Se encontraron las salas correctamente", 
      rooms 
    });
  } catch (err) {
    res.status(404).json({ 
      message: "No se pudieron encontrar las salas", 
      error: err.message 
    });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "La sala fue eliminada con exito", deletedRoom})
  } catch (error) {
    res.status(400).json({message: 'No se pudó eliminar la sala en cuestion'})
  }
}