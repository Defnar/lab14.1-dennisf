import User from "../models/User.mjs";

export const postUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    const user = await User.create(newUser);

    const userOutput = { username: user.username, email: user.email };

    console.log("user created successfully");
    res.status(201).json(userOutput);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
