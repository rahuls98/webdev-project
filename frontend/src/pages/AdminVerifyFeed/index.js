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
import AdminVerifyPost from "../../components/AdminVerifyPost";

const AdminVerifyFeed = () => {
    const {currentUser} = useSelector((state) => state.user);
    // const [posts, setPosts] = useState([
    //     {
    //         _id: "64e04203fa276a54ad507f38",
    //         email: "bhat@gmail.com",
    //         fullname: "Nitin Bhat",
    //         followerCount: 0,
    //         expertiseTopics: [
    //             "backend",
    //             "frontend",
    //             "indica",
    //             "sativa",
    //             "THC"
    //         ]
    //     },
    // ]);

    const posts = [
        {
            _id: "64e04203fa276a54ad507f38",
            email: "bhat@gmail.com",
            fullname: "Nitin Bhat",
            followerCount: 0,
            expertiseTopics: [
                "backend",
                "frontend",
                "indica",
                "sativa",
                "THC"
            ]
        },
        {
            _id: "64e04203fa276a54ad507f38",
            email: "bhat@gmail.com",
            fullname: "Nitin Bhat",
            followerCount: 0,
            expertiseTopics: [
                "backend",
                "frontend",
                "indica",
                "sativa",
                "THC"
            ]
        },
        {
            _id: "64e04203fa276a54ad507f38",
            email: "bhat@gmail.com",
            fullname: "Nitin Bhat",
            followerCount: 0,
            expertiseTopics: [
                "backend",
                "frontend",
                "indica",
                "sativa",
                "THC"
            ]
        }
    ]

    return (
        <div className="Feed_container">
            <MainLayout page={0}>
                <div className="FeedLayoutContent_container">
                    <div className="FeedLayoutContent_content">
                        <Grid container spacing={0}>
                            {posts.map((post) => (
                               <div>
                                   {post.fullname}
                                   {post.email}
                               </div>
                            ))}
                        </Grid>
                    </div>
                </div>
            </MainLayout>
        </div>
    );
};

export default AdminVerifyFeed;
