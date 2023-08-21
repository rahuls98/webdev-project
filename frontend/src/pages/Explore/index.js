import { useState, useEffect } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableExperts from "../../components/TableExperts";
import TableTopics from "../../components/TableTopics";
import expertApis from "../../apis/expert";
import topicApis from "../../apis/topic";
import postApis from "../../apis/post";
import sessionApis from "../../apis/session";
import FeedPost from "../../components/FeedPost";
import FeedSession from "../../components/FeedSession";
import NoData from "../../components/NoData";
import feedApis from "../../apis/feed";
import { useSelector } from "react-redux";
import UnauthorizedMessage from "../../components/UnauthorizedMessage";

const Explore = (props) => {
    const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = useState("1");
    const [experts, setExperts] = useState([]);
    const [topics, setTopics] = useState([]);
    const [posts, setPosts] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [searchString, setSearchString] = useState("");

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (currentUser) {
            if (searchString !== "") {
                const search = async () => {
                    const searchResult = await feedApis.search(searchString);
                    setExperts(searchResult.experts || []);
                    setTopics(searchResult.topics || []);
                    setPosts(searchResult.posts || []);
                    setSessions(searchResult.sessions || []);
                };
                search();
            } else {
                const getAllExperts = async () => {
                    const experts = await expertApis.getAllExperts();

                    let filteredExperts = experts.filter(
                        (expert) => expert._id != currentUser._id
                    );
                    setExperts(filteredExperts);
                };
                const getAllTopics = async () => {
                    const topics = await topicApis.getExplorableTopics(
                        currentUser?._id
                    );
                    setTopics(topics);
                };
                const getAllPosts = async () => {
                    const posts = await postApis.getAllPosts(currentUser?._id);
                    let filteredPosts = posts.filter(
                        (post) => post.author._id != currentUser._id
                    );
                    setPosts(filteredPosts);
                };
                const getAllSessions = async () => {
                    const sessions = await sessionApis.getAllSessions(
                        currentUser._id
                    );
                    let filteredSessions = sessions.filter(
                        (session) => session.author._id != currentUser._id
                    );
                    setSessions(filteredSessions);
                };
                getAllExperts();
                getAllTopics();
                getAllPosts();
                getAllSessions();
            }
        }
    }, [searchString]);

    const handleExpertsActionClick = () => {};

    return (
        <div className="Explore_container">
            <MainLayout
                page={currentUser ? 4 : -1}
                searchString={searchString}
                setSearchString={setSearchString}
            >
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
                                <TableTopics
                                    data={topics}
                                    onActionClick={handleExpertsActionClick}
                                />
                            </TabPanel>
                            <TabPanel value="2">
                                <TableExperts
                                    data={experts}
                                    onActionClick={handleExpertsActionClick}
                                />
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
