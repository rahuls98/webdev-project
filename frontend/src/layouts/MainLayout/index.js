import "./style.css";
import Sidebar from "../../components/Sidebar";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/Navbar";
import TagClickContext from "../../services/tag-click-context";
import { useDispatch } from "react-redux";
import { setPage } from "../../reducers/navigation-reducer";
import { useNavigate } from "react-router";

const MainLayout = (props) => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const handleOnTagClick = (topic) => {
        // props.setSearchString(topic);
        // dispatch(setPage(4));
        // navigate("/explore");
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
                            handleRefresh={props.handleRefresh}
                            searchString={props.searchString}
                            setSearchString={props.setSearchString}
                            onSearchClose={() => props.setSearchString("")}
                        />
                        {props.children}
                    </Grid>
                </Grid>
            </div>
        </TagClickContext.Provider>
    );
};

export default MainLayout;
