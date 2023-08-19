import { useState } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import NoData from "../../components/NoData";
import FeedPost from "../../components/FeedPost";
import { useSelector } from "react-redux";
import UnauthorizedMessage from "../../components/UnauthorizedMessage";

const Saved = () => {
    const { currentUser } = useSelector((state) => state.user);
    // eslint-disable-next-line
    const [savedPosts, setSavedPosts] = useState([
        {
            author: {
                fullname: "Rahul Suresh",
            },
            createdDate: new Date(),
            topics: ["Topic 1", "Topic 2", "Topic 3"],
            content:
                "<p><strong>Rich text</strong>: <i>Italics</i> and <u>Underline</u></p>",
            upvotes: [],
            downvotes: [],
        },
    ]);

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
                                <FeedPost key={ind} saved post={post} />
                            ))
                        )}
                    </div>
                )}
            </MainLayout>
        </div>
    );
};

export default Saved;
