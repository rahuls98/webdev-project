import { useState } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableExperts from "../../components/TableExperts";
import TableTopics from "../../components/TableTopics";
// import expertApis from "../../apis/expert";
// import topicApis from "../../apis/topic";
// import postApis from "../../apis/post";
// import sessionApis from "../../apis/session";
import FeedPost from "../../components/FeedPost";
import FeedSession from "../../components/FeedSession";
import NoData from "../../components/NoData";
// import feedApis from "../../apis/feed";
import { useSelector } from "react-redux";
import UnauthorizedMessage from "../../components/UnauthorizedMessage";

const Explore = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = useState("1");
    // eslint-disable-next-line
    const [experts, setExperts] = useState([
        {
            _id: 1,
            fullname: "Expert 1",
            followerCount: 10,
            expertiseTopics: ["Topic 1", "Topic 2", "Topic 3"],
        },
        {
            _id: 2,
            fullname: "Expert 2",
            followerCount: 20,
            expertiseTopics: ["Topic 4", "Topic 5", "Topic 6"],
        },
    ]);
    // eslint-disable-next-line
    const [topics, setTopics] = useState([
        {
            _id: 1,
            title: "Topic 1",
        },
        {
            _id: 2,
            title: "Topic 2",
        },
    ]);
    // eslint-disable-next-line
    const [posts, setPosts] = useState([
        {
            _id: 1,
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
    // eslint-disable-next-line
    const [sessions, setSessions] = useState([
        {
            _id: 1,
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
    ]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (props.searchString !== "") {
            const search = async () => {
                const searchResult = await feedApis.search(props.searchString);
                setExperts(searchResult.experts || []);
                setTopics(searchResult.topics || []);
                setPosts(searchResult.posts || []);
                setSessions(searchResult.sessions || []);
            }
            search();
        } else {
            const getAllExperts = async () => {
                const experts = await expertApis.getAllExperts();
                setExperts(experts);
            }
            const getAllTopics = async () => {
                const topics = await topicApis.getExplorableTopics();
                setTopics(topics);
            }
            const getAllPosts = async () => {
                const posts = await postApis.getAllPosts();
                setPosts(posts);
            }
            const getAllSessions = async () => {
                const sessions = await sessionApis.getAllSessions(currentUser._id);
                setSessions(sessions);
            }
            getAllExperts();
            getAllTopics();
            getAllPosts();
            getAllSessions();
        }
    }, [props.searchString]);

    return (
        <div className="Explore_container">
            <MainLayout page={currentUser ? 4 : -1}>
                {currentUser === undefined || currentUser === null ? (
                    <UnauthorizedMessage />
                ) : (
                    <div className="ExploreLayout_container">
                        <TabContext value={tab}>
                            <TabList onChange={handleTabChange}>
                                <Tab label="Topics" value="1" />
                                <Tab label="Experts" value="2" />
                                <Tab label="Posts" value="3" />
                                <Tab label="Sessions" value="4" />
                            </TabList>
                            <TabPanel value="1">
                                <TableTopics data={topics} />
                            </TabPanel>
                            <TabPanel value="2">
                                <TableExperts data={experts} />
                            </TabPanel>
                            <TabPanel value="3">
                                {posts.length === 0 ? (
                                    <NoData />
                                ) : (
                                    posts.map((post) => (
                                        <FeedPost key={post._id} post={post} />
                                    ))
                                )}
                            </TabPanel>
                            <TabPanel value="4">
                                {sessions.length === 0 ? (
                                    <NoData />
                                ) : (
                                    sessions.map((session) => (
                                        <FeedSession
                                            key={session._id}
                                            session={session}
                                        />
                                    ))
                                )}
                            </TabPanel>
                        </TabContext>
                    </div>
                )}
            </MainLayout>
        </div>
    );
};

export default Explore;
