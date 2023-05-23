import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema({
  ownerid: {
    type: String,
    required: true,
  },
  clientid: {
    type: String,
    required: true,
  },
  itemid: {
    type: String,
    required: true,
  },
  duration: {
    starttime: {type: Date, required: true},
    endtime: {type: Date, required: true},
  },
  message: [{
    senderid: { type: String, required: false},
    text: { type: String, required: false},
    date: {type: Date, required: false}
  }],
  status: {
    type: String,
    default: 'open',
    required: false,
  },
});

export default mongoose.model("Transaction", TransactionSchema)