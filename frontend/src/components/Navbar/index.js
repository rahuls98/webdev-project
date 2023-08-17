import "./style.css";
import NavbarProfileChip from "../NavbarProfileChip";

const Navbar = () => {
    return (
        <div className="Navbar_container">
            <div className="Navbar_left"></div>
            <div className="Navbar_right">
                <NavbarProfileChip />
            </div>
        </div>
    );
};

export default Navbar;
