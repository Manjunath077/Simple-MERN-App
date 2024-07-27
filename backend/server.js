const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const cors = require("cors");


dotenv.config();

app.use(cors());

// Middleware to ignore requests for favicon.ico
app.use((req, res, next) => {
    if (req.url === '/favicon.ico') {
        res.status(204).end();
    } else {
        next();
    }
});


// to convert the data of frontend into the json format  
app.use(express.json());

// connecting to the mongo DB
// accessing the variables from the dot env file 
mongoose.connect(process.env.URI)
    .then(()=>{
        console.log("Connected to the mongo db ");
        app.listen(process.env.PORT || 4000, (err)=>{
            if(err) console.log(err);
            console.log("Running serevr successfully at port ",process.env.PORT);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:" ,error)
});

// using the routes from the userRoute.js 
app.use(userRoute);
