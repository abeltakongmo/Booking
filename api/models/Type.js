import mongoose from "mongoose";
const TypeSchema = new mongoose.Schema({

    name: {type: String, required: true},
    subnames: [String],
    image: { type: String },

});

export default mongoose.model("Type", TypeSchema)