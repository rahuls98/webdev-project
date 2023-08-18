import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    fullname: {
        type: String,
        required: true,
    }
},{ collection: "users" });

export default UserSchema;
