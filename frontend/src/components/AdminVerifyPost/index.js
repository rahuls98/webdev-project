import {useState} from "react";
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
// import ShareIcon from '@mui/icons-material/Share';
import TopicChip from "../TopicChip";
import datetimeUtils from "../../utils/datetime";
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import UnauthenticatedFeed from "../UnauthenticatedFeed";
import Grid from "@mui/material/Grid";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import NoData from "../NoData";
import FeedPost from "../FeedPost";
import FeedSession from "../FeedSession";
import FeedTrending from "../FeedTrending";

const AdminVerifyPost = (props) => {
    const {currentUser} = useSelector((state) => state.user);
    const [email] = useState(props.email || false);


    const handleSaveOnClick = async () => {

    };


    return (
        <div>
            1
        </div>

    );
};

export default AdminVerifyPost;
