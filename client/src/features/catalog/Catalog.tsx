import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Typography, Drawer, List, ListItem, IconButton, FormControl, InputLabel, MenuItem, Select, FormGroup, Checkbox, FormControlLabel, Divider, Grid, Box, Pagination, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import MenuIcon from '@mui/icons-material/Menu';
import ProductSearch from "./ProductSearch";
import DropdownGroup from "../../app/components/DropdownGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AddPagination from "../../app/components/AddPagination";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, brands, series, productParams, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const [resetFilters, setResetFilters] = useState(false);
    const sortOptions = [
        { value: "name", name: "Alphabetical" },
        { value: "priceDesc", name: "Price - High to Low" },
        { value: "price", name: "Price - Low to High" }
    ];


    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [filtersLoaded, dispatch]);

    if (!filtersLoaded) return <LoadingComponent message="Loading Products..." />;

    return (
        <>

            <Typography gutterBottom variant="h3">Products</Typography>

            <Grid container spacing={2} alignItems="center" marginBottom={2}>
                <Grid item xs={9}>
                    <ProductSearch />
                </Grid>
                <Grid item xs={3}>
                    <DropdownGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                    />
                </Grid>
                <Grid item xs={12} marginLeft={1.1}>
                    <IconButton
                        onClick={handleDrawerOpen}
                        size="large"
                        edge="start"
                        sx={{
                            '&:hover': {
                                color: 'secondary.main',
                            },
                            borderRadius: '10%',
                            transform: "scale(1.1)"
                        }}
                    >
                        <MenuIcon />
                        <Typography sx={{ ml: 1 }}>Filters</Typography>
                    </IconButton>

                </Grid>
            </Grid>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerClose}
                sx={{ width: "500px" }} // Set the width of the drawer
            >
                <List>

                    <ListItem >
                        <CheckboxButtons
                            items={brands}
                            checked={productParams.brands}
                            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                            message="Brands"
                            reset={resetFilters}
                        />
                    </ListItem>

                    <ListItem sx={{ display: "flex", justifyContent: "right", alignItems: "right",  marginTop:-2}}>
                        <Button onClick={() => {
                            dispatch(setProductParams({ brands: [] }));
                            setResetFilters(true);
                            setTimeout(() => setResetFilters(false), 0);
                        }}
                            variant="outlined"
                            size="small"
                            sx={{color:"secondary.light", borderColor: (theme) => theme.palette.secondary.light }}
                        >Reset Brands</Button>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <CheckboxButtons
                            items={series}
                            checked={productParams.series}
                            onChange={(items: string[]) => dispatch(setProductParams({ series: items }))}
                            message="Series"
                            reset={resetFilters}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "flex", justifyContent: "right", alignItems: "right",  marginTop:-2}}>
                        <Button onClick={() => {
                            dispatch(setProductParams({ series: [] }));
                            setResetFilters(true);
                            setTimeout(() => setResetFilters(false), 0);
                        }}
                            variant="outlined"
                            size="small"
                            sx={{color:"secondary.light", borderColor: (theme) => theme.palette.secondary.light }}
                        >Reset Series</Button>
                    </ListItem>
                </List>
            </Drawer>

            <ProductList products={products} />

            <Grid>
                <Grid item xs={3} />
                <Grid item xs={9}>
                    {metaData &&
                    <AddPagination
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                    />}
                </Grid>
            </Grid>

        </>
    );
}
