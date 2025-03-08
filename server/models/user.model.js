import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      minlength: 6,
      maxlength: 255,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"]
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      maxlength: 1024,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String
    },
    phone: { type: String }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);



export default User;
