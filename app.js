require('dotenv').config();


const express = require('express');
const app = express();

const connectDB = require('./db/connect');


const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

app.use(express.json());


app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Link</a>')
})

app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('DB connected...!')
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();