const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Please enter your name"]
  },
    quantity:{
      type:Number,
      required :true,
      default:0
    }, 
     price: {
    type: String,
    required: false 
  }  
}, {  
  timestamps: true
});
const Product = mongoose.model('Product',productSchema);

  module.exports=Product;
  