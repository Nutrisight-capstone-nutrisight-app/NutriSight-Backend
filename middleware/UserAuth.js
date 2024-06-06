import jwt from "jsonwebtoken";

export const accessValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "token is missing or invalid" });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_ACCESS_SECRET;

  try {
    const jwtDecode = jwt.verify(token, secret);
    req.user = jwtDecode;
  } catch (error) {
    return res.status(401).json({ message: "Unautorized" });
  }
  next();
};
