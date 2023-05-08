import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const createTransaction = async (req, res, next) => {
  const newTransaction = new Transaction(req.body);

  try {
    const savedTransaction = await newTransaction.save();
    user = await User.findByIdAndUpdate()
    await User.findByIdAndUpdate(req.user.id, {
        $push: { transactionids: savedTransaction._id },
    });
    res.status(200).json(savedTransaction);
  } catch (err) {
    next(err);
  }
};
export const updateTransaction = async (req, res, next) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTransaction);
  } catch (err) {
    next(err);
  }
};
export const deleteTransaction = async (req, res, next) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user.id, {
        $pull: { transactionids: req.params.id },
    });
    res.status(200).json("Transaction has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getTransaction = async (req, res, next) => {
  try {
    const Transaction = await Transaction.findById(req.params.id);
    res.status(200).json(Transaction);
  } catch (err) {
    next(err);
  }
};

export const getUserTransactions = async (req, res, next) => {
    try {
      const ownerTransaction = await Transaction.find({ownerid:req.params.id});
      const clientTransaction = await Transaction.find({clientid:req.params.id});
      res.status(200).json(ownerTransaction, clientTransaction);
    } catch (err) {
      next(err);
    }
};

