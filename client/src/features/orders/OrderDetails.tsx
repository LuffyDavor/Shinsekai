import { Box, Typography, Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

export default function OrderDetails({ order, setSelectedOrder }: Props) {
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} gutterBottom variant='h4' >Order# {order.id} - {order.orderStatus}</Typography>
                <Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size='large' variant='contained' color="secondary">
                    Back to orders
                </Button>
            </Box>
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
            <Grid container>
                <Grid item xs={12} marginTop={2} />
                <Grid item xs={6} marginBottom={5}>
                    <Typography variant="h6" textAlign="center">Shipping Address</Typography>
                    <TableContainer component={Paper} variant={'outlined'}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Full Name:</TableCell>
                                    <TableCell>{order.shippingAddress?.fullName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Address 1:</TableCell>
                                    <TableCell>{order.shippingAddress?.address1}</TableCell>
                                </TableRow>
                                {order.shippingAddress?.address2 && (
                                    <TableRow>
                                        <TableCell component="th" scope="row">Address 2:</TableCell>
                                        <TableCell>{order.shippingAddress.address2}</TableCell>
                                    </TableRow>
                                )}
                                <TableRow>
                                    <TableCell component="th" scope="row">City:</TableCell>
                                    <TableCell>{order.shippingAddress?.city}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">State:</TableCell>
                                    <TableCell>{order.shippingAddress?.state}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Zip:</TableCell>
                                    <TableCell>{order.shippingAddress?.zip}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Country:</TableCell>
                                    <TableCell>{order.shippingAddress?.country}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
                <Grid item xs={6} marginBottom={5}>
                    <Typography variant="h6" textAlign="center">Pricing</Typography>
                    <BasketSummary subtotal={subtotal} />
                </Grid>
            </Grid>
        </>
    )
}