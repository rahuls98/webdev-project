import mongoose from "mongoose";
import PostSchema from "../schemas/Post.js";
import TextProcessing from "../services/TextProcessing.js";

const Post = mongoose.model("Post", PostSchema);

const createPost = async (author, profilePhoto, topics, content) => {
    try {
        const redactResponse = await TextProcessing.redact(content);
        if (redactResponse.count === 0) {
            const post = new Post({
                author,
                profilePhoto,
                topics,
                content,
            });
            await post.save();
            return true;
        } else return false;
    } catch (error) {
        console.error("Error createPost: ", error);
    }
};

const readPosts = async (user) => {
    try {
        return await Post.find({savedBy: {$ne: user}}).populate("author");
    } catch (error) {
        console.error("Error readPosts: ", error);
    }
};

const getAllPosts = async () => {
    try {
        return await Post.find().populate("author");
    } catch (error) {
        console.error("Error readPosts: ", error);
    }
};

const readPostsByAuthors = async (authors, user) => {
    try {
        const posts = await Post.find(
            {author: {$in: authors}},
            {},
            {createdDate: -1}
        ).populate({
            path: "author",
            model: "Expert",
        });
        const postsWithSavedInfo = posts.map((post) => {
            const updatedPost = {...post};
            if (post.savedBy.includes(new mongoose.Types.ObjectId(user))) {
                updatedPost["saved"] = true;
            }
            return updatedPost;
        });
        return postsWithSavedInfo;
    } catch (error) {
        console.error("Error readPostsByAuthors: ", error);
    }
};

const getPostsByAuthor = async (author) => {
    try {
        const posts = await Post.find({author : author});
        return posts;
    } catch (error) {
        console.error("Error getPostsByAuthor: ", error);
    }
}

const searchPostsByTopic = async (topic) => {
    try {
        const posts = await Post.find({topics: topic}).populate("author");
        return posts;
    } catch (error) {
        console.error("Error searchPostsByTopic: ", error);
    }
};

const createSavedPost = async (user, post) => {
    try {
        await Post.updateOne({_id: post}, {$push: {savedBy: user}});
    } catch (error) {
        console.error("Error createSavedPost: ", error);
    }
};

const readUserSavedPosts = async (user) => {
    try {
        const posts = await Post.find({savedBy: user}).populate("author");
        return posts;
    } catch (error) {
        console.error("Error readUserSavedPosts: ", error);
    }
};

const deleteSavedPost = async (user, post) => {
    try {
        await Post.updateOne({_id: post}, {$pull: {savedBy: user}});
    } catch (error) {
        console.error("Error deleteSavedPost: ", error);
    }
};

const upvotePost = async (post, expert) => {
    try {
        const expertInDownvotes = await Post.find({
            _id: post,
            downvotes: expert,
        });
        if (expertInDownvotes.length !== 0) {
            await Post.updateOne(
                {_id: post},
                {$pull: {downvotes: expert}}
            );
        }
        await Post.updateOne({_id: post}, {$push: {upvotes: expert}});
    } catch (error) {
        console.error("Error upvotePost: ", error);
    }
};

const removePostUpvote = async (post, expert) => {
    try {
        const expertInUpvotes = await Post.find({_id: post, upvotes: expert});
        if (expertInUpvotes.length !== 0) {
            await Post.updateOne({_id: post}, {$pull: {upvotes: expert}});
        }
    } catch (error) {
        console.error("Error removePostUpvote: ", error);
    }
};

const downvotePost = async (post, expert) => {
    try {
        const expertInUpvotes = await Post.find({_id: post, upvotes: expert});
        if (expertInUpvotes.length !== 0) {
            await Post.updateOne({_id: post}, {$pull: {upvotes: expert}});
        }
        await Post.updateOne({_id: post}, {$push: {downvotes: expert}});
    } catch (error) {
        console.error("Error downvotePost: ", error);
    }
};

const removePostDownvote = async (post, expert) => {
    try {
        const expertInDownvotes = await Post.find({
            _id: post,
            downvotes: expert,
        });
        if (expertInDownvotes.length !== 0) {
            await Post.updateOne(
                {_id: post},
                {$pull: {downvotes: expert}}
            );
        }
    } catch (error) {
        console.error("Error removePostDownvote: ", error);
    }
};

const deletePostById = async (postId) => {
    try{
        const response = await Post.deleteOne({_id : postId});
        console.log(response);
    }catch(error){
        console.log(error);
    }
}


const PostModel = {
    createPost,
    readPosts,
    readPostsByAuthors,
    searchPostsByTopic,
    createSavedPost,
    readUserSavedPosts,
    deleteSavedPost,
    upvotePost,
    removePostUpvote,
    downvotePost,
    removePostDownvote,
    getPostsByAuthor,
    deletePostById,
    getAllPosts
};

export default PostModel;
