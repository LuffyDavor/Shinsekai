import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <Card>
            {/* <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:"secondary.main"}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: "bold", color:"primary.main" }
                }}
            /> */}
        <CardMedia


          sx={{ height: 250, backgroundSize: "contain", backgroundColor:"white"}}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color="contrastText" variant="h6" sx={{ textAlign: "center" }}>
            {product.name} - {product.type}
          </Typography>
          <Typography gutterBottom color="gray" variant="subtitle1" sx={{ textAlign: "center" }}>
            €{(product.price / 100).toFixed(2)}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    )
}