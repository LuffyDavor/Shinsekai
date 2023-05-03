import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound(){

    return(
        <Container sx={{height:480, display:"flex", flexDirection:"column", marginTop:20}} >
            <Typography gutterBottom variant="h3" marginTop={20}>Oops - we could not find what you are looking for</Typography>
            <Divider />
            <Button fullWidth component={Link} to="/catalog" color="secondary" variant="contained" sx={{paddingY: "20px"}}> Go Back To Shop </Button>
        </Container>
    )
}