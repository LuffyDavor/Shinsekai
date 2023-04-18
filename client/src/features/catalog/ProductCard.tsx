import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { error } from "console";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";
import { Height } from "@mui/icons-material";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [loading, setLoading] = useState(false);
    const {setBasket} = useStoreContext();

    function handleAddItem(productId: number){
        setLoading(true);
        agent.Basket.addItem(productId)
          .then(basket => setBasket(basket))
          .catch(error => console.log(error))
          .finally(() => setLoading(false))
    }

    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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


          sx={{ height: 200, backgroundSize: "contain", backgroundColor:"contrastText", marginTop:"20px" }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent >
          <Typography gutterBottom color="text.primary" variant="h6" sx={{ textAlign: "center" }} >
            {product.name} - {product.type}
          </Typography>
          <Typography gutterBottom color="text.secondary" variant="subtitle1" sx={{ textAlign: "center" }}>
            {currencyFormat(product.price)}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center', }}>
          <LoadingButton 
          loading={loading} 
          onClick={() => handleAddItem(product.id)} 
          size="small"
          >
            Add to Cart
          </LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
        </CardActions>
      </Card>
    )
}