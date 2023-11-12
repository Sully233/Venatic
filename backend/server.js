const express = require('express');
const dotenv = require('dotenv').config()
const helmet = require('helmet');
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const Booking = require('./models/bookingModel');

connectDB()

const app = express();

const PORT = process.env.PORT;

app.use(helmet());
app.use(cors())


app.use('/api/webhook', require('./routes/stripeRoutes')) //Stripe API



app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/availabilities', require('./routes/availabilityRoutes'))

app.use('/api/booking', require('./routes/bookingRoutes'))


app.use(errorHandler)


app.listen(PORT, () => console.log('Server is alive on port ' + PORT));

