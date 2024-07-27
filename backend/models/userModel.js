const mongoose = require("mongoose");

// Creating the Schema of the collection in the database 
const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        age:{
            type: Number
        }
    },
    {
        timestamps : true
    }
);

// Creating the model for the database 
const User = mongoose.model("User", userSchema)
module.exports = User;