import { useState } from "react";
import "./style.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import TopicChip from "../TopicChip";
import datetimeUtils from "../../utils/datetime";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import postApis from "../../apis/post";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";

const FeedPost = (props) => {
    const { currentUser } = useSelector((state) => state.user);
    const [saved, setSaved] = useState(props.saved || false);
    const [upvoted, setUpvoted] = useState(() =>
        props.post?.upvotes.includes(currentUser._id)
    );
    const [upvotes, setUpvotes] = useState(props.post?.upvotes.length || 0);
    const [downvoted, setDownvoted] = useState(() =>
        props.post?.downvotes.includes(currentUser._id)
    );
    const [downvotes, setDownvotes] = useState(
        props.post?.downvotes.length || 0
    );
    const [savedSnackbar, setSavedSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleSaveOnClick = async () => {
        if (!saved) {
            setSavedSnackbar(true);
            await postApis.savePost({
                post: props.post?._id,
                user: currentUser._id,
            });
        } else {
            await postApis.unsavePost({
                post: props.post?._id,
                user: currentUser._id,
            });
        }
        setSaved(!saved);
    };

    const handleSavedSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSavedSnackbar(false);
    };

    const handleDeletePost = async (postId) => {
        await postApis.deletePost(postId);
        props.onDelete();
    };

    const handleVoteOnClick = async (action) => {
        if (action === "upvote") {
            if (upvoted) {
                setUpvoted(false);
                setUpvotes(upvotes - 1);
                await postApis.removePostUpvote({
                    post: props.post?._id,
                    expert: currentUser._id,
                });
                return;
            } else if (downvoted) {
                setDownvoted(false);
                setDownvotes(downvotes - 1);
            }
            setUpvoted(true);
            setUpvotes(upvotes + 1);
            await postApis.upvotePost({
                post: props.post?._id,
                expert: currentUser._id,
            });
        } else if (action === "downvote") {
            if (downvoted) {
                setDownvoted(false);
                setDownvotes(downvotes - 1);
                await postApis.removePostDownvote({
                    post: props.post?._id,
                    expert: currentUser._id,
                });
                return;
            } else if (upvoted) {
                setUpvoted(false);
                setUpvotes(upvotes - 1);
            }
            setDownvoted(true);
            setDownvotes(downvotes + 1);
            await postApis.downvotePost({
                post: props.post?._id,
                expert: currentUser._id,
            });
        }
    };

    return (
        <div className="FeedPost_container">
            <div className="FeedPost_content">
                <div className="FeedPost_header">
                    <Avatar>
                        {props.post?.author.fullname[0].toUpperCase()}
                    </Avatar>
                    <div className="FeedPost_header_content">
                        <span
                            className="FeedPost_expert_name"
                            onClick={() => {
                                window.localStorage.setItem(
                                    "expert",
                                    JSON.stringify(props.post?.author)
                                );
                                navigate("/public-profile");
                            }}
                        >
                            {props.post?.author.fullname}
                        </span>
                        <br />
                        <div className="FeedPost_date">
                            <AccessTimeIcon sx={{ fontSize: 15 }} />
                            <span>{`${datetimeUtils.dateToReadableString(
                                props.post?.createdDate
                            )}, ${datetimeUtils.timeToReadableString(
                                props.post?.createdDate
                            )}`}</span>
                        </div>
                    </div>
                    <div className="FeedPost_actions">
                        <span onClick={() => handleSaveOnClick()}>
                            {saved ? (
                                <BookmarkIcon sx={{ fontSize: 25 }} />
                            ) : (
                                <BookmarkBorderIcon sx={{ fontSize: 25 }} />
                            )}
                        </span>
                        {props.post?.author._id === currentUser._id ? (
                            <span
                                onClick={() =>
                                    handleDeletePost(props.post?._id)
                                }
                            >
                                <DeleteIcon
                                    sx={{ fontSize: 25, marginLeft: "15px" }}
                                />
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="FeedPost_topics">
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {props.post?.topics.map((topic, ind) => (
                            <TopicChip key={ind} label={topic} />
                        ))}
                    </Stack>
                </div>
                <div
                    className="FeedPost_content_text"
                    dangerouslySetInnerHTML={{ __html: props.post?.content }}
                />
                {currentUser.role === "User" ||
                props.post?.author._id === currentUser._id ||
                (currentUser.role === "Expert" &&
                    !currentUser.isVerified) ? null : (
                    <div className="FeedPost_vote">
                        <div>
                            <div
                                className={"FeedPost_vote_clickable".concat(
                                    upvoted ? " selected" : ""
                                )}
                                onClick={() => handleVoteOnClick("upvote")}
                            >
                                {upvoted ? (
                                    <ThumbUpAltIcon />
                                ) : (
                                    <ThumbUpAltOutlinedIcon />
                                )}
                                {
                                    <span className="FeedPost_vote_action">
                                        Upvote
                                    </span>
                                }
                            </div>
                            <Chip
                                label={upvotes}
                                variant="outlined"
                                size="small"
                            />
                        </div>
                        <div>
                            <div
                                className={"FeedPost_vote_clickable".concat(
                                    downvoted ? " selected" : ""
                                )}
                                onClick={() => handleVoteOnClick("downvote")}
                            >
                                {downvoted ? (
                                    <ThumbDownAltIcon />
                                ) : (
                                    <ThumbDownAltOutlinedIcon />
                                )}
                                {
                                    <span className="FeedPost_vote_action">
                                        Downvote
                                    </span>
                                }
                            </div>
                            <Chip
                                label={downvotes}
                                variant="outlined"
                                size="small"
                            />
                        </div>
                    </div>
                )}
            </div>
            <Snackbar
                open={savedSnackbar}
                autoHideDuration={2000}
                onClose={handleSavedSnackbarClose}
            >
                <Alert
                    icon={false}
                    onClose={handleSavedSnackbarClose}
                    severity="info"
                    sx={{ width: "100%" }}
                >
                    Saved post
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FeedPost;
