import usersModel from "../models/User.js";

export const findUserByUsername = (email) => usersModel.findOne({ email });
export const findUserByCredentials = (email, password) =>
    usersModel.findOne({ email, password });
export const createUser = (user) => usersModel.create(user);
export const updateUser = async (id, user) => {
    try {
        const updatedUser = usersModel.updateOne({ _id: id }, { $set: user });
        return updatedUser;
    } catch (error) {
        console.log(error);
    }
};
export const deleteUser = (id) => usersModel.deleteOne({ _id: id });
