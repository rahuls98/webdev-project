import { useState, useEffect } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import SessionCard from "../../components/SessionCard";
import NoData from "../../components/NoData";
import { useSelector } from "react-redux";
import UnauthorizedMessage from "../../components/UnauthorizedMessage";
import sessionApis from "../../apis/session";

const Sessions = () => {
    const { currentUser } = useSelector((state) => state.user);
    // eslint-disable-next-line
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const getEnrolledSessions = async () => {
            const enrolledSessions = await sessionApis.getEnrolledSessions(
                currentUser._id
            );
            setSessions(enrolledSessions);
        };
        getEnrolledSessions();
    }, []);

    const handleUnenroll = () => {
        const getEnrolledSessions = async () => {
            const enrolledSessions = await sessionApis.getEnrolledSessions(
                currentUser._id
            );
            setSessions(enrolledSessions);
        };
        getEnrolledSessions();
    };

    return (
        <div className="Sessions_container">
            <MainLayout page={currentUser ? 1 : -1}>
                {currentUser === undefined || currentUser === null ? (
                    <UnauthorizedMessage />
                ) : (
                    <div className="SessionsLayoutContent_container">
                        {sessions.length === 0 ? (
                            <NoData />
                        ) : (
                            sessions.map((session, ind) => (
                                <SessionCard
                                    key={ind}
                                    session={session}
                                    handleUnenroll={() => handleUnenroll()}
                                />
                            ))
                        )}
                    </div>
                )}
            </MainLayout>
        </div>
    );
};

export default Sessions;
