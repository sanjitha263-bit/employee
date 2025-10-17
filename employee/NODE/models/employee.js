const mongoose = require ("mongoose");
const ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
        trime : true
    },
     price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: ["Electronics", "Clothes", "Food", "Books", "Other"], 
      default: "Other",
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0, 
    }

});
 module.exports = mongoose.model("Product", ProductSchema);