//using express
const express = require('express')
// Using Node.js `require()`
const mongoose = require('mongoose');
//declare app 
const app = express()
//middleware for communication
 app.use(express.json());
//for productModel connection
const Product = require('./models/productModel')
const port = 3000

//routes
app.get('/', (req, res) => {
  res.send('Hello Node API')
}) 

app.get('/blog', (req, res) => {   
  res.send('Hello Blog')
})
//route to get data  from the database
app.get('/products',async(req,res)=>{
  try{
      const products=await Product.find({});
      res.status(200).json(products);
  }catch(error){
    res.status(500).json ({message:error.message})
  }
})
//route to fetch a product by id
app.get('/products/:id',async(req,res)=>{
  try{
     const{id}=req.params;
      const products=await Product.findById(id);
      res.status(200).json(products);
  }catch(error){
    res.status(500).json ({message:error.message})
  }
})
//route to update data
app.put('/products/:id',async(req,res)=>{
  try{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body);
    //we cant find any product in the database
    if(!product){
      return res.status(404).json({message:`cannot find any product with id ${id}`})
    }
    res.status(200).json(product);
  }catch(error){
    res.status(500).json ({message:error.message})
    
  }
})
//route to save data to the database
app.post('/products',async(req,res)=> {
   try{
      const product=await Product.create(req.body)
      res.status(200).json(product);
    }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message})
   }     

})
mongoose.connect('mongodb+srv://NPM:NPM%40%40%40200314c@clusterngonie.lhmjsiu.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=ClusterNgonie')
  .then(() => {
    app.listen(port, () => {
           console.log(`Example app listening on port ${port}`);
     });
     console.log('Database Connected!');
    })
  .catch((error) => {  
    console.log(error);
  });  

  
