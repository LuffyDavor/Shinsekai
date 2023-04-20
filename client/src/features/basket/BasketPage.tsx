import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    if (!basket || basket.items.length == 0) return <Typography variant="h3" align="center" marginTop="30%">Your Basket Is Empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map(item => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Button component={Link} to={`/catalog/${item.productId}`} size="small" color="secondary" style={{ textTransform: 'none' }}>
                                        <Box display="flex" alignItems="center">
                                            <img src={item.pictureUrl} alt={item.name} style={{
                                                marginRight: 10,
                                                borderRadius: '10%', // to make the image rounded
                                                objectFit: 'contain', // to zoom in the image and fill the container
                                                width: "7vh", // to set the width of the image
                                                height: "10vh"
                                            }} />
                                            <span>{item.name}</span>
                                        </Box>

                                    </Button>

                                </TableCell>
                                <TableCell align="right">€{(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status === "pendingRemoveItem" + item.productId + "remove"}
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId, quantity: 1, name: "remove"
                                        }))}
                                        color="error">
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        loading={status === "pendingAddItem" + item.productId}
                                        onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}
                                        color="secondary">
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">€{((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === "pendingRemoveItem" + item.productId + "delete"}
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId, quantity: item.quantity, name: "delete"
                                        }))}
                                        color="error">
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container>
                <Grid item xs={5} />
                <Grid item xs={7}>
                    <BasketSummary />
                    <Button component={Link}
                        to="/checkout"
                        variant="contained"
                        size="large"
                        color="secondary"
                        fullWidth>
                        Checkout
                    </Button>

                </Grid>
            </Grid>
        </>

    )
}