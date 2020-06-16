import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright'
import '../css/fundoo.css'
import { addNewUser } from '../configuration/Configuration';
//import { useHistory } from 'react-router-dom';

class SignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        gender: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        fNameError: false,
        lNameError: false,
        phoneNumberError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
        showPassword: false,
        errorText1: "",
        errorText2: "",
        errorText3: "",
        errorText4: "",
        errorText5: "",
        errorText6: "",
        errorMessage: ""
    }

    HandleState = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    handleClick = () => {
        addNewUser(this.state).then((res) => {
            console.log("response=> ", res.data.message);
            this.props.openSnackBar(res.data.message)
        }).catch(error => {
            console.log("error=> ", error.response.data.message);
            this.props.openSnackBar(error.response.data.message)
        });
    }

    validateFirstName = e => {
        const regexp = /[A-Za-z]{3,20}/;
        const char = e.target.value;
        if (!regexp.test(char)) {
            this.setState({
                [e.target.name]: "",
                fNameError: true,
                errorText1: "Invalid First Name"
            });
        } else {
            this.setState({ fNameError: false, errorText1: "" })
        }
    };

    validateLastName = e => {
        const regexp = /[A-Za-z]{3,20}/;
        const char = e.target.value;
        if (!regexp.test(char)) {
            this.setState({
                [e.target.name]: "",
                lNameError: true,
                errorText2: "Invalid Last Name"
            });
        } else {
            this.setState({ lNameError: false, errorText2: "" })
        }
    };

    validatePhoneNumber = e => {
        const regexp1 = /^[5-9]\d{9}$/;
        const char = e.target.value;
        if (!regexp1.test(char)) {
            this.setState({
                [e.target.name]: "",
                phoneNumberError: true,
                errorText3: "Invalid Phone Number"
            });
        } else {
            this.setState({ phoneNumberError: false, errorText3: "" })
        }
    };

    validateEmailAddress = e => {
        const regexp3 = /^[a-zA-Z]+[.+-]?[a-zA-Z0-9]+[@][a-zA-Z]{3,}[.][a-z]{2,4}[.]?[a-zA-Z]*[.,]?$/
        const char = e.target.value;
        if (!regexp3.test(char)) {
            this.setState({
                [e.target.name]: "",
                emailError: true,
                errorText4: "Invalid Email Id"
            });
        } else {
            this.setState({ emailError: false, errorText4: "" })
        }
    }

    validatePassword = e => {
        const regex2 = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        const char = e.target.value;

        if (!regex2.test(char)) {
            this.setState({
                [e.target.name]: "",
                passwordError: true,
                errorText5: "Invalid Password"
            })
        } else {
            this.setState({ passwordError: false, errorText5: "" })
        }
    }

    validateConfirmPassword = e => {
        if (!this.state.password.match([e.target.value])) {
            this.setState({
                [e.target.name]: "",
                confirmPasswordError: true,
                errorText6: "Password Mismatch"
            })
        } else {
            this.setState({ confirmPasswordError: false, errorText6: "" })
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper-singup">
                    <Avatar className="avatar">
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ marginBottom: "4%" }}>
                        Sign up
                    </Typography>
                    <div className="form" autoComplete='on' onSubmit={this.handleClick}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={this.state.fNameError}
                                    onBlur={this.validateFirstName}
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={this.state.firstName}
                                    onChange={this.HandleState}
                                    id="firstName"
                                    label="First Name"
                                    helperText={this.state.errorText1}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={this.state.lNameError}
                                    onBlur={this.validateLastName}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.HandleState}
                                    helperText={this.state.errorText2}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="outlined" className="formControl">
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        //labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        name="gender"
                                        value={this.state.gender}
                                        onChange={this.HandleState}
                                        label="Gender"
                                    >
                                        {/* <MenuItem value="">
                                            <em>None</em>
                                            </MenuItem> */}
                                        <MenuItem value='male'>Male</MenuItem>
                                        <MenuItem value='female'>Female</MenuItem>
                                        {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={this.state.phoneNumberError}
                                    onBlur={this.validatePhoneNumber}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.HandleState}
                                    helperText={this.state.errorText3}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={this.state.emailError}
                                    onBlur={this.validateEmailAddress}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.HandleState}
                                    helperText={this.state.errorText4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* <TextField
                                    error={this.state.passwordError}
                                    onBlur={this.validatePassword}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={this.state.password}
                                    onChange={this.HandleState}
                                    helperText={this.state.errorText5}
                                /> */}
                                <FormControl
                                    fullWidth
                                    required
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        name="password"
                                        type={this.state.showPassword ? "text" : "password"}
                                        value={this.state.password}
                                        onChange={this.HandleState}
                                        error={this.state.passwordError}
                                        onBlur={this.validatePassword}
                                        helpertext={this.state.errorText5}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="password"
                                                    onClick={this.handleClickShowPassword}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={80}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={this.state.confirmPasswordError}
                                    onKeyPressCapture={this.validateConfirmPassword}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={this.state.showPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.HandleState}
                                    helperText={this.state.errorText6}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            onClick={this.handleClick}
                            //onSubmit={this.handleClick}
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "5%", marginBottom: "3%" }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}
export default SignUp