import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface Props {
    darkmode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/catalog" },
    // { title: "about", path: "/about" },
    // { title: "contact", path: "/contact" },
]
const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" }
]

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&:hover": {
        color: "secondary.main"
    },
    "&.active": {
        color: "secondary.light"
    }
}

export default function Header({ darkmode, handleThemeChange }: Props) {
    const { basket } = useAppSelector(state => state.basket);
    const { user } = useAppSelector(state => state.account);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position="sticky" sx={{ background: "black" }}>

            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <Box display="flex" alignItems="center">
                    <NavLink to="/">
                        <img
                            src="/images/logos/logo5.svg"
                            alt="Logo"
                            style={{ marginTop:"5px"}}
                        />
                    </NavLink>
                    <Switch color="secondary" checked={darkmode} onChange={handleThemeChange} />
                </Box>

                {/* LIST OF LINKS ON MIDDLE OF NAVBAR */}
                <List sx={{ display: "flex", marginRight: "20px" }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}>

                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box display="flex" alignItems="center" >
                    <IconButton component={Link} to="/basket" size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    {user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{ display: "flex", }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}>

                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
                    {/* LIST OF LINKS ON RIGHT OF NAVBAR */}
                </Box>

            </Toolbar>
        </AppBar>
    )

}