import requestMethods from "./base";

const updateProfile = async (data) => {
    console.log(data);
    // return await requestMethods.post("/profile", data);
};

const profileApis = {
    updateProfile,
};

export default profileApis;
