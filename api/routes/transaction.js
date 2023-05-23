import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
  responseTransaction
} from "../controllers/transaction.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:id", createTransaction);

//UPDATE
router.put("/:id", verifyToken, updateTransaction);
router.put("/response/:id", responseTransaction);

//DELETE
router.delete("/:id", verifyAdmin, deleteTransaction);

//GET
router.get("/:id", getTransaction);

//GET ALL
router.get("/", verifyToken, getTransactions);

export default router;
