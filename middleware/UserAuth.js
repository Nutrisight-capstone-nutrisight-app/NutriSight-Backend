import jwt from "jsonwebtoken";

export const accessValidation = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Unautorized, token is missing or invalid" });
  
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, user) => {
    if (error) return res.status(401).json({ message: "Unautorized, token is missing or invalid" });
    req.user = user;
    next();
  });
};
