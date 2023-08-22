import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Feed from "./pages/Feed";
import Sessions from "./pages/Sessions";
import Following from "./pages/Following";
import Saved from "./pages/Saved";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./reducers/auth-reducer";
import AdminVerifyFeed from "./pages/AdminVerifyFeed";
import navigationReducer from "./reducers/navigation-reducer";
import ModalMessage from "./components/ModalMessage";
import MessageModalContext from "./services/message-modal-context";
import LiveStream from "./pages/LiveStream";
import unverifiedExpertReducer from "./reducers/unverified-experts-reducer";
import ProfilePage from "./pages/Profile";
import ProfileView from "./pages/ProfileView";

const store = configureStore({
    reducer: {
        user: authReducer,
        page: navigationReducer,
        unverifiedExperts: unverifiedExpertReducer,
    },
});

function App() {
    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const [messageModalContent, setMessageModalContent] = useState("");
    const messageModalHandleOpen = () => setMessageModalOpen(true);
    const messageModalHandleClose = () => setMessageModalOpen(false);

    return (
        <Provider store={store}>
            <MessageModalContext.Provider
                value={{
                    setMessageModalContent: setMessageModalContent,
                    messageModalHandleOpen: messageModalHandleOpen,
                }}
            >
                <ModalMessage
                    open={messageModalOpen}
                    handleClose={messageModalHandleClose}
                    message={messageModalContent}
                />
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Navigate to="/feed" />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/feed" element={<Feed />} />
                            <Route path="/sessions" element={<Sessions />} />
                            <Route path="/following" element={<Following />} />
                            <Route path="/saved" element={<Saved />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/live" element={<LiveStream />} />
                            <Route
                                path="/verify"
                                element={<AdminVerifyFeed />}
                            />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route
                                path="/public-profile"
                                element={<ProfileView />}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            </MessageModalContext.Provider>
        </Provider>
    );
}

export default App;
