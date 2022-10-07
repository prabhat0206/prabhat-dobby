import express from "express";
import { Image, connectDB, disconnectDB } from "../database";
import { isAuth } from "../utilities";
import imageUpload from "../utilities/awss3";

const imageRouter = express.Router();

imageRouter.get("/", isAuth, async (req, res) => {
  try {
    await connectDB();
    const images = await Image.find({
      user: res.locals.user.id,
    });
    await disconnectDB();
    return res.status(200).send(images);
  } catch (error) {
    await disconnectDB();
    return res.status(400).send(error);
  }
});

const generateUrl = (req: express.Request, file: any) => {
  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${file.key}`;
};

imageRouter.post("/", isAuth, imageUpload.single("image"), async (req, res) => {
  const { title } = req.body;
  if (!req.file) {
    return res.status(400).send({ message: "Image is required" });
  }
  const imageUrl = generateUrl(req, req.file);
  try {
    await connectDB();
    const newImage = await Image.create({
      name: title,
      url: imageUrl,
      user: res.locals.user.id,
    });
    await disconnectDB();
    return res.status(200).json(newImage);
  } catch (error) {
    console.log(error);
    await disconnectDB();
    return res.status(400).send(error);
  }
});

imageRouter.get("/search", isAuth, async (req, res) => {
  const key = req.query.q;
  if (!key) {
    return res.sendStatus(400);
  }
  try {
    await connectDB();
    const images = await Image.find({
      user: res.locals.user.id,
      name: { $regex: key, $options: "i" },
    });
    await disconnectDB();
    return res.status(200).json(images);
  } catch (error) {
    console.log(error);
    await disconnectDB();
    return res.status(400).send(error);
  }
});

export default imageRouter;
