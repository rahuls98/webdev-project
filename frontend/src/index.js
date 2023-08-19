import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import App from "./App";
import { HMSRoomProvider } from "@100mslive/react-sdk";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HMSRoomProvider>
                <App />
            </HMSRoomProvider>
        </LocalizationProvider>
    </React.StrictMode>
);
