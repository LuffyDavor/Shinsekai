import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import { Order } from '../../app/models/order';

interface OrdersState {
  orders: Order[] | null;
  order: Order | null;
  status: string;
}

const initialState: OrdersState = {
  orders: null,
  order: null,
  status: 'idle',
};

export const fetchOrdersAsync = createAsyncThunk<Order[]>(
  'orders/fetchOrders',
  async (_, thunkAPI) => {
    try {
      const orders = await agent.Orders.list();
      return orders;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchOrderAsync = createAsyncThunk<Order, number>(
  'orders/fetchOrder',
  async (id, thunkAPI) => {
    try {
      const order = await agent.Orders.fetch(id);
      return order;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(fetchOrdersAsync.pending, (state) => {
        state.status = 'pendingFetchOrders';
      });
      builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      });
      builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.error(action.payload);
      });

      builder.addCase(fetchOrderAsync.pending, (state) => {
        state.status = 'pendingFetchOrder';
      });
      builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
      })
      builder.addCase(fetchOrderAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.error(action.payload);
      });
  },
});

export default ordersSlice.reducer;
