import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "username required"],
    min: 6,
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password required"],
    min: 8,
  },
});

UserSchema.pre("save", async (next) => {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

const User = model("User", UserSchema);

export default User;
