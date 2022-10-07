import express from "express";
import bodyParser from "body-parser";
import userRouter from "./views/user";
import imageRouter from "./views/images";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/image", imageRouter);

app.listen(8000, () => {
  console.log("server is listening at 8000");
});
