const express = require('express');
const router = express.Router();
const {Grades} = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleWare")


router.get("/:userId", async(req, res)=>{
    const userId = req.params.userId;
    const grades = await Grades.findAll({where:{UserId:userId}})
    res.json(grades)
})
router.post("/", validateToken, async (req, res)=>{
    const grade = req.body;
    const username = req.user.username;
    grade.username = username;
    await Grades.create(grade);
    res.json(grade)
})



module.exports = router 