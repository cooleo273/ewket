const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleWare");


router.get("/", async (req, res) => {
  const listOfPosts = await Users.findAll();
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  res.json(user);
});


router.post("/", async (req, res) => {
  const { username, password, first_name, last_name, role, gender } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      first_name: first_name,
      last_name: last_name,
      role:role,
      gender:gender,
    });
    res.json("success");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username} });
  if (!user) res.json({ error: "user does not exist" });
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "wrong username and password combination" });
    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json(accessToken);
  });
});

router.get("/basicInfo/:id", async(req,res)=>{
  const id = req.params.id;
  const basicInfo = await Users.findByPk(id, {attributes:{exclude:["password"]}});
  res.json(basicInfo);
})
router.get('/user', validateToken, (req, res)=>{
  res.json(req.user)
})
module.exports = router;
