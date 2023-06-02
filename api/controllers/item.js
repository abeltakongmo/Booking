import Type from "../models/Type.js";
import Item from "../models/Item.js";
import User from "../models/User.js";
import dotenv from "dotenv";
import { isEmptyObject } from "../utils/function.js";

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
  try {
    let Items = [];
    if(!isEmptyObject(req.query)){
        Items = await Item.find({
        $and: [{
          type: req.query?.type,
          city: req.query?.city,
          status: req.query?.status,
          expiredate: { $gte: new Date(req.query.endtime)}
        }]
      });
    }
    else{ Items = await Item.find();
    }
    console.log('found Items ' +Items.length)
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
    const Types = await Type.find();
    const list = await Promise.all(
      Types.map(async (tp) => {
        var count = 0
        for( var subname of tp.subnames){
          count = count + await Item.countDocuments({ type: subname })
        }
        return { type: tp.name, count: count}
      })
    );
    res.status(200).json(list);
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
