import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const createTransaction = async (req, res, next) => {
  const newTransaction = new Transaction(req.body);
  try {
    const savedTransaction = await newTransaction.save();

    await User.findByIdAndUpdate(req.body.clientid, {
      $push: { transactionids: savedTransaction._id },
    });
    await User.findByIdAndUpdate(req.body.ownerid, {
      $push: { transactionids: savedTransaction._id },
    });
    res.status(200).json(savedTransaction);
  }
  catch (err) {
    next(err);
  }
};
export const responseTransaction = async (req, res, next) => {
  try {
    const message = {
      senderid: req.body.senderid,
      text: req.body.text,
      date: Date.now()
    }
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        $push: { message: message },
        $set: { status: req.body.status },
      },
      { new: true }
    );
    if(req.body.status == 'accepted'){
      duration = {
        starttime : updatedTransaction.duration.starttime,
        endtime: updatedTransaction.duration.endtime
      }
      await Item.findByIdAndUpdate(updatedTransaction.itemid, {
        $set: { status: 'notavailable' },
        $set: { duration: duration },
        },
        { new: true }
      );
    }
    if(req.body.status == 'denied'){
      await Transaction.findByIdAndUpdate(
        req.params.id,
        {
          $set: { status: 'closed' },
        },
      );
    }
    res.status(200).json(updatedTransaction);
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
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};

export const getTransactions = async (req, res, next) => {
    try {
      const ownerTransaction = await Transaction.find({ownerid: req.user.id});
      const clientTransaction = await Transaction.find({clientid: req.user.id});

      res.status(200).json({
        ownerTransaction: ownerTransaction, 
        clientTransaction: clientTransaction
      });
    } catch (err) {
      next(err);
    }
};

