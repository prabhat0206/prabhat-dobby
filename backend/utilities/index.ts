import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
config();

const SECRET = process.env.SECRET || "secret";

export const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const decoded = verifyToken(token);
    res.locals.user = decoded;
    next();
  } else {
    res.status(401).send({ message: "Invalid Token" });
  }
};
