import { useState } from "react";
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
import {useSelector} from "react-redux";
import UnauthenticatedFeed from "../../components/UnauthenticatedFeed";

const Feed = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [tab, setTab] = useState("1");
    // eslint-disable-next-line
    const [posts, setPosts] = useState([
        {
            _id: 1,
            _doc: {
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
            saved: true,
        },
    ]);
    // eslint-disable-next-line
    const [sessions, setSessions] = useState([
        {
            _id: 1,
            _doc: {
                author: {
                    fullname: "Rahul Suresh",
                },
                createdDate: new Date(),
                topics: ["Topic 1", "Topic 2", "Topic 3"],
                title: "Session title",
                description: "Session description",
                sessionDate: "June 10 2023",
                sessionTime: "10:00 AM",
            },
            enrolled: true,
        },
    ]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
                <div className="Feed_container">
                    <MainLayout page={0}>
                        <div className="FeedLayoutContent_container">
                            {(currentUser === undefined || currentUser === null) ? <UnauthenticatedFeed/> :
                            <div className="FeedLayoutContent_content">
                                <Grid container spacing={0}>
                                    <Grid item lg={8}>
                                        <TabContext value={tab}>
                                            <TabList onChange={handleTabChange}>
                                                <Tab label="Posts" value="1" />
                                                <Tab label="Sessions" value="2" />
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
                                                            session={session._doc}
                                                            enrolled={session.enrolled}
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
                            </div>}
                        </div>
                    </MainLayout>
                </div>
        </div>
    );
};

export default Feed;
