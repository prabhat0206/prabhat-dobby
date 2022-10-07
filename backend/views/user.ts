import express from "express";
import { User, connectDB, disconnectDB } from "../database/index";
import { generateToken, verifyToken, isAuth } from "../utilities";

const userRouter = express.Router();

userRouter.get("/", isAuth, (req, res) => {
  return res.sendStatus(200);
});

userRouter.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    await connectDB();
    const user = await User.create({
      name,
      username,
      email,
      password,
    });
    const token = generateToken(user);
    await disconnectDB();
    return res.status(200).send({ user, token });
  } catch (error) {
    await disconnectDB();
    return res.status(400).send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await connectDB();
    let user: any = await User.findOne({ email });
    if (user) {
      const isValid = await user.validatPassword(password);
      if (isValid) {
        const token = generateToken(user);
        user.password = "";
        await disconnectDB();
        return res.status(200).send({ user, token });
      }
    }
    await disconnectDB();
    return res.status(400).send({ message: "Invalid email or password" });
  } catch (error) {
    await disconnectDB();
    return res.status(400).send(error);
  }
});

export default userRouter;
