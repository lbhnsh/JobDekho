// middleware/authMiddleware.js

import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  console.log("Authorization Header:", authHeader); // Add logging

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    return res.status(401).json({ message: "Authentication Failed" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const userToken = JWT.verify(token, "labhansh");
    req.body.user = {
      userId: userToken.userId,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication Failed" });
  }
};

export default userAuth;
