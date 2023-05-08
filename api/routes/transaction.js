import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transaction.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:id", verifyAdmin, createTransaction);

//UPDATE
router.put("/:id", verifyAdmin, updateTransaction);
//DELETE
router.delete("/:id", verifyAdmin, deleteTransaction);
//GET

router.get("/:id", getTransaction);
//GET ALL

router.get("/", getTransactions);

export default router;
