import "./style.css";
import Stack from "@mui/material/Stack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TopicChip from "../TopicChip";
import datetimeUtils from "../../utils/datetime";
import Avatar from "@mui/material/Avatar";

const FeedPost = (props) => {
    return (
        <div className="FeedPostUnauthorized_container">
            <div className="FeedPostUnauthorized_content">
                <div className="FeedPostUnauthorized_header">
                    <Avatar>
                        {props.post?.author.fullname[0].toUpperCase()}
                    </Avatar>
                    <div className="FeedPostUnauthorized_header_content">
                        <span className="FeedPostUnauthorized_expert_name">
                            {props.post?.author.fullname}
                        </span>
                        <br />
                        <div className="FeedPostUnauthorized_date">
                            <AccessTimeIcon sx={{ fontSize: 15 }} />
                            <span>{`${datetimeUtils.dateToReadableString(
                                props.post?.createdDate
                            )}, ${datetimeUtils.timeToReadableString(
                                props.post?.createdDate
                            )}`}</span>
                        </div>
                    </div>
                </div>
                <div className="FeedPostUnauthorized_topics">
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {props.post?.topics.map((topic, ind) => (
                            <TopicChip key={ind} label={topic} />
                        ))}
                    </Stack>
                </div>
                <div
                    className="FeedPostUnauthorized_content_text"
                    dangerouslySetInnerHTML={{ __html: props.post?.content }}
                />
            </div>
        </div>
    );
};

export default FeedPost;
