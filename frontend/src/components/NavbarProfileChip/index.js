import { useState } from "react";
import "./style.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutThunk } from "../../services/auth-thunks";

const NavbarProfileChip = (props) => {
    const { currentUser } = useSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const actionsMenuOpen = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChipClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        dispatch(logoutThunk());
        navigate("/login");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className="NavbarProfileChip_container">
            {currentUser === undefined || currentUser === null ? (
                <div></div>
            ) : (
                <div>
                    <Chip
                        variant="outlined"
                        color="neutral"
                        size="lg"
                        startDecorator={<Avatar size="sm" />}
                        endDecorator={<ArrowDropDownIcon fontSize="md" />}
                        onClick={handleChipClick}
                    >
                        {currentUser.fullname}
                    </Chip>
                    <Menu
                        anchorEl={anchorEl}
                        open={actionsMenuOpen}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuList>
                            <MenuItem onClick={() => handleLogoutClick()}>
                                <ListItemIcon>
                                    <LogoutOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            )}
        </div>
    );
};

export default NavbarProfileChip;
