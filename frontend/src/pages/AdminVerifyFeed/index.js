import { useEffect, useState } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import {
    getUnverifiedExpertsThunk,
    verifyExpertThunk,
} from "../../services/unverified-experts-thunk";
import UnauthenticatedFeed from "../../components/UnauthenticatedFeed";

const AdminVerifyFeed = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [unverifiedExperts, setUnverifiedExperts] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const loadUnverifiedExperts = async () => {
            const { payload } = await dispatch(getUnverifiedExpertsThunk());
            if (payload) {
                setUnverifiedExperts(payload);
            }
        };
        if (unverifiedExperts.length === 0) {
            loadUnverifiedExperts();
        }
    }, [unverifiedExperts]);

    const handleVerifyListener = async (id) => {
        const idVerified = await dispatch(verifyExpertThunk(id));
        setUnverifiedExperts(
            unverifiedExperts.filter(
                (expert) => expert._id !== idVerified.payload
            )
        );
    };

    return (
        <div className="Feed_container">
            {currentUser === undefined || currentUser === null ? (
                <MainLayout page={-1}>
                    <h1>Login as an Admin first</h1>
                </MainLayout>
            ) : (
                <MainLayout page={0}>
                    <div className="FeedLayoutContent_container">
                        <div className="FeedLayoutContent_content">
                            <Grid container spacing={0}>
                                {unverifiedExperts.map((expert) => (
                                    <div>
                                        <div className="TableItemExpert_container">
                                            <div className="TableItemExpert_listitem">
                                                <ListItem
                                                    alignItems="flex-start"
                                                    secondaryAction={
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            onClick={() =>
                                                                handleVerifyListener(
                                                                    expert._id
                                                                )
                                                            }
                                                        >
                                                            <RemoveCircleOutlinedIcon />
                                                            Verify Expert
                                                        </Button>
                                                    }
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            {expert.fullname.toUpperCase()}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            expert.fullname
                                                        }
                                                        secondary={
                                                            <div>
                                                                <i
                                                                    style={{
                                                                        fontSize:
                                                                            "13px",
                                                                    }}
                                                                >
                                                                    Expertise:{" "}
                                                                    {expert.expertiseTopics.join(
                                                                        ", "
                                                                    ).slice(0,36)}
                                                                </i>
                                                                <br />
                                                                <i
                                                                    style={{
                                                                        fontSize:
                                                                            "13px",
                                                                    }}
                                                                >
                                                                    Followers:{" "}
                                                                    {
                                                                        expert.followerCount
                                                                    }
                                                                </i>
                                                            </div>
                                                        }
                                                    />
                                                </ListItem>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Grid>
                        </div>
                    </div>
                </MainLayout>
            )}
        </div>
    );
};

export default AdminVerifyFeed;
