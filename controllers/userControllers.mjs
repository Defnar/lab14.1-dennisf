import User from "../models/User.mjs";

export const postUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    await User.create(newUser);
    console.log("user created successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
