const express = require('express');
const dotenv = require('dotenv').config()
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

app.use(helmet());



app.use('/api/goals', require('./routes/goalRoutes'))


app.listen(PORT, () => console.log('Server is alive on port ' + PORT));

