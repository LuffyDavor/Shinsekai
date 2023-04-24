import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';


export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: "onTouched"
    });

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes("Password")) {
                    setError("password", { message: error })
                }
                else if (error.includes("Email")) {
                    setError("email", { message: error })
                }
                else if (error.includes("Username")) {
                    setError("username", { message: error })
                }
            });
        }

    }

    return (
        <Container component={Paper} maxWidth="sm"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4, mt: "100px" }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit(data => agent.Account.register(data)
                    .then(() => {
                        toast.success("Registration Successful - You can now log in :)")
                        navigate("/login");
                    })
                    .catch(error => handleApiErrors(error)))}
                noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    color="secondary"
                    fullWidth
                    label="Username"
                    // autoComplete="username"
                    autoFocus
                    required
                    {...register("username", { required: "Username is required" })}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    margin="normal"
                    color="secondary"
                    fullWidth
                    required
                    label="E-Mail"
                    {...register("email", {
                        required: "E-Mail is required",
                        pattern: {
                            value: /^(?=.{1,256})(?=.{1,64}@.{1,255}$)(?=\S)(?:(?!@)[\w&'*+._%-]+(?:(?<!\\)[,;])?)*(?<=\S)@(?=\S)(?!-)[-A-Z0-9._%+]+(?:\.(?=\S)(?!-)[-A-Z0-9._%+]+)*(?<=\S)$/i,
                            message: "Invalid email address",
                        },
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />

                <TextField
                    margin="normal"
                    color="secondary"
                    fullWidth
                    required
                    label="Password"
                    type="password"
                    // autoComplete="current-password"
                    {...register("password", {
                        required: "Password is required",
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                            message: "Password must contain at least 8 characters, including uppercase, lowercase, a digit, and a special character",
                        },
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                />




                <LoadingButton
                    type="submit"
                    disabled={!isValid}
                    loading={isSubmitting}
                    fullWidth
                    variant="contained"
                    color='secondary'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>

                    <Grid item>
                        <Link to="/login">
                            {"Already have an account? Log In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
