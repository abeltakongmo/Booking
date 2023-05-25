import Item from "../models/Item.js";
import Type from "../models/Type.js";
import User from "../models/User.js";
import dotenv from "dotenv";


export const createItem = async (req, res, next) => {
  try {
    req.body.expiredate =  new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    req.body.duration.starttime = new Date()
    req.body.duration.endtime = req.body.expiredate
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    await User.findByIdAndUpdate(req.user.id, {
        $push: { itemids: savedItem._id },
        $set: { coin: res.usercoin - process.env.CREATION},
    });
    res.status(200).json(savedItem);
  } catch (err) {
    next(err);
  }
};
export const updateItem = async (req, res, next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
};
export const deleteItem = async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user.id, {
        $pull: { itemids: req.params.id },
    });
    res.status(200).json("Item has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};
/*
export const getItems = async (req, res, next) => {
  
  const { min, max, ...others } = req.query;
  try {
    console.log("getitems")
    const Items = await Item.find({
      ...others,
      cheapestPrice: { $gt: min | 0, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(Items);
  } catch (err) {
    next(err);
  }´
};*/

export const getItems = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {

    const Items = await Item.find();
    res.status(200).json(Items);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Item.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const ItemCount = await Item.countDocuments({ type: "Item" });
    const apartmentCount = await Item.countDocuments({ type: "apartment" });
    const resortCount = await Item.countDocuments({ type: "resort" });
    const villaCount = await Item.countDocuments({ type: "villa" });
    const cabinCount = await Item.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Item", count: ItemCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getUserItems = async (req, res, next) => {
  try {
    const items = await Item.find({owner:req.param.id});
    res.status(200).json(items)
  } catch (err) {
    next(err);
  }
};
