import { useState, useEffect } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import NoData from "../../components/NoData";
import FeedPost from "../../components/FeedPost";
import { useSelector } from "react-redux";
import UnauthorizedMessage from "../../components/UnauthorizedMessage";
import postApis from "../../apis/post";

const Saved = (props) => {
    const { currentUser } = useSelector((state) => state.user);
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const getSavedPosts = async () => {
                const posts = await postApis.getSavedPosts(currentUser._id);
                setSavedPosts(posts);
            };
            getSavedPosts();
        }
    }, []);

    const handleRefresh = () => {
        const getSavedPosts = async () => {
            const posts = await postApis.getSavedPosts(currentUser._id);
            setSavedPosts(posts);
        };
        if (currentUser) getSavedPosts();
    };

    return (
        <div className="Saved_container">
            <MainLayout page={3}>
                {currentUser === undefined || currentUser === null ? (
                    <UnauthorizedMessage />
                ) : (
                    <div className="SavedLayoutContent_container">
                        {savedPosts?.length === 0 ? (
                            <NoData />
                        ) : (
                            savedPosts.map((post, ind) => (
                                <FeedPost
                                    key={ind}
                                    saved
                                    post={post}
                                    onDelete={handleRefresh}
                                />
                            ))
                        )}
                    </div>
                )}
            </MainLayout>
        </div>
    );
};

export default Saved;
