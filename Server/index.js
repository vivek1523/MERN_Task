const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1); 
  });

  const bannerSchema = new mongoose.Schema({
    image: String,
    text: String,
    link: String,
  });
  
const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
  });
  
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
  });
  
const Banner = mongoose.model('Banners', bannerSchema);
const Category = mongoose.model('Categories', categorySchema);
const Product = mongoose.model('Products', productSchema);

  //Global Errors
app.use((err, req, res, next) => {
    console.error(err.stack);  
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack 
    });
  })


//Routing Pages
app.get('/api/banners', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
        console.log(banners);  
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })  
    }
});


app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
        console.log(categories);   
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: error.message })
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
        console.log(products);      
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: error.message })
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
