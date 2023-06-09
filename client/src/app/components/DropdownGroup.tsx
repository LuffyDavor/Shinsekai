import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
    options: any;
    onChange: (event: any) => void;
    selectedValue: string;
}

export default function DropdownGroup({options, onChange, selectedValue}: Props ) {

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="sort-by-label" >Sort by</InputLabel>
            <Select
                onChange={onChange}
                label="Sort by"
                value={selectedValue}
            >
                {options.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.name} 
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}