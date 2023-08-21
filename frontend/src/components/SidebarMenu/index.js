import "./style.css";
import { Link } from "react-router-dom";
import List from "@mui/joy/List";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SidebarMenuItem from "../SidebarMenuItem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../reducers/navigation-reducer";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const SidebarMenu = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { page } = useSelector((state) => state.page);
    const dispatch = useDispatch();

    const handlePageChange = (pageIndex) => {
        dispatch(setPage(pageIndex));
    };

    return (
        <div className="SidebarMenu_container">
            <List
                aria-labelledby="basic-list-demo"
                sx={{
                    '& [role="button"]': {
                        borderRadius: "8px",
                        marginBottom: "10px",
                    },
                }}
            >
                {currentUser === undefined || currentUser === null ? (
                    <div>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <SidebarMenuItem
                                itemIcon={<LoginIcon />}
                                itemTitle="Login"
                                selected={page === 0}
                                onClick={() => handlePageChange(-1)}
                            />
                        </Link>
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            <SidebarMenuItem
                                itemIcon={<AppRegistrationIcon />}
                                itemTitle="Signup"
                                selected={page === 1}
                                onClick={() => handlePageChange(-1)}
                            />
                        </Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/profile" style={{ textDecoration: "none" }}>
                            <SidebarMenuItem
                                itemIcon={<PersonOutlineIcon />}
                                itemTitle="Profile"
                                selected={page === -2}
                                onClick={() => handlePageChange(6)}
                            />
                        </Link>
                        {currentUser.role !== "Admin" ? (
                            <>
                                <Link
                                    to="/feed"
                                    style={{ textDecoration: "none" }}
                                >
                                    <SidebarMenuItem
                                        itemIcon={<DynamicFeedIcon />}
                                        itemTitle="Feed"
                                        selected={page === 0}
                                        onClick={() => handlePageChange(0)}
                                    />
                                </Link>
                                <Link
                                    to="/sessions"
                                    style={{ textDecoration: "none" }}
                                >
                                    <SidebarMenuItem
                                        itemIcon={
                                            <VideoCameraFrontOutlinedIcon />
                                        }
                                        itemTitle="Sessions"
                                        selected={page === 1}
                                        onClick={() => handlePageChange(1)}
                                    />
                                </Link>
                                <Link
                                    to="/following"
                                    style={{ textDecoration: "none" }}
                                >
                                    <SidebarMenuItem
                                        itemIcon={<ChecklistRtlOutlinedIcon />}
                                        itemTitle="Following"
                                        selected={page === 2}
                                        onClick={() => handlePageChange(2)}
                                    />
                                </Link>
                                <Link
                                    to="/saved"
                                    style={{ textDecoration: "none" }}
                                >
                                    <SidebarMenuItem
                                        itemIcon={<BookmarkAddedOutlinedIcon />}
                                        itemTitle="Saved"
                                        selected={page === 3}
                                        onClick={() => handlePageChange(3)}
                                    />
                                </Link>
                                <Link
                                    to="/explore"
                                    style={{ textDecoration: "none" }}
                                >
                                    <SidebarMenuItem
                                        itemIcon={<SearchOutlinedIcon />}
                                        itemTitle="Explore"
                                        selected={page === 4}
                                        onClick={() => handlePageChange(4)}
                                    />
                                </Link>
                            </>
                        ) : null}
                        {currentUser.role === "Admin" ? (
                            <Link
                                to="/verify"
                                style={{ textDecoration: "none" }}
                            >
                                <SidebarMenuItem
                                    itemIcon={<HowToRegIcon />}
                                    itemTitle="Verify"
                                    selected={page === 5}
                                    onClick={() => handlePageChange(5)}
                                />
                            </Link>
                        ) : (
                            <div></div>
                        )}
                    </div>
                )}
            </List>
        </div>
    );
};

export default SidebarMenu;
