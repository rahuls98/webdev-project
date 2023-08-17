import { useState, useEffect } from "react";
import "./style.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Stack from "@mui/material/Stack";
import TopicChip from "../TopicChip";

const FeedTrending = () => {
    // eslint-disable-next-line
    const [trendingTopics, setTrendingTopics] = useState([]);

    useEffect(() => {}, []);

    return (
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
        </div>
    );
};

export default FeedTrending;
