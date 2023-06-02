import express from "express";
import {
  countByCity,
  countByType,
  createItem,
  deleteItem,
  getItem,
  getUserItems,
  getItems,
  updateItem,
} from "../controllers/item.js";
import Item from "../models/Item.js";
import {verifyAdmin, verifyToken} from "../utils/verifyToken.js";
import {validationcreation} from "../utils/coin.js"
const router = express.Router();

//CREATE
router.post("/", verifyToken, validationcreation, createItem);

//UPDATE
router.put("/:id", verifyToken, updateItem);

//DELETE
router.delete("/:id", verifyAdmin, deleteItem);

//GET
router.get("/countByType", countByType);
router.get("/", getItems);
router.get("/:id", getItem);
router.get("/user/:id", getUserItems);
router.get("/countByCity", countByCity);


export default router;
