import "./style.css";
import Sidebar from "../../components/Sidebar";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/Navbar";

const MainLayout = (props) => {
    return (
        <div className="MainLayout_container">
            <Grid container spacing={0}>
                <Grid item lg={2}>
                    <Sidebar />
                </Grid>
                <Grid item lg={10}>
                    <Navbar />
                    {props.children}
                </Grid>
            </Grid>
        </div>
    );
};

export default MainLayout;
