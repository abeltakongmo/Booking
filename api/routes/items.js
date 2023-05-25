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
import {verifyAdmin} from "../utils/verifyToken.js";
import {validationcreation} from "../utils/operationcoin.js"
const router = express.Router();

//CREATE
router.post("/create", verifyAdmin, validationcreation, createItem);

//UPDATE
router.put("/:id", verifyAdmin, updateItem);
//DELETE
router.delete("/remove/:id", verifyAdmin, deleteItem);
//GET

router.get("/find/:id", getItem);
//GET ALL

router.get("/", getItems);
router.get("/countByType", countByType);
router.get("/countByCity", countByCity);
router.get("/:id", getUserItems);

export default router;
