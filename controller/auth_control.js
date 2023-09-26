const bcrypts = require("bcryptjs");
const prisma = require("../model/prisma");
const jwt = require('jsonwebtoken')
const expire = process.env.EXPIRES


exports.register = async (req, res, next) => {
  try {
    const { username, password, email, confirmPassword } = req.body;
    const hashed_password = await bcrypts.hash(password, 12);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashed_password,
      },
    });
 
    res.status(200).json({ msg: "registration success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const secret_key = process.env.SECRET_KEY
    const target_user = await prisma.user.findUnique({where: {username: username,}});
    if (!target_user)
      return res.status(400).json({ msg: "invalid credential:username not found" });
    const isMatch = await bcrypts.compare(password, target_user.password);
    if (!isMatch) res.status(400).json({ msg: "invalid credentia :wrong password" });
    const payload = {id:target_user.id}
    const token = jwt.sign(payload,secret_key,{expiresIn:expire})
    res.status(200).json({ msg: "success!",token });
  } catch (err) {}
};
