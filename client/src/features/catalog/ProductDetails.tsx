import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, MobileStepper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";
import { currencyFormat } from "../../app/util/util";

export default function ProductDetails() {
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const { status: productStatus } = useAppSelector(state => state.catalog);

    const [quantity, setQuantity] = useState(0);
    const [activeStep, setActiveStep] = useState(0); // FOR CAROUSEL
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
    }, [id, item, product, dispatch]);

    function handleQuantityInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    if (productStatus.includes("pending")) return <LoadingComponent message="Loading Product..." />
    if (!product) return <NotFound />




    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {

            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
        }
        else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
        }
    }

    const maxSteps = product.pictures.length;

    return (
        <Grid container spacing={6} >
            <Grid item xs={6} minHeight="80vh" maxHeight="90vh">
                <img src={product.pictures[activeStep].url} alt={product.name} style={{ width: "100%", height: "100%" }} />
                <MobileStepper
                    variant="dots"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={(
                        <Button onClick={handleNext} disabled={activeStep === maxSteps - 1} color="secondary" >
                            <ArrowForwardIos />
                        </Button>
                    )}
                    backButton={(
                        <Button onClick={handleBack} disabled={activeStep === 0} color="secondary">
                            <ArrowBackIos />
                        </Button>
                    )}
                />
            </Grid>

            <Grid item xs={6} >

                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }}></Divider>

                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Series</TableCell>
                                <TableCell>{product.series}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Typography variant="h4"
                        color="secondary"
                        sx={{ marginTop: "20px", marginLeft: "10px" }}>
                        {currencyFormat(product.price)}

                    </Typography>
                </TableContainer>
                <Grid container spacing={2} mt={5}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleQuantityInputChange}
                            variant="outlined"
                            color="secondary"
                            type="number"
                            label="Quantity in Cart"
                            fullWidth
                            value={quantity}
                            InputLabelProps={{
                                style: { color: "gray" },
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={status.includes("pending")}
                            onClick={handleUpdateCart}
                            sx={{ height: "55px" }}
                            color="secondary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? "Update Quantity" : "Add to Cart"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}