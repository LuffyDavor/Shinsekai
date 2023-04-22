import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";


export default function ContactPage() {
    const dispatch = useAppDispatch();
    const { data, title } = useAppSelector(state => state.counter);
    return (
        <>
            <Typography variant="h2">
                {title}
            </Typography>

            <Typography variant="h5">
                The Data is: {data}
            </Typography>
        </>
    )

}