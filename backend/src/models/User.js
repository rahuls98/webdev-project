import mongoose from "mongoose";
import UserSchema from "../schemas/User.js";

const User = mongoose.model("User", UserSchema);

const createUser = async (pangeaUserId, email, fullname, savedPosts) => {
    try {
        const user = new User({
            pangeaUserId,
            email,
            fullname,
            savedPosts,
        });
        await user.save();
    } catch (error) {
        console.error("Error createUser: ", error);
    }
};

const readUsers = async () => {
    try {
        const users = await User.find();
        console.log("Users: ", users);
    } catch (error) {
        console.error("Error readUsers: ", error);
    }
};

const readByPangeaId = async (pangeaId) => {
    try {
        const user = await User.find({ pangeaUserId: pangeaId });
        return user;
    } catch (error) {
        console.error("Error readByPangeaId: ", error);
    }
};

const UserModel = {
    createUser,
    readUsers,
    readByPangeaId,
};

export default UserModel;
