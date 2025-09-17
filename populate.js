require('dotenv').config();
const jsonProducts = require('./products.json');
const connectDB = require('./db/connect');
const Product = require('./models/product');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.create(jsonProducts);
        console.log('success...')
    } catch (error) {
        console.log(error)
    }
}

start()