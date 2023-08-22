import "./style.css";
import postApis from "../../apis/post";
import { useEffect, useState } from "react";
import FeedPostUnauthenticated from "../FeedPostUnauthenticated";

const UnauthenticatedFeed = () => {
    const [posts, setposts] = useState([]);

    useEffect(() => {
        const getAllPosts = async () => {
            const posts = await postApis.getAllUnauthPosts();
            setposts(posts.reverse());
        };
        if (posts.length === 0) {
            getAllPosts();
        }
    }, [posts]);

    return (
        <div className="UnauthenticatedFeed_container">
            {posts.map((post) => (
                <FeedPostUnauthenticated key={post._id} post={post} />
            ))}
        </div>
    );
};

export default UnauthenticatedFeed;
