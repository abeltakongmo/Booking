import Type from "../models/Type.js";
import { createError } from "../utils/error.js";

export const createType = async (req, res, next) => {
  const typeid = req.params.typeid;
  const newType = new Type(req.body);

  try {
    const savedType = await newType.save();
    try {
      await Type.findByIdAndUpdate(typeid, {
        $push: { Types: savedType._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedType);
  } catch (err) {
    next(err);
  }
};

export const updateType = async (req, res, next) => {
  try {
    const updatedType = await Type.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedType);
  } catch (err) {
    next(err);
  }
};

export const deleteType = async (req, res, next) => {
  const typeid = req.params.typeid;
  try {
    await Type.findByIdAndDelete(req.params.id);
    try {
      await Type.findByIdAndUpdate(typeid, {
        $pull: { Types: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Type has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getType = async (req, res, next) => {
  try {
    const Type = await Type.findById(req.params.id);
    res.status(200).json(Type);
  } catch (err) {
    next(err);
  }
};
export const getTypes = async (req, res, next) => {
  try {
    const Types = await Type.find();
    res.status(200).json(Types);
  } catch (err) {
    next(err);
  }
};
