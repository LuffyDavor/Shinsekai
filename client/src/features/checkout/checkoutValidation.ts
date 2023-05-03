import * as yup from 'yup';

export const validationSchema = [
    yup.object({
        fullName: yup.string().required("Full Name is required"),
        address1: yup.string().required("Address is required"),
        address2: yup.string().optional(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required("Postal code is a required field").matches(/^[0-9]+$/, "Postal code must be a number"),
        country: yup.string().required()
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string()
            .required("The name is required")
            .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid name format")

    })
]
