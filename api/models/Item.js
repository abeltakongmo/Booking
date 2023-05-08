import mongoose from "mongoose";
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ownerid: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: [
    {raterid: String},
    {
      rate: Number,
      min: 0,
      max: 5
    }
  ],
  duration: {
    starttime: {type: Date, required: true},
    endtime: {type: Date, required: true},
  },
  cheapestPrice: {
    type: Number,
    required: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'notavailable',
    required: false,
  },
});

export default mongoose.model("Item", ItemSchema)