import { useState } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import TopicChip from "../../components/TopicChip";
import VerticalSpace from "../../components/VerticalSpace";
import VerifiedIcon from "@mui/icons-material/Verified";
import UnauthorizedMessage from "../../components/UnauthorizedMessage";

const ProfileView = () => {
    const [author, setAuthor] = useState(
        JSON.parse(window.localStorage.getItem("expert")) || null
    );

    return (
        <MainLayout page={-1}>
            {!author ? (
                <UnauthorizedMessage></UnauthorizedMessage>
            ) : (
                <div className="ProfilePage_container">
                    <h2 className="ProfilePage_heading">Expert Information</h2>
                    <br />
                    <div className="ProfilePage_verified">
                        {author?.isVerified ? (
                            <>
                                Verified <VerifiedIcon fontSize="small" />
                            </>
                        ) : null}
                    </div>
                    <VerticalSpace size="20px" />
                    <span className="ProfilePage_label">
                        <strong>Name: </strong>
                        {author?.fullname}
                    </span>
                    <br />
                    <VerticalSpace size="10px" />
                    <span className="ProfilePage_label">
                        <strong>Followers: </strong>
                        {author?.followerCount}
                    </span>
                    <br />
                    <VerticalSpace size="10px" />
                    <span className="ProfilePage_label">
                        <strong>Expertise topics</strong>
                    </span>
                    <VerticalSpace size="5px" />
                    <div className="ModalPostCreate_chips">
                        {author?.expertiseTopics?.map((topic, index) => (
                            <TopicChip
                                key={index}
                                label={topic}
                                withMargin
                                onClick={() => {}}
                            />
                        ))}
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default ProfileView;
