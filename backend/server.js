const express = require('express');
const dotenv = require('dotenv').config()
const helmet = require('helmet');
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Security
app.use(helmet());



app.use('/api/goals', require('./routes/goalRoutes'))

app.use('/api/availabilities', require('./routes/availabilityRoutes'))



app.use(errorHandler)

app.listen(PORT, () => console.log('Server is alive on port ' + PORT));

