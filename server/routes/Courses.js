const express = require('express');
const { validateToken } = require('../middlewares/AuthMiddleWare');
const router = express.Router();
const {Courses} = require("../models");


router.post("/",validateToken, async (req, res)=>{
    const course = req.body;
    await Courses.create(course);
    res.json(course)
})



module.exports = router 