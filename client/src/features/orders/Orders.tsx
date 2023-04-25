import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyFormat, formatDate } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchOrdersAsync } from "./ordersSlice";
import OrderDetails from "./OrderDetails";

export default function Orders() {

  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector(state => state.orders);
  const [selectedOrder, setSelectedOrder] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch]);

  const handleViewOrder = (orderId: number) => {
    setSelectedOrder(orderId);
  }

  if (status.includes("pending")) return <LoadingComponent message="Loading Orders..." />

  if (selectedOrder > 0) {
    return <OrderDetails
      order={orders?.find(order => order.id === selectedOrder)!}
      setSelectedOrder={setSelectedOrder} />
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => 
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{currencyFormat(order.total)}</TableCell>
              <TableCell align="right">{formatDate(order.orderDate)}</TableCell>
              <TableCell align="right">{order.orderStatus}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleViewOrder(order.id)} sx={{color: "secondary.light"}}>View</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}