import { useState, useEffect } from "react";
import "./style.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Stack from "@mui/material/Stack";
import TopicChip from "../TopicChip";
import {useSelector} from "react-redux";

const FeedTrending = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [trendingTopics, setTrendingTopics] = useState([]);

    useEffect(() => {
        setTrendingTopics([
            { _id: 1, title: "Topic 1" },
            { _id: 2, title: "Topic 2" },
            { _id: 3, title: "Topic 3" },
        ]);
    }, []);

    return (
        <div>
            {(currentUser === undefined || currentUser === null) ? <div></div> :
                    <div className="FeedTrending_container">
                        <div className="FeedTrending_header">
                            <span>Trending 15</span>
                            <TrendingUpIcon sx={{ fontSize: 16 }} />
                        </div>
                        <Stack direction="row" flexWrap="wrap">
                            {trendingTopics?.map((topic) => (
                                <TopicChip key={topic._id} label={topic.title} withMargin />
                            ))}
                        </Stack>
                    </div>}
        </div>

    );
};

export default FeedTrending;
