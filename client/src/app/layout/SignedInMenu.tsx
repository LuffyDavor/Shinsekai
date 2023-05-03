import { Button, Menu, Fade, MenuItem, Avatar } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { Link } from "react-router-dom";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                sx={{ typography: "h6", color: "secondary.light" }}
            >
                <Avatar onClick={handleClick} sx={{bgcolor: "secondary.dark"}} >{user?.username.charAt(0)}</Avatar>
                
            </Button>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem component={Link} to="/orders" >
                    My orders
                </MenuItem>

                <MenuItem onClick={() => {
                    dispatch(signOut());
                    dispatch(clearBasket());
                }}>
                    Logout
                </MenuItem>

            </Menu>
        </div>
    );
}