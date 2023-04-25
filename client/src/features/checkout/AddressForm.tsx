import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AppCheckbox from "../../app/components/AppCheckbox";

export default function AddressForm() {
    const { control, formState } = useFormContext();
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name="fullName" label="First and Last Name" required />
                </Grid>

                <Grid item xs={12}>
                    <AppTextInput control={control} name="address1" label="Address 1" required />
                </Grid>

                <Grid item xs={12} >
                    <AppTextInput control={control} name="address2" label="Address 2"  />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name="city" label="City" required/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name="state" label="State" required />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name="zip" label="Postal Code" required />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name="country" label="Country" required/>
                </Grid>

                <Grid item xs={12}>
                    <AppCheckbox 
                    disabled={!formState.isDirty}
                    name="saveAddress" 
                    label="Save as default address" 
                    control={control}/>
                </Grid>

            </Grid>
        </>
    );
}