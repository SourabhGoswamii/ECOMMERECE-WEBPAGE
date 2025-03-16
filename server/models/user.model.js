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
    address: { type: String, required: [true, "Please provide an address"]
    },
    phone: { type: String , required: [true, "Please provide a phone number"],match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please provide a valid phone number"],}
  ,otp: { type: String },
  otpExpires: { type: Date }, 
},
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);



export default User;
