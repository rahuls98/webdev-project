import { useState, useEffect } from "react";
import "./style.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Stack from "@mui/material/Stack";
import TopicChip from "../TopicChip";
import { useSelector } from "react-redux";
import feedApis from "../../apis/feed";

const FeedTrending = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [trendingTopics, setTrendingTopics] = useState([]);

    useEffect(() => {
        const getTrendingTopics = async () => {
            const trendingTopics = await feedApis.getTrendingTopics();
            setTrendingTopics(trendingTopics.topics);
        };
        getTrendingTopics();
    }, []);

    return (
        <div>
            {currentUser === undefined || currentUser === null ? (
                <div></div>
            ) : (
                <div className="FeedTrending_container">
                    <div className="FeedTrending_header">
                        <span>Trending 15</span>
                        <TrendingUpIcon sx={{ fontSize: 16 }} />
                    </div>
                    <Stack direction="row" flexWrap="wrap">
                        {trendingTopics?.map((topic) => (
                            <TopicChip
                                key={topic._id}
                                label={topic.title}
                                withMargin
                            />
                        ))}
                    </Stack>
                </div>
            )}
        </div>
    );
};

export default FeedTrending;
