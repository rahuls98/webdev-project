import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Feed from "./pages/Feed";
import Sessions from "./pages/Sessions";
import Following from "./pages/Following";
import Saved from "./pages/Saved";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
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
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
