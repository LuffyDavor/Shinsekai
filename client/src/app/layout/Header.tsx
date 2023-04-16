import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props{
    darkmode:boolean
    handleThemeChange: () => void;
}

export default function Header({darkmode, handleThemeChange}:Props) {
    return (
        <AppBar position="static" sx={{mb: 2}}>
            <Toolbar>
                <Typography variant="h6">
                    Shinsekai
                </Typography>
                <Switch checked={darkmode} onChange={handleThemeChange}/>
                    
                
            </Toolbar>
        </AppBar>
    )

}