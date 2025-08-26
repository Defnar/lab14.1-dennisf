import {
  MissingLoginInfoError,
  MissingUserError,
  UserAlreadyExistsError,
} from "../errorHandlers/userErrors.mjs";
import User from "../models/User.mjs";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const postUser = async (req, res) => {
  try {
    const newUser = req.body;

    const emailExists = await User.exists({ email: newUser.email });

    if (emailExists) {
      throw new UserAlreadyExistsError("Email already exists");
    }

    const user = await User.create(newUser);

    const userOutput = { username: user.username, email: user.email };

    res.status(201).json(userOutput);
  } catch (err) {
    if (err instanceof UserAlreadyExistsError)
      res.status(400).json({ error: err.message });
    else {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check for email and password
    if (!email || !password) {
      throw new MissingLoginInfoError(
        "Email and password are required to log in"
      );
    }

    const user = await User.findOne({ email: email });

    //check if user exists
    if (!user) {
      throw new MissingUserError("User not found");
    }

    const match = await user.isCorrectPassword(password);

    if (match) {
      //transform user into data for token
      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
      };

      const expiration = "1h";

      //create token
      const token = jwt.sign({ data: payload }, secret, {
        expriesIn: expiration,
      });

      res.json(token);
    }
  } catch (err) {
    if (err instanceof MissingLoginInfoError || err instanceof MissingUserError)
      res.status(400).json({ error: err.message });
    else {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
};
