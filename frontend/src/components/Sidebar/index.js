import "./style.css";
import SidebarMenu from "../SidebarMenu";

const Sidebar = (props) => {
    return (
        <div className="Sidebar_container">
            <SidebarMenu selected={props.selected} />
        </div>
    );
};

export default Sidebar;
