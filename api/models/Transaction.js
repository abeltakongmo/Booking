import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  client: {
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
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'open',
    required: false,
  },
});

export default mongoose.model("Transaction", TransactionSchema)