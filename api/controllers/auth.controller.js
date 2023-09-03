import User from "./models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been registered");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const user = User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).send("User not found!");
    }
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
      res.status(400).send("Wrong Credentials");
    }
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.SECRET_KEY
    );

    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
      
  } catch (error) {
    console.log(error);
  }
};
