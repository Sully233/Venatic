const express = require('express');
const dotenv = require('dotenv').config()
const helmet = require('helmet');
const mongoose = require('mongoose');
const {errorHandler} = require('./middleware/errorMiddleware')

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Security
app.use(helmet());



app.use('/api/goals', require('./routes/goalRoutes'))




app.use(errorHandler)

app.listen(PORT, () => console.log('Server is alive on port ' + PORT));

