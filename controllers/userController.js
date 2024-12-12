import { User } from "../models/User.js";

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Se actualizo correctamente el usuario",
      user: userUpdated,
    });
  } catch (err) {
    next(err)
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({
      user
    });
  } catch (err) {
    next(err)  }
};

export const getUsers = async (req, res, next) => {
  try {
    const Users = await User.find();
    res.status(200).json({
      Users
    });
  } catch (err) {
    next(err)  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "El usuario fue eliminado con exito" });
  } catch (err) {
    next(err)  }
};
