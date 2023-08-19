import mongoose from "mongoose";

const ExpertSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    followerCount: {
        type: Number,
        default: 0,
    },
    expertiseTopics: {
        type: [String],
        required: true,
    },
    password: {
        type : String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    }
});

export default ExpertSchema;
