import { useEffect, useState, useContext } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import UnauthorizedMessage from "../../components/UnauthorizedMessage";
import TopicSearch from "../../components/TopicSearch";
import TopicChip from "../../components/TopicChip";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import VerticalSpace from "../../components/VerticalSpace";
import VerifiedIcon from "@mui/icons-material/Verified";
import Button from "@mui/joy/Button";
import profileApis from "../../apis/profile";
import MessageModalContext from "../../services/message-modal-context";
import { updateUserThunk } from "../../services/auth-thunks";

const Profile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [fullname, setFullname] = useState(currentUser?.fullname);
    const [email, setEmail] = useState(currentUser?.email);
    const [topics, setTopics] = useState(currentUser?.expertiseTopics);
    const [updateDisabled, setUpdateDisabled] = useState(true);
    const { setMessageModalContent, messageModalHandleOpen } =
        useContext(MessageModalContext);

    const handleTopicSelection = (selected) => {
        setTopics([...topics, selected]);
    };

    const handleTopicDeletion = (ind) => {
        let updatedTopics = [...topics];
        updatedTopics.splice(ind, 1);
        setTopics(updatedTopics);
    };

    useEffect(() => {
        if (currentUser) {
            if (
                fullname !== currentUser.fullname ||
                email !== currentUser.email ||
                topics !== currentUser.expertiseTopics
            ) {
                setUpdateDisabled(false);
            } else {
                setUpdateDisabled(true);
            }
        }
    }, [fullname, email, topics]);

    const handleUpdate = async () => {
        const updatedProfile = await profileApis.updateProfile({
            ...currentUser,
            _id: currentUser._id,
            fullname: fullname,
            email: email,
            expertiseTopics: topics,
        });
        await dispatch(updateUserThunk(updatedProfile.data));
        messageModalHandleOpen(true);
        setMessageModalContent("Updated!");
    };

    return (
        <MainLayout page={currentUser ? 6 : -1}>
            {currentUser === undefined || currentUser === null ? (
                <UnauthorizedMessage />
            ) : (
                <div className="ProfilePage_container">
                    <h2 className="ProfilePage_heading">
                        Personal information
                    </h2>
                    <br />
                    <div className="ProfilePage_verified">
                        {currentUser.role === "Expert" &&
                        currentUser.isVerified ? (
                            <>
                                Verified <VerifiedIcon fontSize="small" />
                            </>
                        ) : null}
                    </div>
                    <VerticalSpace size="20px" />
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={fullname}
                        onChange={(val) => setFullname(val.target.value)}
                    />
                    <br />
                    <VerticalSpace size="20px" />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(val) => setEmail(val.target.value)}
                    />
                    <br />
                    {currentUser.role === "Expert" ? (
                        <>
                            <VerticalSpace size="20px" />
                            <span className="ProfilePage_label">
                                Expertise topics
                            </span>
                            <VerticalSpace size="5px" />
                            <TopicSearch onSelect={handleTopicSelection} />
                            <div className="ModalPostCreate_chips">
                                {topics?.map((topic, index) => (
                                    <TopicChip
                                        key={index}
                                        label={topic}
                                        withMargin
                                        onClick={() => {}}
                                        onDelete={() =>
                                            handleTopicDeletion(index)
                                        }
                                    />
                                ))}
                            </div>
                        </>
                    ) : null}
                    <VerticalSpace size="20px" />
                    <div className="ProfilePage_button_container">
                        <Button
                            variant="outlined"
                            disabled={updateDisabled}
                            onClick={() => handleUpdate()}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default Profile;
