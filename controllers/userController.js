import UserModel from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists!" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    const response = await newUser.save();

    res.status(201).redirect("/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.redirect('/not-found');
    }

    if (!bcrypt.compare(password, user.password)) {
      return res.status(404).json({ error: "Wrong Password!" });
    }

    const payload = {
      name: user.name,
      id: user._id,
    };

    const token = jwt.sign(payload, "Random String", {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "Logged in successfully!",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    // Update the user's password
    user.password = password;
    await user.save();

    res.status(200).redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default {
  createUser,
  getUser,
  updateUser,
};
