const jwt = require("jsonwebtoken");
const prisma = require('../model/prisma')

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log(authorization)
    if (!authorization)
      return res.json({ msg: "unauthorized access" }).status(401);
    if (!authorization.startsWith("Bearer "))
      return res.json({ msg: "unauthorized access" }).status(401);
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY || "");
    const user = await prisma.user.findUnique({where:{id:payload.id}})
    if(!user) return res.status(401).json({msg:"user not found"})
    req.user = user
    next()
  } catch (err) {
    console.log(err);
    next(err)
}
};
