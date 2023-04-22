import { Card, CardActions, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardMedia
        sx={{
          height: 420,
          width: "100%",
          transition: "transform 0.2s",
          "&:hover": {
            filter: "grayscale(100%)",
            transform: "scale(1.05)"
          }
        }}
        image={product.pictures[0].url}
        title={product.name}
        component={Link}
            to={`/catalog/${product.id}`}
      />
      <Box>
        <CardContent>

          <Typography gutterBottom color="text.primary"
            variant="h6"
            sx={{
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2
            }}>

            {product.name} - {product.brand}
          </Typography>

          <Typography gutterBottom color="text.secondary"
            variant="subtitle1"
            sx={{
              textAlign: "center",
              overflow: "hidden"
            }}>

            {currencyFormat(product.price)}
          </Typography>

        </CardContent>


        <CardActions sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: "-20px"
        }}>

          <LoadingButton
            loading={status.includes("pendingAddItem" + product.id)}
            onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
            size="medium"
            variant="outlined"
            sx={{
              color: "secondary.light",
              borderColor: "secondary.light"
            }}
          >
            Add to Cart
          </LoadingButton>
          
        </CardActions>
      </Box>

    </Card>
  )
}