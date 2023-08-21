import requestMethods from "./base";

const updateProfile = async (data) => {
    return await requestMethods.post("/authentication/profile", data);
};

const profileApis = {
    updateProfile,
};

export default profileApis;
