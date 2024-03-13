const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminModel = require("./Admins");

const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

//crud functions for admin

const postAdmin = async(req,res) => {
    const admin = new adminModel({
        id: Math.random().toString(36).substr(2,9),
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        published: req.body.published,
        thumbnail: req.body.thumbnail,
        video: req.body.video,
    });

    try {
        const savedAdmin = admin.save();
        res.status(200).json(savedAdmin);
    } catch (error) {
        res.status(404).json({message: "Error creating admin"})
    }
}

const getAllAdmins = async(req,res) => {
    try {
        const allAdmins = await adminModel.find();
        res.json(allAdmins)
    } catch (error) {
        res.status(404).json({ message: 'Error getting admins'});
    }
}

const deleteAdminById = async(req,res) => {
    try {
        const deletedAdmin = await adminModel.findByIdAndDelete(req.params.id);
        res.json(deletedAdmin);
    } catch (error) {
        res.status(404).json(error)
    }
}

const updateAdminById = async(req,res) => {
    try {
        const updatedAdmin = await adminModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(updatedAdmin)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getCoursesbyId = async(req,res) => {
    try {
        const courses = await adminModel.findById(req.params.id);
        if (!courses) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

app.post("/admin", postAdmin);
app.get("/admin", getAllAdmins);
app.delete("/:id", deleteAdminById);
app.put("/:id", updateAdminById);
app.get("/:id", getCoursesbyId);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})