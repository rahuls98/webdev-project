import Stack from "@mui/material/Stack";
import TopicChip from "../TopicChip";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DoneIcon from "@mui/icons-material/Done";
import ListItemText from "@mui/material/ListItemText";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import Button from "@mui/material/Button";
import postApis from "../../apis/post";
import {useEffect, useState} from "react";
import {getUnverifiedExpertsThunk} from "../../services/unverified-experts-thunk";

const UnauthenticatedFeed = () => {
    const [posts, setposts] = useState([]);
    useEffect(() => {
        const getAllPosts = async () => {
            const posts = await postApis.getAllUnauthPosts();
            setposts(posts);
        };
        if(posts.length === 0){
            getAllPosts();
        }
    }, [posts]);

    let postCards = posts.map((post) => {
        return (<div className="SessionCard_container">
            <div className="SessionCard_datetime">
                <div>
                    <span className="SessionCard_date">{post.author.fullname}</span>
                    <br/>
                    <span className="SessionCard_time">
                        Authored on : <br/>{post.createdDate.split('T')[0]}
                    </span>
                </div>
            </div>
            <div className="SessionCard_details">
                <h3>Expert in {post.author.expertiseTopics.join(" / ")}</h3>
                <div className="SessionCard_description" dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className="SessionCard_description">
                  Login to see more posts and have better experience
                </div>
            </div>
        </div>)
    })


    return (
        <div>
            <div className="SessionsLayoutContent_container">
                {postCards}
            </div>
        </div>
    )
}

export default UnauthenticatedFeed;