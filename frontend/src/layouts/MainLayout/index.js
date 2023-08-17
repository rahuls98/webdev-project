import "./style.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/Navbar";

const MainLayout = (props) => {
    // eslint-disable-next-line
    const [selected, setSelected] = useState(props.page);

    const handleMenuSelection = (ind) => {};

    return (
        <div className="MainLayout_container">
            <Grid container spacing={0}>
                <Grid item lg={2}>
                    <Sidebar
                        selected={selected}
                        setSelected={handleMenuSelection}
                    />
                </Grid>
                <Grid item lg={10}>
                    <Navbar />
                </Grid>
            </Grid>
        </div>
    );
};

export default MainLayout;
