import { FormGroup, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
    message: string;
    reset: boolean;
}

export default function CheckboxButtons ({items, checked, onChange, message, reset}: Props){
    const [checkedItems, setCheckedItems] = useState(checked || []);

    useEffect(() => {
        if (reset) {
            setCheckedItems([]);
        }
    }, [reset]);

    function handleChecked(value: string){
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[];
        if(currentIndex === -1) {
            newChecked = [...checkedItems, value];
        } else {
            newChecked = checkedItems.filter(item => item !== value);
        }
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            <Typography variant="h6">{message}</Typography>
            {items.map((item) => (
                <FormControlLabel
                    key={item}
                    control={<Checkbox 
                        color="secondary"
                        checked={checkedItems.indexOf(item) !== -1}
                        onClick={() => handleChecked(item)}
                    />}
                    label={item}
                />
            ))}
        </FormGroup>
    )
}
