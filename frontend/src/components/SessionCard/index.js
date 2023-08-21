import { useState, useContext, Fragment } from "react";
import "./style.css";
import Stack from "@mui/material/Stack";
import TopicChip from "../TopicChip";
import DoneIcon from "@mui/icons-material/Done";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import sessionApis from "../../apis/session";
import { useHMSActions } from "@100mslive/react-sdk";
import { useSelector } from "react-redux";
import vaultApis from "../../apis/vault";
import MessageModalContext from "../../services/message-modal-context";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";

const SessionCard = (props) => {
    const { currentUser } = useSelector((state) => state.user);
    const { setMessageModalContent, messageModalHandleOpen } =
        useContext(MessageModalContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const actionsMenuOpen = Boolean(anchorEl);
    const hmsActions = useHMSActions();
    const navigate = useNavigate();

    const getDate = () => {
        let dateString = props.session?.sessionDate;
        const [month, date, year] = dateString.split(" ");
        return `${month} ${date}`;
    };

    const handleMenuTriggerClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleUnenrollmentClick = async () => {
        await sessionApis.unenrollInSession({
            session: props.session._id,
            user: currentUser._id,
        });
        props.handleUnenroll();
    };

    const handleSessionDoneClick = async () => {
        await sessionApis.markSessionComplete({ session: props.session._id });
        messageModalHandleOpen(true);
        setMessageModalContent("This session has been marked complete!");
    };

    const handleSessionDeleteClick = async () => {
        await sessionApis.deleteSession(props.session._id);
        props.handleRefresh();
    };

    const handleJoinClick = async () => {
        if (props.session?.complete) {
            messageModalHandleOpen(true);
            setMessageModalContent("This session has already finished!");
            return;
        }
        const userName = currentUser.fullname;
        const userRole = currentUser.role;
        let hmsRole = "";
        if (userRole === "User" || props.session?.author !== currentUser._id) {
            hmsRole = "hls-viewer";
        } else if (userRole === "Expert") {
            hmsRole = "broadcaster";
        }
        let vaultResponse;
        try {
            vaultResponse = await vaultApis.getHmsAuth();
        } catch (err) {
            console.log(err);
        }
        const { HMS_ROOM_ID, HMS_TOKEN_ENDPOINT } = vaultResponse;
        const response = await fetch(`${HMS_TOKEN_ENDPOINT}api/token`, {
            method: "POST",
            body: JSON.stringify({
                user_id: `${Date.now()}`,
                role: hmsRole,
                type: "app",
                room_id: HMS_ROOM_ID,
            }),
        });
        const { token } = await response.json();

        hmsActions.join({
            userName: userName,
            authToken: token,
        });
        navigate("/live");
    };

    return (
        <div className="SessionCard_container">
            <div className="SessionCard_datetime">
                <div>
                    <span className="SessionCard_date">{getDate()}</span>
                    <br />
                    <span className="SessionCard_time">
                        {props.session?.sessionTime || ""}
                    </span>
                    <br />
                    <br />
                    {props.session?.complete ? (
                        <strong className="SessionCard_time">(Complete)</strong>
                    ) : null}
                </div>
            </div>
            {/* <div className={"SessionCard_details".concat(descriptionCollapsed? " collapsed" : "")}> */}
            <div className="SessionCard_details">
                <h3>{props.session?.title || ""}</h3>
                <Stack direction="row" flexWrap="wrap">
                    {props.session?.topics.length === 0
                        ? null
                        : props.session?.topics.map((topic, ind) => (
                              <TopicChip key={ind} label={topic} withMargin />
                          ))}
                </Stack>
                <p className="SessionCard_description">
                    {props.session?.description || ""}
                </p>
                {new Date() <
                new Date(
                    `${props.session?.sessionDate} ${props.session?.sessionTime}`
                ) ? null : (
                    <div
                        className="SessionCard_action"
                        onClick={() => handleJoinClick()}
                    >
                        <LoginOutlinedIcon sx={{ fontSize: 18 }} />
                        <span>Join</span>
                    </div>
                )}
            </div>
            <div className="SessionCard_menu">
                <div
                    id="basic-button"
                    className="SessionCard_menu_trigger"
                    aria-controls={actionsMenuOpen ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={actionsMenuOpen ? "true" : undefined}
                    onClick={handleMenuTriggerClick}
                >
                    <MoreVertOutlinedIcon />
                </div>
                <Menu
                    anchorEl={anchorEl}
                    open={actionsMenuOpen}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuList>
                        {props.session?.author === currentUser._id ? (
                            <Fragment>
                                {props.session?.complete ? null : (
                                    <MenuItem
                                        onClick={() => handleSessionDoneClick()}
                                    >
                                        <ListItemIcon>
                                            <DoneIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Done</ListItemText>
                                    </MenuItem>
                                )}

                                <MenuItem
                                    onClick={() => handleSessionDeleteClick()}
                                >
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem>
                            </Fragment>
                        ) : null}
                        {currentUser.role === "User" ||
                        props.session?.author !== currentUser._id ? (
                            <MenuItem onClick={() => handleUnenrollmentClick()}>
                                <ListItemIcon>
                                    <CancelPresentationOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Unenroll</ListItemText>
                            </MenuItem>
                        ) : null}
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
};

export default SessionCard;
