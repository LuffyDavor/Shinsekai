import { TextField, InputAdornment, debounce } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

export default function ProductSearch(){
    const {productParams} = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();
    
    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000)
    
    return(
        <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        color="secondary"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            )
        }}
        value={searchTerm || ""}
        onChange={(event :any) => {
            setSearchTerm(event.target.value)
            debouncedSearch(event)
        }}
    />
    )
}