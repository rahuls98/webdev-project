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
import TableExperts from "../../components/TableExperts";

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
        <div>
            {currentUser === undefined || currentUser === null ? (
                <MainLayout page={-1}>
                    <h1 style={{ textAlign: "center" }}>
                        Login as an Admin first
                    </h1>
                </MainLayout>
            ) : (
                <MainLayout page={0}>
                    <div className="AdminVerify_container">
                        <TableExperts
                            data={unverifiedExperts}
                            following={true}
                            actionText="Verify"
                            onActionClick={() => {}}
                            onActionClickHandler={handleVerifyListener}
                        />
                    </div>
                </MainLayout>
            )}
        </div>
    );
};

export default AdminVerifyFeed;
