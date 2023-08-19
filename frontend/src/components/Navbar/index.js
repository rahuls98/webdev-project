import "./style.css";
import NavbarProfileChip from "../NavbarProfileChip";
import ModalPostCreate from "../ModalPostCreate";
import ModalSessionCreate from "../ModalSessionCreate";
import TopicSearch from "../TopicSearch";
import { useSelector } from "react-redux";

const Navbar = (props) => {
    const { currentUser } = useSelector((state) => state.user);
    const { page } = useSelector((state) => state.page);

    const handleSearchSelection = (s) => {
        props.setSearchString(s);
    };

    return (
        <div className="Navbar_container">
            <div className="Navbar_left">
                {page === 4 ? (
                    <TopicSearch
                        searchString={props.searchString}
                        onSelect={handleSearchSelection}
                        onSearchClose={props.onSearchClose}
                    />
                ) : null}
            </div>
            <div className="Navbar_right">
                {currentUser && currentUser.role === "Expert" && page === 0 ? (
                    <ModalPostCreate />
                ) : null}
                {currentUser && currentUser.role === "Expert" && page === 1 ? (
                    <ModalSessionCreate />
                ) : null}
                <NavbarProfileChip />
            </div>
        </div>
    );
};

export default Navbar;
