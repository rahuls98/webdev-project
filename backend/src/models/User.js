import mongoose from "mongoose";
import UserSchema from "../schemas/User.js";

const User = mongoose.model("User", UserSchema);

export default User;
