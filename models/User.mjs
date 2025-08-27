import { Schema, model } from "mongoose";
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

UserSchema.pre("save", async function(next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

/*
this took a ton of research to figure out.
for future Dennis reference:
set here is telling the toJSON method new options under transform, and now the new transform options removes
password from the returned document this is applied to documentation found under mongoose => Document.ToJSON, mongoose => Schema.set.
set here only applies during converting tojson, great for responses.
further reading, and launch point into research, found at
https://medium.com/@mbasamahmad/hiding-mongooses-sensitive-data-with-tojson-in-node-js-6e90459ffb4e
*/
UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
})

UserSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", UserSchema);

export default User;
