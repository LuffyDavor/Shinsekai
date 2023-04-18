import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { useStoreContext } from "../context/StoreContext";

interface Props {
    darkmode: boolean
    handleThemeChange: () => void;
}

const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" },
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
        color: "secondary.dark"
    },
    "&.active": {
        color: "secondary.light"
    }
}

export default function Header({ darkmode, handleThemeChange }: Props) {
    const {basket} = useStoreContext();
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position="static" sx={{ mb: 2, background: "black" }}>

            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <Box display="flex" alignItems="center">
                    <Typography variant="h6" component={NavLink}
                        to="/"
                        sx={navStyles}
                    >
                        Shinsekai
                    </Typography>
                    <Switch color="secondary" checked={darkmode} onChange={handleThemeChange} />
                </Box>

                {/* LIST OF LINKS ON MIDDLE OF NAVBAR */}
                <List sx={{ display: "flex" }}>
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

                <Box display="flex" alignItems="center">
                    <IconButton component={Link} to="/basket" size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {/* LIST OF LINKS ON RIGHT OF NAVBAR */}
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
                </Box>

            </Toolbar>
        </AppBar>
    )

}