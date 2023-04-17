import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";

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


          sx={{ height: 250, backgroundSize: "contain", backgroundColor:"contrastText"}}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color="text.primary" variant="h6" sx={{ textAlign: "center" }}>
            {product.name} - {product.type}
          </Typography>
          <Typography gutterBottom color="text.secondary" variant="subtitle1" sx={{ textAlign: "center" }}>
            €{(product.price / 100).toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to Cart</Button>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
        </CardActions>
      </Card>
    )
}