import "./style.css";
import { Link } from "react-router-dom";
import List from "@mui/joy/List";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import SidebarMenuItem from "../SidebarMenuItem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SidebarMenu = (props) => {
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
                <Link to="/feed" style={{ textDecoration: "none" }}>
                    <SidebarMenuItem
                        itemIcon={<DynamicFeedIcon />}
                        itemTitle="Feed"
                        selected={props.selected === 0}
                    />
                </Link>
                <Link to="/sessions" style={{ textDecoration: "none" }}>
                    <SidebarMenuItem
                        itemIcon={<VideoCameraFrontOutlinedIcon />}
                        itemTitle="Sessions"
                        selected={props.selected === 1}
                    />
                </Link>
                <Link to="/following" style={{ textDecoration: "none" }}>
                    <SidebarMenuItem
                        itemIcon={<ChecklistRtlOutlinedIcon />}
                        itemTitle="Following"
                        selected={props.selected === 2}
                    />
                </Link>
                <Link to="/saved" style={{ textDecoration: "none" }}>
                    <SidebarMenuItem
                        itemIcon={<BookmarkAddedOutlinedIcon />}
                        itemTitle="Saved"
                        selected={props.selected === 3}
                    />
                </Link>
                <Link to="/explore" style={{ textDecoration: "none" }}>
                    <SidebarMenuItem
                        itemIcon={<SearchOutlinedIcon />}
                        itemTitle="Explore"
                        selected={props.selected === 4}
                    />
                </Link>
            </List>
        </div>
    );
};

export default SidebarMenu;
