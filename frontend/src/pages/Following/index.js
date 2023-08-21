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
import followingApis from "../../apis/following";

const Following = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = useState("1");
    const [experts, setExperts] = useState([]);
    const [topics, setTopics] = useState([]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const getFollowingExperts = async () => {
        const experts = await followingApis.getFollowingExperts(
            currentUser._id
        );
        let filteredExperts = experts.filter(
            (expert) => expert._id != currentUser._id
        );
        setExperts(filteredExperts);
    };
    const getFollowingTopics = async () => {
        const topics = await followingApis.getFollowingTopics(currentUser._id);
        setTopics(topics);
    };

    useEffect(() => {
        if (currentUser) {
            getFollowingExperts();
            getFollowingTopics();
        }
    }, [currentUser._id]);

    const handleExpertsActionClick = () => {
        getFollowingExperts();
        getFollowingTopics();
    };

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
                                        onActionClick={handleExpertsActionClick}
                                    />
                                </TabPanel>
                                <TabPanel value="2">
                                    <TableTopics
                                        data={topics}
                                        following={true}
                                        onActionClick={handleExpertsActionClick}
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
