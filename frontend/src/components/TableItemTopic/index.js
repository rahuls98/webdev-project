import { useState } from "react";
import "./style.css";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import topicApis from "../../apis/topic";
import { useSelector } from "react-redux";

const TableItemTopic = (props) => {
    const { currentUser } = useSelector((state) => state.user);
    const [itemAction, setItemAction] = useState(
        props.following ? "Unfollow" : "Follow"
    );
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("Unfollowed");

    const handleActionClick = async () => {
        if (itemAction === "Unfollow") {
            setSnackbarMessage("Unfollowed");
            await topicApis.unfollowTopic({
                topic: props.topicId,
                user: currentUser._id,
            });
            setItemAction("Follow");
        } else if (itemAction === "Follow") {
            setSnackbarMessage("Followed");
            await topicApis.followTopic({
                topic: props.topicId,
                user: currentUser._id,
            });
            setItemAction("Unfollow");
        }
        setSnackbar(true);
        props.onActionClick();
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar(false);
    };

    return (
        <div className="TableItemTopic_container">
            <div className="TableItemTopic_listitem">
                <ListItem
                    secondaryAction={
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleActionClick()}
                        >
                            {itemAction === "Unfollow" ? (
                                <RemoveCircleOutlinedIcon />
                            ) : (
                                <AddCircleOutlinedIcon />
                            )}
                            {itemAction}
                        </Button>
                    }
                >
                    <ListItemAvatar>
                        <Avatar>{props.topic[0].toUpperCase()}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.topic} />
                </ListItem>
            </div>
            {props.lastItem ? null : <Divider variant="inset" component="li" />}
            <Snackbar
                open={snackbar}
                autoHideDuration={1000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    icon={false}
                    onClose={handleSnackbarClose}
                    severity="info"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TableItemTopic;
