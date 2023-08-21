import { useEffect, useState } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
    getUnverifiedExpertsThunk,
    verifyExpertThunk,
} from "../../services/unverified-experts-thunk";
import TableExperts from "../../components/TableExperts";
import UnauthorizedMessage from "../../components/UnauthorizedMessage";

const AdminVerifyFeed = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [unverifiedExperts, setUnverifiedExperts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            const loadUnverifiedExperts = async () => {
                const { payload } = await dispatch(getUnverifiedExpertsThunk());
                if (payload) {
                    setUnverifiedExperts(payload);
                }
            };
            if (unverifiedExperts.length === 0) {
                loadUnverifiedExperts();
            }
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
                    <UnauthorizedMessage />
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
