import { useState } from "react";
import "./style.css";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BackHandIcon from "@mui/icons-material/BackHand";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
// import ShareIcon from '@mui/icons-material/Share';
import EventIcon from "@mui/icons-material/Event";
import TopicChip from "../TopicChip";
import datetimeUtils from "../../utils/datetime";
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";

const FeedSession = (props) => {
    const {currentUser} = useSelector((state) => state.user);
    const [enrolled, setEnrolled] = useState(props.enrolled);
    const [enrolledSnackbar, setEnrolledSnackbar] = useState(false);

    const handleEnrollOnClick = async () => {};

    const handleEnrolledSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setEnrolledSnackbar(false);
    };

    return (
        <div>
            <div>
                {(currentUser === undefined || currentUser === null) ? <h1> 401 Unauthorized , Login Please! </h1> :
                <div>
                    <div>
                        <div className="FeedSession_container">
                            <div className="FeedSession_content">
                                <div className="FeedSession_header">
                                    <Avatar>
                                        {props.session?.author.fullname[0].toUpperCase()}
                                    </Avatar>
                                    <div className="FeedSession_header_content">
                        <span className="FeedSession_expert_name">
                            {props.session?.author.fullname}
                        </span>
                                        <br />
                                        <div className="FeedSession_date">
                                            <AccessTimeIcon sx={{ fontSize: 15 }} />
                                            <span>{`${datetimeUtils.dateToReadableString(
                                                props.session?.createdDate
                                            )}, ${datetimeUtils.timeToReadableString(
                                                props.session?.createdDate
                                            )}`}</span>
                                        </div>
                                    </div>
                                    <div className="FeedSession_actions">
                        <span onClick={() => handleEnrollOnClick()}>
                            {enrolled ? (
                                <BackHandIcon sx={{ fontSize: 25 }} />
                            ) : (
                                <BackHandOutlinedIcon sx={{ fontSize: 25 }} />
                            )}
                        </span>
                                    </div>
                                </div>
                                <div className="FeedSession_topics">
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {props.session.topics.map((topic, ind) => (
                                            <TopicChip key={ind} label={topic} />
                                        ))}
                                    </Stack>
                                </div>
                                <h3 className="FeedSession_title">{props.session.title}</h3>
                                <p className="FeedSession_content_text">
                                    {props.session.description}
                                </p>
                                <div className="FeedSession_when">
                                    <EventIcon />
                                    <span>{`${props.session.sessionDate}, ${props.session.sessionTime}`}</span>
                                </div>
                            </div>
                            <Snackbar
                                open={enrolledSnackbar}
                                autoHideDuration={2000}
                                onClose={handleEnrolledSnackbarClose}
                            >
                                <Alert
                                    icon={false}
                                    onClose={handleEnrolledSnackbarClose}
                                    severity="info"
                                    sx={{ width: "100%" }}
                                >
                                    Enrolled in session
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default FeedSession;
