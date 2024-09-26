import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_LENGTH = 12;

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { username: user.username, _id: user._id, role: user.role },
        process.env.JWT_SECRET
      );

      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    console.log(req.body)
    req.body.role = 'free'
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.json({ error: "Username already taken." });
    }

    // Create a new user with hashed password
    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, SALT_LENGTH),
      email: req.body.email,
      role: req.body.role
    });
    const token = jwt.sign(
      { username: user.username, _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
