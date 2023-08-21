import { useState, useEffect } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import Grid from "@mui/material/Grid";
import FeedTrending from "../../components/FeedTrending";
import FeedPost from "../../components/FeedPost";
import FeedSession from "../../components/FeedSession";
import NoData from "../../components/NoData";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import UnauthenticatedFeed from "../../components/UnauthenticatedFeed";
import feedApis from "../../apis/feed";

const Feed = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = useState("1");
    const [posts, setPosts] = useState([]);
    const [sessions, setSessions] = useState([]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (currentUser) {
            const getUserFeed = async () => {
                const feed = await feedApis.getUserFeed(currentUser?._id);
                setPosts(feed.posts.reverse());
                setSessions(feed.sessions.reverse());
            };
            if (currentUser) getUserFeed();
        }
    }, []);

    const handleRefresh = () => {
        const getUserFeed = async () => {
            const feed = await feedApis.getUserFeed(currentUser?._id);
            setPosts(feed.posts);
            setSessions(feed.sessions);
        };
        if (currentUser) getUserFeed();
    };

    return (
        <div>
            {currentUser === undefined || currentUser === null ? (
                <MainLayout page={-1}>
                    <UnauthenticatedFeed />
                </MainLayout>
            ) : (
                <div className="Feed_container">
                    <MainLayout page={0} handleRefresh={handleRefresh}>
                        <div className="FeedLayoutContent_container">
                            <div className="FeedLayoutContent_content">
                                <Grid container spacing={0}>
                                    <Grid item lg={8}>
                                        <TabContext value={tab}>
                                            <TabList onChange={handleTabChange}>
                                                <Tab label="Posts" value="1" />
                                                <Tab
                                                    label="Sessions"
                                                    value="2"
                                                />
                                            </TabList>
                                            <TabPanel value="1">
                                                {posts.length === 0 ? (
                                                    <NoData />
                                                ) : (
                                                    posts.map((post) => (
                                                        <FeedPost
                                                            key={post._id}
                                                            post={post._doc}
                                                            saved={post.saved}
                                                            onDelete={
                                                                handleRefresh
                                                            }
                                                        />
                                                    ))
                                                )}
                                            </TabPanel>
                                            <TabPanel value="2">
                                                {sessions.length === 0 ? (
                                                    <NoData />
                                                ) : (
                                                    sessions.map((session) => (
                                                        <FeedSession
                                                            key={session._id}
                                                            session={
                                                                session._doc
                                                            }
                                                            enrolled={
                                                                session.enrolled
                                                            }
                                                            onDelete={
                                                                handleRefresh
                                                            }
                                                        />
                                                    ))
                                                )}
                                            </TabPanel>
                                        </TabContext>
                                    </Grid>
                                    <Grid item lg={4}>
                                        <FeedTrending />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </MainLayout>
                </div>
            )}
        </div>
    );
};

export default Feed;
