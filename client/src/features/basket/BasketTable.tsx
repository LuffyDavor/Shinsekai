import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";

interface Props{
    items: BasketItem[];
    isBasket?: boolean;
}

export default function BasketTable({items, isBasket = true}: Props){
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    
    return(
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            {isBasket &&
                            <TableCell align="right"></TableCell>}  
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {   items.map(item => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Button component={Link} to={`/catalog/${item.productId}`}
                                        size="small"
                                        style={{ textTransform: 'none' }}
                                        sx={{ color: "text.primary" }}>
                                        <Box display="flex" alignItems="center">
                                            <img src={item.pictureUrl} alt={item.name} style={{
                                                marginRight: 10,
                                                borderRadius: '10%', // to make the image rounded
                                                objectFit: 'contain', // to zoom in the image and fill the container
                                                width: "7vh", // to set the width of the image
                                                height: "10vh"
                                            }} />
                                            <Typography variant="h6" style={{ fontSize: '1.2em' }}>
                                                {item.name}
                                            </Typography>
                                        </Box>

                                    </Button>

                                </TableCell>
                                <TableCell align="right">€{(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                {isBasket &&
                                    <LoadingButton
                                        loading={status === "pendingRemoveItem" + item.productId + "remove"}
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId, quantity: 1, name: "remove"
                                        }))}
                                        color="error">
                                        <Remove />
                                    </LoadingButton>}
                                    {item.quantity}
                                    {isBasket &&
                                    <LoadingButton
                                        loading={status === "pendingAddItem" + item.productId}
                                        onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                                        color="secondary">
                                        <Add />
                                    </LoadingButton>}
                                </TableCell>
                                <TableCell align="right">€{((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                {isBasket &&
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === "pendingRemoveItem" + item.productId + "delete"}
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId, quantity: item.quantity, name: "delete"
                                        }))}
                                        color="error">
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}