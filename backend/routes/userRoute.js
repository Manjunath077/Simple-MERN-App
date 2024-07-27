const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

// creating the API for interacting with the database 

// Posting data into the database 
router.post("/", async function(req,res){
    const { name , email, age} = req.body;
    try {
        const userAdd = await User.create({
            name:name,
            email:email,
            age:age
        })
        res.status(201).json(userAdd); 
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
})

// Getting the data from the database
router.get("/", async function(req,res){

    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
})

// Getting the data of the particular user ID
router.get("/:id",async function(req,res){
    const { id } = req.params;
    try {
        const singleUser = await User.findById({_id : id})
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

//deleteing the user in the database
router.delete("/:id", async function(req,res){
    const { id } = req.params;
    try {
        const singleUser = await User.findByIdAndDelete({_id : id});
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message});
    }
})

// Update or patch
 router.patch("/:id", async function(req,res){
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
 })

module.exports = router;