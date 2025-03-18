import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './db.js';
import bookRouter from './routes/book.route.js';
import driverRouter from './routes/driver.route.js';
import staffVehicleRouter from './routes/staffVehicle.route.js';
import router from './routes/user.route.js';
import vehicleRouter from './routes/vehicle.route.js';

const app = express();
connectDB();
app.use(cors({
    origin: 'https://fudar-1.onrender.com'
}));
app.use(bodyParser.json());

app.use('/api/user', router );
app.use('/api/driver', driverRouter );
app.use('/api/staffVehicle', staffVehicleRouter );
app.use('/api/book', bookRouter );
app.use('/api/vehicle', vehicleRouter  );

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
});

