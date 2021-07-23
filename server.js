const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const courseRoute = require('./routes/course-route');
const authRoute = require('./routes/auth-route');
const reviewRoute = require('./routes/review-route');
const path = require('path');

// express app
const app = express();


// middleware
app.use(express.json());
app.use(cors());

// env settings
dotenv.config();

const DB_URL = process.env.DB_URL;
const port = process.env.PORT || 5000;

// routes
app.use('/api/courses', courseRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/auth',authRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/frontend/build')));
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
    })
} else{
    app.get('/', (req,res) => {
        res.send('API running');
    })
}

// connect to mongodb
mongoose.connect(DB_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
        app.listen(port, () => {
            console.log(`Listening on ${port}`)
        })
    })
    .catch((err) => console.log(err));

