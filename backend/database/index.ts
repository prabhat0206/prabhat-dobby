import mongoose from "mongoose";
import bycrypt from "bcrypt";
import { config } from "dotenv";
config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.log(error);
  }
};

interface UserDocument extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  validatPassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const imagesSchema = new mongoose.Schema({
  name: String,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SALT = parseInt(process.env.SALT || "10");

userSchema.methods.validatPassword = function (password: string) {
  return bycrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  const { email, username } = user;
  if (!user.isModified("password")) return next();
  const emailCount = await User.countDocuments({ email });
  const usernameCount = await User.countDocuments({ username });
  if (emailCount > 0) {
    throw new Error("Email already exists");
  }
  if (usernameCount > 0) {
    throw new Error("Username already exists");
  }
  const hash = await bycrypt.hash(user.password || "", SALT);
  user.password = hash;
  next();
});

export const User = mongoose.model<UserDocument>("User", userSchema);
export const Image = mongoose.model("Image", imagesSchema);
