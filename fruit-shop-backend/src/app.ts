import express from 'express';

import fruitRoutes from './routes/fruitRoute';
import userRoutes from './routes/userRoute';
import orderRoutes from './routes/orderRoute';
// import path from 'path';
import path from 'path';
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
app.use(cors());
// parse application/json
app.use(bodyParser.json())
const uploadsPath = path.join(__dirname, '../uploads');
// const upPath = path.resolve(__dirname, 'uploads');
console.log('Serving static files from:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));
// app.get("/", express.static(path.join(__dirname, "./public")));

app.use('/api/fruits',fruitRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes)

export default app;