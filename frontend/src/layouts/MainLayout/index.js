import { useState } from "react";
import "./style.css";
import Sidebar from "../../components/Sidebar";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/Navbar";
import TagClickContext from "../../services/tag-click-context";
import { useDispatch } from "react-redux";
import { setPage } from "../../reducers/navigation-reducer";
import { useNavigate } from "react-router";

const MainLayout = (props) => {
    const [searchString, setSearchString] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnTagClick = (topic) => {
        setSearchString(topic);
        dispatch(setPage(4));
        navigate("/explore");
    };

    return (
        <TagClickContext.Provider value={{ onTagClick: handleOnTagClick }}>
            <div className="MainLayout_container">
                <Grid container spacing={0}>
                    <Grid item lg={2}>
                        <Sidebar />
                    </Grid>
                    <Grid item lg={10}>
                        <Navbar
                            searchString={searchString}
                            onSearchClose={() => setSearchString("")}
                        />
                        {props.children}
                    </Grid>
                </Grid>
            </div>
        </TagClickContext.Provider>
    );
};

export default MainLayout;
