import { useState, useEffect } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";
import SessionCard from "../../components/SessionCard";
import NoData from "../../components/NoData";

const Sessions = () => {
    // eslint-disable-next-line
    const [sessions, setSessions] = useState([
        {
            author: {
                fullname: "Rahul Suresh",
            },
            createdDate: new Date(),
            topics: ["Topic 1", "Topic 2", "Topic 3"],
            title: "Session title",
            description: "Session description",
            sessionDate: "June 10 2023",
            sessionTime: "10:00 AM",
        },
    ]);

    useEffect(() => {
        // const getEnrolledSessions = async () => {
        //     const enrolledSessions = await sessionApis.getEnrolledSessions();
        //     setSessions(enrolledSessions);
        // };
        // getEnrolledSessions();
    }, []);

    return (
        <div className="Sessions_container">
            <MainLayout page={1}>
                <div className="SessionsLayoutContent_container">
                    {sessions.length === 0 ? (
                        <NoData />
                    ) : (
                        sessions.map((session, ind) => (
                            <SessionCard key={ind} session={session} />
                        ))
                    )}
                </div>
            </MainLayout>
        </div>
    );
};

export default Sessions;
