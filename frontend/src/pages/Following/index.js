// eslint-disable-next-line
import { useState, useEffect } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableExperts from "../../components/TableExperts";
import TableTopics from "../../components/TableTopics";
import { useSelector } from "react-redux";
import UnauthorizedMessage from "../../components/UnauthorizedMessage";

const Following = () => {
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

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    // useEffect(() => {
    //     const getFollowingExperts = async () => {
    //         const experts = await followingApis.getFollowingExperts();
    //         setExperts(experts);
    //     }
    //     const getFollowingTopics = async () => {
    //         const topics = await followingApis.getFollowingTopics();
    //         setTopics(topics);
    //     }
    //     getFollowingExperts();
    //     getFollowingTopics();
    // }, []);

    return (
        <div className="Following_container">
            <MainLayout page={currentUser ? 2 : -1}>
                {currentUser === undefined || currentUser === null ? (
                    <UnauthorizedMessage />
                ) : (
                    <div className="FollowingLayoutContent_container">
                        <div className="FollowingLayoutContent_cards">
                            <TabContext value={tab}>
                                <TabList onChange={handleTabChange}>
                                    <Tab label="Experts" value="1" />
                                    <Tab label="Topics" value="2" />
                                </TabList>
                                <TabPanel value="1">
                                    <TableExperts
                                        data={experts}
                                        following={true}
                                    />
                                </TabPanel>
                                <TabPanel value="2">
                                    <TableTopics
                                        data={topics}
                                        following={true}
                                    />
                                </TabPanel>
                            </TabContext>
                        </div>
                    </div>
                )}
            </MainLayout>
        </div>
    );
};

export default Following;
